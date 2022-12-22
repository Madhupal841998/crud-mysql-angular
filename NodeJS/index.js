const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const dotenv = require('dotenv')

const con = require('./db.js');
var studentController = require('./controllers/studentController.js');
const PORT = 3000;
var app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:4200' }));

app.listen(PORT, () => console.log(`Server started at port : ${PORT}`));


app.use('/students', studentController);