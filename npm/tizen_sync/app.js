var express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
var app = express();

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get('/', function (req, res) {
  var timeInMs = Date.now();
  res.send(timeInMs + "");
});
// router.get('/handle', function (req, res) {
//   // console.log(req);
//   console.log(req.params); 
// });

app.listen(3004, function () {
	console.log("→ TGE content + sync server running (listening on port 3004)");
});

// app.get("/page/:id",function(request, response){
//     var id = request.params.id;
//     // do something with id
//     // send a response to user based on id
//     var obj = { id : id, Content : "content " +id };

//     response.writeHead(200, {"Content-Type": "application/json"});
//     response.write(JSON.stringify(obj));
// });

router.get("receive",function(request, response){
	console.log("Got something from a Tizen Device");
    // var id = request.params.id;
    console.log(request);
    // do something with id
    // send a response to user based on id
    // var obj = { id : id, Content : "content " +id };

    // response.writeHead(200, {"Content-Type": "application/json"});
    // response.write(JSON.stringify(obj));
});

router.post('handle',(request,response) => {
    //code to perform particular action.
    //To access POST variable use req.body()methods.
    console.log(request.body);
});

router.post('/in', function (req, res) {
  res.send('POST request to homepage')
  console.log("→ IN ___");
  //const obj = JSON.parse(JSON.stringify(req.body));
  console.log(req.body);
  console.log(req.body.id);
  
})

app.use("/", router);