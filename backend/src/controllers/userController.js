const User = require('../db/models/userModel');

/**
 * Create new user
 */
exports.create = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "User can not be empty"
        });
    }

    const user = new User({
        name: req.body.name,
        phones: req.body.phones || [],
        emails: req.body.emails || [],
        whatsappContacts: req.body.whatsappContacts || []
    });

    user.save()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while creating the new user"
            });
        });
};

/**
 * return all users
 */
exports.findAll = (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Something wrong while retrieving users."
            });
        });
};

/**
 * Find a single user with a userId
 */
exports.findOne = (req, res) => {
    User.findById(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Something wrong retrieving user with id " + req.params.userId
            });
        });
};

/**
 * update user
 */
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    User.findByIdAndUpdate(req.params.userId, {
        name: req.body.name,
        phones: req.body.phones || [],
        emails: req.body.emails || [],
        whatsappContacts: req.body.whatsappContacts || []
    }, { new: true})
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send(user);
        }).catch(err => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Something wrong updating note with id " + req.params.userId
            });
        });
};

/**
 * Delete a user with the specified userId in the request
 */
exports.deleteUser = (req, res) => {
    User.findByIdAndRemove(req.params.userId)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            res.send({ message: "User deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "User not found with id " + req.params.userId
                });
            }
            return res.status(500).send({
                message: "Could not delete user with id " + req.params.userId
            });
        });
};