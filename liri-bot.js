var fs = require('fs');  
var twitterKeys = require('./key.js').twitterKeys;
var Twitter = require('twitter');

        var client = new Twitter({
            consumer_key: twitterKeys.consumer_key,
            consumer_secret: twitterKeys.consumer_secret,
            access_token_key: twitterKeys.access_token_key,
            access_token_secret: twitterKeys.access_token_secret
        });

var params = {screen_name: 'alleeoo'};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    console.log(response);
  }
  else {
      console.log("error");
  }
});


// var SpotifyWebApi = require('spotify-web-api-node');

// // credentials are optional
// var spotifyApi = new SpotifyWebApi({
//   clientId : '08a730439a40438798d9240f843da53a',
//   clientSecret : 'ab7c50a3a2ad430d91fd9297f9506432',
// });

// // Get an access token and 'save' it using a setter
// spotifyApi.clientCredentialsGrant()
//   .then(function(data) {
//     console.log('The access token is ' + data.body['access_token']);
//     spotifyApi.setAccessToken(data.body['access_token']);
//   }, function(err) {
//     console.log('Something went wrong!', err);
//   });

// spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
//   .then(function(data) {
//     console.log('Artist albums', data.body);
//   }, function(err) {
//     console.error(err);
//   });