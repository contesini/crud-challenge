const PORT = process.env.PORT || 3000
const MONGO_URL = process.env.MONGO_URL || 'localhost'
module.exports = {
    url: `mongodb://${MONGO_URL}:27017/crud-brave`,
    serverport: PORT 
}