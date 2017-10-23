var express = require('express');
var path = require('path');
var request = require('request');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/__/_search', function (req, res) {
    console.log(req.body);

    var options = {
        url: 'http://10.21.137.43:9200/_search',
        method: 'POST',
        json:true,
        body: req.body
    };

    request(options, function (error, response, body) {
        if(error){
            res.send("error");
        }else {
            res.send(body);
        }
        res.end();
    });
});

app.use('/', express.static(path.join(__dirname, './app/public')));

var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at http://%s:%s', host, port);
});