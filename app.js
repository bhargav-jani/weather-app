require("dotenv").config();
const express = require("express");
const https = require("https");

const app = express();

app.use(express.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const query = req.body.CityName;
  const units = "metric";
  const apikey = process.env.API_KEY;
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    query +
    "&units=" +
    units +
    "&appid=" +
    apikey +
    "";
  https.get(url, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageurl = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write(
        "<h1>The temperature in " + query + " is " + temp + " degrees.</h1>"
      );
      res.write(
        "<h3>The Weather condition is " + weatherDescription + "." + "<br>"
      );
      res.write("<img src=" + imageurl + ">");
      res.send();
    });
  });
});

app.listen(3000, function () {
  console.log("server is working at port 3000.");
});
