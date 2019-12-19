const validateObjectId = require("../middleware/validateObjectId");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Genre, validate } = require("../models/genre");
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const genres = await Genre.find()
    .select("-__v")
    .sort("name"); //isme gore sirala
  res.send(genres);
});

router.post("/", auth, async (req, res) => {
  //Her istek oncesi yetki kontrolu yerine middleware fonksiyonda hepsi icin cozum olur.
  //Bu fonksiyonun 2. parametresi middleware function auth
  //const token = req.header("x-auth-token");
  //res.status(401).send(""); //401 Client does not have credentials

  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = new Genre({ name: req.body.name });
  await genre.save();

  res.send(genre);
});

router.put("/:id", [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    {
      new: true
    }
  );

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found."); //Eger bulunamazsa 404 hatasi donuyoruz.

  res.send(genre);
});

//Birden fazla middleware fonksiyonu gecireceksen array halinde vermelisin.
router.delete("/:id", [auth, admin, validateObjectId], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

router.get("/:id", validateObjectId, async (req, res) => {
  //Bu kontrol exception'a dusup 500 donmemesi icin onemli
  //validateObjectID olarak middleware'e tasindi. Yukarida parametre olarak verildi.
  //if(!mongoose.Types.ObjectId.isValid(req.params.id))
  //  return res.status(404).send("Invalid ID");
  const genre = await Genre.findById(req.params.id).select("-__v"); //-__v ile mongodan gelen v degerini cikarmis oluruz.

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

module.exports = router;
