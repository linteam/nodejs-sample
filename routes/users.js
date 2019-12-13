const auth = require("../middleware/auth");
const bcrypt = require("bcrypt");
const _ = require("lodash");
const { User, validate } = require("../models/user");
const express = require("express");
const router = express.Router();

router.get("/me", auth, async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(user);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  //Kullanicinin mevcut olup olmadigini kontrol ediyoruz
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");
  //lodash (_) pick method
  user = new User(_.pick(req.body, ["name", "email", "password"]));
  //save passwords as hashes
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token") //Client x-auth-token'i okuyabilsin diye ekledik
    .send(_.pick(user, ["_id", "name", "email"])); //password ve __v gitmiyor
});

module.exports = router;
