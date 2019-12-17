const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

//DB Connection
module.exports = function() {
  const db = config.get("db");
  mongoose.connect(db).then(() => winston.info(`Connected to ${db}...`));
  //Catch'i burdan kaldirarak global'de yakalanmasini istiyoruz.
  //.catch(err => winston.error(`Could not connect to MongoDB: ${db}`));
};
