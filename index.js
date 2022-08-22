const connectToMongo = require("./db");
const express = require('express');
var cors = require('cors');

connectToMongo();
const app = express();
const port = 5000 ; 

app.use(cors());
app.use(express.json());

//Available Routes 
 app.use('/api/auth' , require('./routes/Auth'));
 app.use('/api/likes',require('./routes/Likes'));
 app.use('/api/posts', require('./routes/Posts'));

 app.listen(port, ()=>{
    console.log(`Mix-mint backend listening at http://localhost:${port}`)
 })