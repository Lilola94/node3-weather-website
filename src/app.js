const express = require("express");
const path = require("path");
const hbs = require("hbs");

const forecast = require("../utils/forecast");
const geocode = require("../utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");
//setup static file serve
app.use(express.static(path.join(__dirname, "../public")));

//setup handlebars
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Jan",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "Weather",
    name: "Jan",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    helpmessage: "halpMe!",
    title: "Weather",
    name: "Jan",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return console.log(error);
      }
      forecast([longitude, latitude], (error, forecastData) => {
        if (error) {
          return console.log(error);
        }
        res.send({
          forecast: forecastData,
          location: location,
          address: req.query.address,
        });
      });
    }
  );
});
app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    errormessage: "Helptext not found",
  });
});
app.get("*", (req, res) => {
  res.render("Error", {
    errormessage: "Site not found",
  });
});

app.listen(port, () => {
  console.log("server is up on port " + port);
});
