module.exports = {
  // Adds user information after they authenticate through google
  addUser: function(req, res, next) {
    const db = req.app.get("db");

    db
      .addNewUser([
        req.body.address,
        req.body.city,
        req.body.state,
        req.body.zipcode,
        req.body.email,
        req.body.phone,
        req.params.id
      ])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(console.log);
  },

  getUser: function(req, res, next) {
    const db = req.app.get("db");

    db
      .getUser([req.params.id])
      .then(response => {
        res.status(200).json(response);
      })
      .catch(console.log);
  }
};
