const config = require('../config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(config.url, {
    useNewUrlParser: true,
    useFindAndModify: false
}).then(() => {
    console.log("Connected to database");
}).catch(err => {
    console.log('Could not connect to the database.', err);
    process.exit();
});