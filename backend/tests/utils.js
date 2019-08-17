const config = require('../src/config');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

exports.clearDB = () => {
    return mongoose.connect(config.url, {
        useNewUrlParser: true,
        useFindAndModify: false
    }).then(() => {
        console.log("Connected to database");
        return mongoose.connection.collections['users'].drop(function (err) {
            console.log('collection dropped');
        });
    }).catch(err => {
        console.log('Could not connect to the database.', err);
        process.exit();
    });
}
