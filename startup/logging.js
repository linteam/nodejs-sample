const winston = require("winston");
//Winston loglama paketi ile console, file ve http kanallarindan loglar basilabilir.
//Eklentilerle mongodb, couchdb, redis gibi database'lere yazabilir.
// Ya da logly gibi enterprise servislerine yazabilir.
// require('winston-mongodb');
//express-async-errors paketi ile  express async fonksiyonu asagidaki sekilde sarmallanabilir.
require("express-async-errors");

module.exports = function() {
  //Express haricinde olusan hatalar icin.
  // process.on("uncaughtException", ex => {
  //   winston.error(ex.message);
  //   process.exit(1);
  // });
  //Winstonun bu eklentisi yukaridaki isi yapiyor.
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  //Yukaridaki kod reject edilen promise hatalarini yakalamaz.
  process.on("unhandledRejection", ex => {
    // winston.error(ex.message);
    // process.exit(1);
    throw ex; //Bunu throw ederek unhandled exception'a cevirdim. Yukarisi yakalar bunu.
  });

  winston.add(winston.transports.File, { filename: "logfile.log" });
  // winston.add(winston.transports.MongoDB, {
  //   db: 'mongodb://localhost/vidly',
  //   level: 'info'
  // });
};
