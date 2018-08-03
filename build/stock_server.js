"use strict";
var express = require("express");
var ws_1 = require("ws");
var path = require("path");
var app = express();
app.use('/', express.static(path.join(__dirname, '..', 'client')));
app.get('/', function (request, response) {
    response.send('this is home page');
});
app.get('/api/stock', function (request, response) {
    var result = stocks;
    var params = request.query;
    if (params.name) {
        result = result.filter(function (stock) { return stock.name.indexOf(params.name) != -1; });
    }
    response.json(result);
});
app.get('/api/stock/:id', function (request, response) {
    response.json(stocks.find(function (stock) { return stock.id = request.params.id; }));
});
var server = app.listen(8081, 'localhost', function () {
    console.log('server is up, url is http://localhost:8081');
});
var subscribtions = new Set(); // variable to store all the connected clients
var wsServer = new ws_1.Server({ port: 8082 });
wsServer.on('connection', function (websocket) {
    // and we will defeine what to do with this websocket
    subscribtions.add(websocket);
    // websocket.send('welcome connect to the server');
    // websocket.on('message',message =>{
    //   console.log("receieve message from client, content is: "+message);
    // });
});
var messageCount = 0;
setInterval(function () {
    subscribtions.forEach(function (ws) {
        if (ws.readyState === 1) {
            ws.send(JSON.stringify({ messageCount: messageCount++ }));
        }
        else {
            subscribtions.delete(ws);
        }
    });
}, 2000);
var Stock = (function () {
    function Stock(id, name, price, rating, desc, categories) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Stock;
}());
exports.Stock = Stock;
var stocks = [
    new Stock(1, "first stoock", 1.99, 3.5, "this is the first stock", ["IT", "Web"]),
    new Stock(2, "second stoock", 2.99, 4.0, "this is the second stock", ["IT", "Finance"]),
    new Stock(3, "third stoock", 4.99, 2.5, "this is the third stock", ["web"]),
    new Stock(4, "forth stoock", 6.99, 5.0, "this is the forth stock", ["Finance", "web"]),
    new Stock(5, "fifth stoock", 9.99, 4.0, "this is the fifth stock", ["IT"]),
    new Stock(6, "sixth stoock", 8.99, 4.5, "this is the sixth stock", ["Finance"]),
];
