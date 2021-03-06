var http = require('http');
var fs = require('fs');
var port = process.argv[2];

http.createServer(function(req, res){
  // Pipe the http request into a local file, we can see it in the file system
  var writeStream = fs.createWriteStream('./file.bin');
  req.pipe(writeStream);

  var len = 0;
  req.on('data', function(chunk){
    len += chunk.length;
  });
  req.on('end', function(){
    res.end("length: " + len + "\n");
  });
}).listen(port);

console.log("Server started on port", port);
