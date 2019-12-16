//Try catch'lerden kurtulmak icin bunu ekledik.
//Factory function amac express framework'une verecek fonksiyonu uretmek.
//express-async-errors paketi ile  express async hatalari handle edilir.
//Eger o yontem calismazsa bunu asyncMiddleware diye import edip async buna verilebilir.
module.exports = function(handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (ex) {
      next(ex);
    }
  };
};
