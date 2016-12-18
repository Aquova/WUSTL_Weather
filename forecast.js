// This program tweets the daily forecast once a day for 
// Washington University in St. Louis

// Bot can be seen at https://twitter.com/WUSTL_Weather
// Written by Austin Bricker, 2016

// Uses both 'request' and 'twit' additional libraries
var request = require('request');
var timeDelay = 10800000; // 3 hours
// url from Darksky API, contains API key and GPS coords
var url = 'https://api.darksky.net/forecast/API_KEY/LATITUDE,LONGITUDE';
// API_KEY can be received from darksky.net
// LATITUDE and LONGITUDE depend on your location, in this case Brookings Hall
var Twit = require('twit')

var fs = require('fs'),
    path = require('path'),
    Twit = require('twit'),
    config = require(path.join(__dirname, 'config.js'));

var T = new Twit(config);

// Main tweet function
function tweetForecast(){
	request({url: url, json: true}, function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var forecast = body.hourly.summary
			forecast = forecast.toString()
			var tempHigh = body.daily.data[0].temperatureMax
			tempHigh = Math.floor(tempHigh)
			tempHigh = tempHigh.toString()
			output = 'Good morning! Today\'s forecast: ' + forecast +
					' The high will be ' +  tempHigh + 'ºF. #WUSTLweather'
			// Tweet, report status		
			T.post('statuses/update', {status: output}, function(err, data, response) {
				if (err) {
					console.log('Something went wrong.');
					console.log(err);
				}
				else {
					console.log('I just tweeted: ')
					console.log(output);
				}
				
			});
		}
		else {
			console.log('Something is wrong.');
			console.log(error);
		}
	});	
};

// Call tweet function
tweetForecast();	
