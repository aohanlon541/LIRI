var fs = require('fs');  
var twitterKeys = require('./key.js').twitterKeys;
var Twitter = require('twitter');
var command = process.argv[2];
var searchTerm = process.argv[3];

if (command === "my-tweets") {
    getTweets();
}

if (command === "spotify-this-song") {
    getSong();
}

if (command === "movie-this") {
    getMovie();
}

if (command === "do-what-it-says") {
    doWhatItSays();
}

function getTweets() {
        var client = new Twitter({
            consumer_key: twitterKeys.consumer_key,
            consumer_secret: twitterKeys.consumer_secret,
            access_token_key: twitterKeys.access_token_key,
            access_token_secret: twitterKeys.access_token_secret
        });

client.get('statuses/user_timeline', {
    screen_name: 'alleeoo',
    count: 20
}, function(error, tweets, response) {
  if (!error) {
      for (i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at + ": " + tweets[i].text);
      }
  }
  else {
      console.log("error");
  }
});
}

function getSong() {
var Spotify = require('node-spotify-api');

var spotify = new Spotify({
  id: '08a730439a40438798d9240f843da53a',
  secret: 'e58416a56a2348eda029fe399b1e1759'
});

spotify.search({ type: 'track', query: searchTerm, limit: 1 }, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
// var str = JSON.stringify(data, null, 2);
// console.log(str);
// var parsedSpotify = JSON.parse(data);

var artist = data.tracks.items[0].album.artists[0].name;
var songName = data.tracks.items[0].name;
var link = data.tracks.items[0].external_urls.spotify;
var album = data.tracks.items[0].album.name;
console.log("Song: " + songName);
console.log("By: " + artist);
console.log("URL: " + link);
console.log("Album: " + album);

});
}

function getMovie() {
var request = require('request');

var queryUrl = "http://www.omdbapi.com/?apikey=40e9cece&t=" + searchTerm;

request(queryUrl, function(error, response, body){
    if (!error && response.statusCode === 200) {
        var parsedResults = JSON.parse(body);
        console.log("* " + parsedResults.Title);
        console.log("* " + parsedResults.Year);
        console.log("* IMDB Rating: " + parsedResults.imdbRating);
        console.log("* Country: " + parsedResults.Country);
        console.log("* Lang: " + parsedResults.Language);
        console.log("* " + parsedResults.Plot);
        console.log("* Actors: " + parsedResults.Actors);
        console.log("* " + parsedResults.Ratings[1].Source + ": " + parsedResults.Ratings[1].Value);

    }
});
}

function doWhatItSays() {
    fs.writeFile("random.txt", "I Want it That Way,")
}
