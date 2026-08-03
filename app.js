const express = require("express");
const server = require("http").createServer();
const app = express();

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

server.on("request", app);
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});

const WebSocket = require("ws").Server;

const wss = new WebSocket({ server });

wss.on("connection", function connection(ws) {
  const connectonSize = wss.clients.size;
  console.log(`Clients connected ${connectonSize}`);

  wss.broadcast(`Current visitors ${connectonSize}`);

  if (ws.readyState === ws.OPEN) {
    ws.send("Welcome to haitham server");
  }

  ws.on("close", function close() {
    wss.broadcast(`Current visitors ${connectonSize}`);
    console.log("Client has been disconnected");
  });
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach((client) => client.send(data));
};
