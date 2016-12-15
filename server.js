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
			var date = new Date(body.currently.time * 1000);
			var hours = date.getHours();
			if (hours > 12) {
				half = 'PM'
				hours = hours - 12
			}
			else if (hours == 0) {
				half = 'AM'
				hours = hours + 12
			}
			else if (hours == 12) {
				half = 'PM'
			}			
			else {
				half = 'AM'
			}	
			var minutes = '0' + date.getMinutes();
			var time = hours + ':' + minutes.substr(-2);
			time = time.toString();
			temp = Math.floor(body.currently.temperature)
			temp = temp.toString()
			summary = body.currently.summary
			summary = summary.toString()
			output = 'Hello, it is ' + time + ' ' + half + '. The weather is currently ' + 
						temp + 'ºF and ' + summary + '. #WUSTLweather'
			console.log(output)
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

tweetWeather();	

setInterval(tweetWeather,timeDelay);