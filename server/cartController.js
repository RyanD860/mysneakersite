let count = 1;
module.exports = {
  add: function(req, res, next) {
    const db = req.app.get("db");

    db
      .addToCart([req.body.sku])
      .then(response => {
        req.session.user.cart.push(response);
        req.session.user.total += response[0].price;
        res.send(req.session.user);
      })
      .catch(console.log);
  },

  remove: function(req, res, next) {
    req.session.user.cart.splice(req.params.i, 1);
    req.session.user.total -= req.params.item;
    res.send(req.session.user);
  },

  checkout: function(req, res, next) {
    const db = req.app.get("db");
    for (let i = 0; i < req.body.cart.length; i++) {
      db.checkout([
        req.body.cart[i][0].sku,
        req.body.userid,
        req.body.cart[i][0].productid,
        req.body.authid,
        count
      ]);
    }
    count++;
    req.session.user.cart = [];
    req.session.user.total = 0;
    res.send(req.session.user);
  }
};
