// Create web server
// Run: node comments.js

var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function (req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  var pathname = url_parts.pathname;

  if (req.method == 'GET') {
    if (pathname == '/') {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<h1>Welcome. Please leave a message.</h1>');
      res.write('<form method="post" action="/message">');
      res.write('<input type="text" name="message" />');
      res.write('<input type="submit" value="Submit" />');
      res.write('</form>');
      res.end();
    } else if (pathname == '/message') {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write('<h1>Your message:</h1>');
      res.write('<p>' + query.message + '</p>');
      res.end();
    } else {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.write('<h1>Page not found</h1>');
      res.end();
    }
  } else if (req.method == 'POST') {
    if (pathname == '/message') {
      var body = '';
      req.on('data', function (data) {
        body += data;
      });
      req.on('end', function () {
        var post = querystring.parse(body);
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>Your message:</h1>');
        res.write('<p>' + post.message + '</p>');
        res.end();
      });
    } else {
      res.writeHead(404, {'Content-Type': 'text/html'});
      res.write('<h1>Page not found</h1>');
      res.end();
    }
  }
});

server.listen(3000, function () {
  console.log('Server running at http://localhost:3000/');
});