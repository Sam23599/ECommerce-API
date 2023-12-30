const express = require('express');
const db = require('./config/mongoose');
const app = express();

const port = process.env.PORT || 6200;

// body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set up routes
app.use('/', require('./routes/index'));

app.listen(port, function(err){
    if(err){
        console.log(`Error on server port: ${port}`);
    }
    console.log(`Server is up at port: ${port}`);
});