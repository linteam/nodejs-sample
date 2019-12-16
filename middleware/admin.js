const config = require("config");

module.exports = function(req, res, next) {
  // 401 Unauthorized - Valid JWT verirsen girebilirsin demek
  // 403 Forbidden - Valid JWT olsa bile giremezsin demek.
  if (!config.get("requiresAuth")) return next();
  //Admin gerektiren kisimlara bu eklenir.
  if (!req.user.isAdmin) return res.status(403).send("Access denied.");

  next();
};
