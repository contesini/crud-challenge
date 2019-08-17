const express = require('express');
const bodyParser= require('body-parser');
const config = require('./config');
const app = express();
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
require('../src/db/databaseConnection')
app.use(bodyParser.json());
require('../src/routers/userRouter')(app)


app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.json({ "message": "Olá eu sou o goku!" });
});

app.listen(config.serverport, () => {
    console.log(`Server is listening on port ${config.serverport}🚀🚀🚀!!!`);
});

module.exports = app;