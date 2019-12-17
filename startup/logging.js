const winston = require("winston");
//Winston loglama paketi ile console, file ve http kanallarindan loglar basilabilir.
//Eklentilerle mongodb, couchdb, redis gibi database'lere yazabilir.
// Ya da logly gibi enterprise servislerine yazabilir.
// require('winston-mongodb');
//express-async-errors paketi ile  express async fonksiyonu asagidaki sekilde sarmallanabilir.
require("express-async-errors");

module.exports = function() {
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  process.on("unhandledRejection", ex => {
    throw ex;
  });

  winston.add(winston.transports.File, { filename: "logfile.log" });
  // winston.add(winston.transports.MongoDB, {
  //   db: 'mongodb://localhost/vidly',
  //   level: 'info'
  // });
};
