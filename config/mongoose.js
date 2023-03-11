const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/pollingApi');

const db = mongoose.connection;

db.once('open', (err) => {
    if(err){
        console.log(err);
    }
    console.log('database connected to the server successfully!');
});

module.exports = db;