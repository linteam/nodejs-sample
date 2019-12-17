const config = require("config");

module.exports = function() {
  //ENV variable'i linux ve mac'de export ile windows'da set komutu ile set ediyoruz.
  //export vidly_jwtPrivateKey=mySecureKey
  if (!config.get("jwtPrivateKey")) {
    //eger yoksa hata verdiriyoruz
    //stack trace'i elde edebilmek icin OBJECT olarak firlatiyoruz.
    throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
  }
};
