var http = require('http');
var twitter = require('ntwitter');
var credentials = require('./credentials.js');

var totalElapsedTime = 0;
var totalTweetsSeen = 0;


//get twitter streaming credentials from the twitter file
var t = new twitter({
    consumer_key: credentials.consumer_key,
    consumer_secret: credentials.consumer_secret,
    access_token_key: credentials.access_token_key,
    access_token_secret: credentials.access_token_secret
});

//start streaming data from twitter
t.stream(
    'statuses/filter',
    { track: ['awesome', 'cool', 'rad', 'gnarly', 'groovy'] },
    function(stream) {
        stream.on('data', function(tweet) {
	    totalTweetsSeen+=1;
            console.log(tweet.text);
        });
    }
);

//set up our http server
http.createServer(function (req, res) {
    var response = '<b>Hello from my http server!!</b> <br/>';
    response += '<p>The server has been up for ' + totalElapsedTime + ' seconds</p>';
    response += '<p>The server has seen ' + totalTweetsSeen + ' tweets</p>';
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(response);
}).listen(3000);

console.log('Server running on port 3000');

setInterval(function() {
    totalElapsedTime += 1;
    console.log('The server has now been up for ' + totalElapsedTime + ' seconds');
}, 1000);