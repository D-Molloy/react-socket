const express = require("express");
// const path = require("path");
const cors = require("cors")
const http = require("http")
const socketIo = require('socket.io')
const routes = require("./routes/index")
const app = express();

const PORT = process.env.PORT || 4001;
// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes)

const server = http.createServer(app)

const io = socketIo(server)

const getApiAndEmit = socket => {
  console.log('socket.id', socket.id)
  const response = new Date()
  socket.emit("time", response)
}

let interval;
io.on("connection", socket => {
  console.log("New client connected")
  if (interval) {
    clearInterval(interval)
  }
  interval = setInterval(() => getApiAndEmit(socket), 1000);
  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval)
  })
})

// io.on('connect_error', (error) => {
//   console.log('error', error)
// });

server.listen(PORT, () => console.log(`"Listening on http://localhost:${PORT}`))
// Define API routes here

// Send every other request to the React app
// Define any API routes before this runs
// app.get("/", (req, res) => {
//   res.send({ response: "I am alive" }).status(200);
// });

// app.listen(PORT, () => {
//   console.log(`🌎 ==> API server now on port ${PORT + 1}!`);
// });
