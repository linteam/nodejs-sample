const jwt = require("jsonwebtoken");
const config = require("config");

//middleware auth method
//next ile bir sonraki middleware fonksiyonuna geciyor.
module.exports = function(req, res, next) {
  if (!config.get("requiresAuth")) return next();

  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");
  //Token client'ta null verilmisse string'e cevrilir ve burdan gecer 400 doner.

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.user = decoded; //JWT'yi encode ederken koydugumuz JSON
    next();
  } catch (ex) {
    res.status(400).send("Access denied. Invalid token.");
  }
};
