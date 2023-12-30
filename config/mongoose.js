const mongoose = require('mongoose');

const atlasConnectionString = 'mongodb+srv://satyamvirat:3DLc7qzoVqyMo3Us@cluster0.vrnwhpn.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(atlasConnectionString);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));

db.once('open', ()=>{
    console.log('Mongoose Connected');
})

module.exports = db;