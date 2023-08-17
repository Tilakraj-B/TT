const express = require('express')
const get = require('./routes/get')
const db = require('./db/connection')

const app = express();

const PORT = 3000;

app.use('/get',get)






app.listen(3000 , ()=>{
    console.log(`The server is running on PORT : ${PORT}`);
})
