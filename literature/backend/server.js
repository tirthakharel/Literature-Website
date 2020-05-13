const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

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
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
