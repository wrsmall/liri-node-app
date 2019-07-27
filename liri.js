
require("dotenv").config();
var fs = require("fs");
var keys = require("./keys.js");
var action = process.argv[2];
var value = process.argv.slice(3).join(" ");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
switch (action) {
  case "spotify-this-song":
    spotifyThis();
    break;

  case "concert-this":
    concert();
    break;

  case "movie-this":
    movie();
    break;

  case "do-what-it-says":
    doThis();
    break;
};


function spotifyThis() {
  console.log("----------------------------------------------");
  if (!value){
  value="Ace of base"
  };
  spotify.search({ type: 'track', query: value }, function (err, data) {
    if (err) {
      value="Ace of base"
      spotifyThis();
    }

    console.log(` Artist: ${data.tracks.items[0].artists[0].name}
 Song Name: ${data.tracks.items[0].name} 
 Preview: ${data.tracks.items[0].preview_url} 
 Album: ${data.tracks.items[0].album.name} `);
    console.log("----------------------------------------------");

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
        console.log(`Title: ${response.data.Title}
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

function doThis(){
  fs.readFile('random.txt', "utf8", function(error, data){
    text = data.split(',');
    value= text.slice(1).join(" ")

    spotify
    spotifyThis(value);
  });
}