const http = require('http');

http.createServer(
function(req,res){


res.write("on the way to be full stack engineer");
res.end();
}
).listen(3000)

 console.log("Server started on port 3000");

