"use strict";
var http = require("http");
var server = http.createServer(function (request, response) {
    response.end("Hello Node!");
});
server.listen(8000);
