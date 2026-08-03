const express = require("express");
const server = require("http").createServer();
const app = express();

app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

process.on("SIGINT", function interrupt(ss) {
  wss.clients.forEach(function each(client) {
    client.close();
  });
  server.close(() => {
    shutdownDB();
  });
});

server.on("request", app);
server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
// start websockets
const WebSocket = require("ws").Server;

const wss = new WebSocket({ server });

wss.on("connection", function connection(ws) {
  const connectonSize = wss.clients.size;
  console.log(`Clients connected ${connectonSize}`);

  wss.broadcast(`Current visitors ${connectonSize}`);

  if (ws.readyState === ws.OPEN) {
    ws.send("Welcome to haitham server");
  }

  db.run(
    `INSERT INTO visitors (count,time) VALUES (${connectonSize},datetime('now') )`,
  );

  ws.on("close", function close() {
    wss.broadcast(`Current visitors ${connectonSize}`);
    console.log("Client has been disconnected");
  });
});

wss.broadcast = function broadcast(data) {
  wss.clients.forEach((client) => client.send(data));
};
// end websockets

const sqlite = require("sqlite3");
const db = new sqlite.Database(":memory:");

db.serialize(() => {
  db.run(`
    CREATE TABLE visitors (
    count INTEGER,
    time TEXT
    )
    `);
});

function getCounts() {
  db.each("SELECT * FROM visitors", (err, row) => console.log(row));
}

function shutdownDB() {
  getCounts();
  console.log("shutting db");
  db.close();
}
