const winston = require("winston");

//Client'a donulen hata mesaji ya da loglama yontemi merkezi bir yerde yapilmalidir.
//NODEJS de bunun icin error middleware'i kullanilabilir.
//Ilk parametre olarak alinan her hangi bir hata err olarak alinir.
module.exports = function(err, req, res, next) {
  winston.error(err.message, err); //uygulamada hata firlatildiginda winston ile loglanmasini sagliyorum.
  //oncesinde logging'le winston ayarlarini yaptim.

  // error
  // warn
  // info
  // verbose
  // debug
  // silly

  res.status(500).send("Something failed.");
};
