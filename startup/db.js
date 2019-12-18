const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

//DB Connection
module.exports = function() {
  //test ortaminda ayri dev'de ayri db'lere baglaniyor.
  //node index.js diye baslatirsan default.json'i alir.
  //NODE_ENV=test node index.js diye baslatirsan test.json'dan alir.
  const db = config.get("db");
  mongoose.connect(db).then(() => winston.info(`Connected to ${db}...`));
  //Catch'i burdan kaldirarak global'de yakalanmasini istiyoruz.
  //.catch(err => winston.error(`Could not connect to MongoDB: ${db}`));
};
