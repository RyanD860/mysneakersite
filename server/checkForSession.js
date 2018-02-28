module.exports = function(req, res, next) {
  if (!req.session.user) {
    req.session.user = {
      cart: [],
      total: 0
    };
  }
  next();
};
