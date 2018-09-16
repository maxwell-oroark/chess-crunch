var https = require('https');
var fs = require('fs');
var Chess = require('chess.js').Chess
var chess = new Chess();

var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = https.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
};

fs.readFile('./test.pgn', "utf8", (err, data) => {
  console.log(data.toString())
  console.log(chess.load_pgn(data.toString(), { sloppy: true }))
  console.log(chess.ascii())
});
