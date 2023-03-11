const express = require('express');
const PORT = 3000;
const app = express();
const db = require('./config/mongoose');

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//routes
app.use('/', require('./routes/api'));

//listening
app.listen(PORT, (err) => {
    if(err){console.log(err);}

    console.log(`server running on port ${PORT}`);
});