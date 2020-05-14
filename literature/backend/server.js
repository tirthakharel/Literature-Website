const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const socketIO = require('socket.io');
const http = require('http');

// app
const app = express();
app.use(bodyParser.json());
app.use(cors());
// API

// app.use(express.static(path.join(__dirname, '../build')))
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../build'))
// })

const port = process.env.PORT || 5000;

const server = http.createServer(app);
const io = socketIO(server);

server.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = {
  http,
  io,
  app,
};
