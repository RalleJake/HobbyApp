var express = require('express');
var app = express();
var port = process.env.PORT || 1337;
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('site'));

app.get('/', function(res,req){
    res.sendFile('index.html');
});

var server = http.listen(port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log("Example app listening at http://%s:%s", host, port)

});

app.get('/getWeatherData', function (req, res) {
    var YQL = require('yql');
    var query = new YQL("select item.condition from weather.forecast where woeid = 907575 and u='c'");
    query.exec(function(err, data) {
        if(err){
            res.send('internal server error');
        }else{
            var temp = data.query.results.channel.item.condition.temp;
            res.send(temp.toString());
        }
    });
});

io.on('connection', function (socket) {
    console.log('user connected');
    
    socket.on('disconnect', function () {
        console.log('user disconnected');
    })
});


console.log('Server running...');