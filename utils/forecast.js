const request = require("request");

const forecast = (address, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=9e34df044677df743422771239665ff0&query=" +
    address[1] +
    "," +
    address[0] +
    "&units=m";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to forecast service!", undefined);
    } else if (body.error) {
      callback("Unable to find location!", undefined);
    } else {
      callback(undefined, {
        description: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
      });
    }
  });
};

module.exports = forecast;
