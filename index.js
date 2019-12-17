const winston = require("winston");
const express = require("express");
const config = require("config"); //burda tanimliyoruz.
const app = express();

require("./startup/logging")(); //logging icinde express-async-errors yukleniyor. Bununla async icinde hata yakalanirsa middleware'e iletiliyor.
require("./startup/cors")(app);
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/config")();
require("./startup/validation")();

const port = process.env.PORT || config.get("port");
const server = app.listen(port, () =>
  winston.info(`Listening on port ${port}...`)
);

module.exports = server;
