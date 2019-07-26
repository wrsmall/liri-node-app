var fs = require("fs");

var action = process.argv[2];
var value = process.argv[3];

switch (action) {
  case "spotify-this-song":
    spotify();
    break;

  case "concert-this":
    concert();
    break;

  case "movie-this":
    movie();
    break;
};

function spotify() {
  var axios = require("axios");

  // Run the axios.get function...
  // The axios.get function takes in a URL and returns a promise (just like $.ajax)
  axios
    .get("https://en.wikipedia.org/wiki/Kudos_(granola_bar)")
    .then(function (response) {
      // If the axios was successful...
      // Then log the body from the site!
      console.log(response.data);
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an object that comes back with details pertaining to the error that occurred.
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
    });

};

function concert() {
  var axios = require("axios");

  // Run the axios.get function...
  console.log("----------------------------------------------");
  axios
    .get(`https://rest.bandsintown.com/artists/${value}/events?app_id=codingbootcamp`)
    .then(function (response) {
      // If the axios was successful...
      // Then log the body from the site!
      console.log(`Venue: ${response.data[0].venue.name}
Location: ${response.data[0].venue.region}
Date: ${response.data[0].datetime}`);
console.log("----------------------------------------------");
    })
    .catch(function () {
      axios
    .get(`https://rest.bandsintown.com/artists/metallica/events?app_id=codingbootcamp`)
    .then(function (response) {
      
      console.log(`Line-Up: ${response.data[0].lineup}
Venue: ${response.data[0].venue.name}
Location: ${response.data[0].venue.region}
Date: ${response.data[0].datetime}`);
console.log("----------------------------------------------");
    })
    });
};

function movie() {
  var axios = require("axios");

  console.log("----------------------------------------------");
  axios
    .get(`http://www.omdbapi.com/?t=${value}&apikey=trilogy`)
    .then(function (response) {

      console.log(` Title: ${response.data.Title}
  Released: ${response.data.Year}
  IMDP Rating: ${response.data.Ratings[0].Value}
  Rotten Tomatos Rating: ${response.data.Ratings[1].Value}
  Country: ${response.data.Country}
  Language: ${response.data.Language}
  Plot: ${response.data.Plot}
  Actors: ${response.data.Actors}`);
      console.log("-----------------------------------------");
    })

    .catch(function () {

      axios
        .get(`http://www.omdbapi.com/?t=mr_nobody&apikey=trilogy`)
        .then(function (response) {
          // If the axios was successful...
          // Then log the body from the site!
          //console.log(response.data);
          console.log(` Title: ${response.data.Title}
  Released: ${response.data.Year}
  IMDP Rating: ${response.data.Ratings[0].Value}
  Rotten Tomatos Rating: ${response.data.Ratings[1].Value}
  Country: ${response.data.Country}
  Language: ${response.data.Language}
  Plot: ${response.data.Plot}
  Actors: ${response.data.Actors}`);
          console.log("-----------------------------------------");
        })
    });
};