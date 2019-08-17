
module.exports = (app) => {
    const UsersController = require('../controllers/userController');

    // Create a new Uer
    app.post('/user', UsersController.create);

    // Retrieve all Users
    app.get('/users', UsersController.findAll);

    // Retrieve a single User with userId
    app.get('/users/:userId', UsersController.findOne);

    // Update a User with userId
    app.put('/users/:userId', UsersController.update);

    // Delete a User with userId
    app.delete('/users/:userId', UsersController.deleteUser);
}