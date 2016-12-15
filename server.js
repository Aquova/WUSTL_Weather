var request = require('request');
var timeDelay = 10800000; // 3 hours
var url = 'https://api.darksky.net/forecast/API_KEY/LATITUDE,LONGITUDE';
// API_KEY can be received from darksky.net
// LATITUDE and LONGITUDE depend on your location, in this case Brookings Hall
var Twit = require('twit')

var fs = require('fs'),
    path = require('path'),
    Twit = require('twit'),
    config = require(path.join(__dirname, 'config.js'));

var T = new Twit(config);

function tweetWeather(){
	request({url: url, json: true}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			temp = Math.floor(body.currently.temperature)
			temp = temp.toString()
			summary = body.currently.summary
			summary = summary.toString()
			output = 'It is currently ' + temp + 'ºF and ' + summary + '. #WUSTLweather'
			T.post('statuses/update', {status: output}, function(err, data, response) {
				
			});
			//console.log('I just tweeted: ')
			//console.log(output)
		}
	});	
};
	

setInterval(
	tweetWeather(),
	timeDelay
);