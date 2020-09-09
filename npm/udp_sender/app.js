var dgram = require('dgram');
var s = dgram.createSocket('udp4');


var http = require('http');

var options = {
    host: '192.168.178.129',
    path: '/tizen/command.txt'
}
var request = http.request(options, function (res) {
    var data = '';
    res.on('data', function (chunk) {
        data += chunk;
    });
    s.send(Buffer.from("[{key:'command', value:'begin'}]"), 8080, '192.168.178.129');
    res.on('end', function () {
        console.log(data);

    });


});
function myFunc() {
  
  request.on('error', function (e) {
      console.log(e.message);
  });
  request.end();
}

setInterval(myFunc, 1500);