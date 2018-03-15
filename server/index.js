//Installing  Dependencies
require("dotenv").config();
const express = require("express");
const { json } = require("body-parser");
const massive = require("massive");
const session = require("express-session");
const cors = require("cors");
const port = 80;
const checkForSession = require("./checkForSession");
const passport = require("passport");
const strategy = require(`${__dirname}/strategy`);
const stripe = require("stripe")(process.env.STRIPE_SECRET);
const client = require("twilio")(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN
);

//Bringing in controllers
const prodController = require(`${__dirname}/productsController`);
const userController = require(`${__dirname}/userController`);
const cartController = require(`${__dirname}/cartController`);

//Create instance of express
const app = express();
app.use(json());
app.use(cors());
app.set("view engine", "pug");

app.use(express.static(`${__dirname}/../build`));

//Connecting to Database
massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set("db", db);
    // Added Stock to database
    // db.addStock();
    // Added Images to database
    // db.addImages();
  })
  .catch(console.log);

// Creating Session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 10000000 }
  })
);

//Using Passport
app.use(passport.initialize());
app.use(passport.session());

app.use(checkForSession);

passport.use(strategy);

passport.serializeUser((profile, done) => {
  done(null, profile);
});

passport.deserializeUser((profile, done) => {
  done(null, profile);
});

//End Points

//GET
app.get("/api/sneakers", prodController.getSneakers);
app.get("/api/sneaker/:id", prodController.getSneaker);
app.get("/api/stock/:id", prodController.getStock);
app.get("/api/user/:id", userController.getUser);
app.get("/api/past/:id", userController.getPurchases);
app.get("/api/getCart", (req, res, next) => {
  if (req.session.user.cart) {
    res.json(req.session.user);
  } else {
    res.status(200);
  }
});
app.get("/api/checkForUser", (req, res, next) => {
  if (req.session.user.user) {
    app
      .get("db")
      .getUser([req.session.user.user])
      .then(response => {
        res.json(response);
      });
  } else {
    res.status(200).send({ message: "No User" });
  }
});

// POST
app.post("/api/addUser/:id", userController.addUser);
app.post("/api/cart/add", cartController.add);
app.post("/api/cart/checkout", cartController.checkout);

// PUT
app.put("/api/editUser/:id", userController.editUser);

// REMOVE
app.delete("/api/cart/remove/:i/:item", cartController.remove);

// Authentication
app.get(
  "/login",
  passport.authenticate("auth0", {
    successRedirect: "/me",
    failureRedirect: "/login",
    failureFlash: true
  })
);
app.get("/me", function(req, res, next) {
  if (!req.user.id) {
    res.redirect("/login");
  } else {
    app
      .get("db")
      .getUser([req.user.id])
      .then(response => {
        if (!response[0]) {
          app
            .get("db")
            .addUser([
              req.user.id,
              req.user.name.familyName,
              req.user.name.givenName
            ])
            .then(created => {
              req.session.user = {
                user: req.user.id,
                cart: [],
                total: 0
              };
            })
            .then(
              res.redirect(
                `http://localhost:3001/#/user/addUser/${req.user.id}`
              )
            );
          next();
        } else {
          req.session.user = {
            user: response[0].authid,
            cart: [],
            total: 0
          };

          res.redirect(`http://localhost:3001/#/`);
        }
      });
  }
});

app.get("/api/logout", (req, res, next) => {
  req.session.destroy();
  next();
  res.status(200);
});

// STRIPE
app.post("/charge", (req, res, next) => {
  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.source,
      customer: req.body.customer
    })
    .then(customer =>
      stripe.charges.create({
        amount: req.body.amount,
        description: "Sneakers",
        currency: "usd",
        customer: customer.id
      })
    )
    .then(res.status(200));
});

// TWILIO
app.get("/text/:name/:phone/:address", function(req, res) {
  client.messages.create(
    {
      to: `+${req.params.phone}`,
      from: process.env.TWILIO_PHONE,
      body: `Hello ${
        req.params.name
      }. Your order has been received and you will receive a text with shipping information to the following address in a few days. Your address: ${
        req.params.address
      }. Thank you.`
    },
    function(err, data) {
      if (err) {
        console.log(err);
      } else {
        console.log(data);
      }
    }
  );
});

const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

app.listen(port, () => {
  console.log(`Currently listening on port #${port}`);
});
