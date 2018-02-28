//Controller for products

module.exports = {
  // Gets all sneakers from database and returns them all
  getSneakers: function(req, res, next) {
    const db = req.app.get("db");

    db
      .getSneakers()
      .then(response => {
        res.status(200).json(response);
      })
      .catch(res.status(500));
  },

  // Gets one sneaker by the product ID
  getSneaker: function(req, res, next) {
    const db = req.app.get("db");

    db
      .getSneaker([req.params.id])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(res.status(500));
  },

  // Gets stock for sneaker after selected from home page
  getStock: function(req, res, next) {
    const db = req.app.get("db");

    db
      .getStock([req.params.id])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(res.status(500));
  }
};
