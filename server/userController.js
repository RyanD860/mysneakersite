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
        res.send(response);
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
  },

  getPurchases: function(req, res, next) {
    const db = req.app.get("db");

    db
      .getPurchases([req.params.id])
      .then(response => {
        res.status(200).send(response);
      })
      .catch(console.log);
  },

  editUser: function(req, res, next) {
    const db = req.app.get("db");

    db
      .editUser([
        req.params.id,
        req.body.firstname,
        req.body.lastname,
        req.body.address,
        req.body.city,
        req.body.state,
        req.body.zipcode,
        req.body.email,
        req.body.phone
      ])
      .then(response => {
        res.send(response);
      })
      .catch(console.log);
  }
};
