const mongoose = require('mongoose');

const Phone = mongoose.Schema({
    ddd: String,
    phoneNumber: String,
    isWhatsApp: Boolean
}, {
        timestamps: true
    });

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phones: [Phone],
    emails: [String],
}, {
        timestamps: true
    });


module.exports = mongoose.model('Users', UserSchema);