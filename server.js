const express = require("express");
const path = require("path");
const http = require("http")
const socketIo = require('socket.io')
const routes = require("./routes/index")
const app = express();

const PORT = process.env.PORT || 3001;
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes)

const server = http.createServer()

const io = socketIo(server)

const getApiAndEmit = socket => {
  const response = new Date()
  socket.emit("From API", response)
}

let interval;
io.on("connection", socket => {
  console.log("New client connected")
  console.log('socket', socket)
  if (interval) {
    clearInterval(interval)
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval)
  })
})

server.listen(PORT, () => console.log(`"Listening on http://localhost:${PORT}`))
// Define API routes here

// Send every other request to the React app
// Define any API routes before this runs

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

// app.listen(PORT, () => {
//   console.log(`🌎 ==> API server now on port ${PORT}!`);
// });
