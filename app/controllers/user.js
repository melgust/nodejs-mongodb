const User = require('../models/user');

const users = {

    // GET get all Users
    getUsers: function(req, res) {
        User.find({}).then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occurred while retrieving users."
            });
        })
    },
    // GET User by id
    getUsersById: function(req, res) {
        const id = req.params.id;
        User.findById(id).then(data => {
            if (!data)
                res.status(404).send({
                    message: "User with id " + id + " is not found."
                });
            else res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Error occured while retrieving User with id " + id
            })
        })
    },
    // PUT update User by id
    updateUser: function(req, res) {
        if (!req.body) {
            return res.status(400).send({
                message: "Data to update can not be empty!"
            });
        }

        const id = req.params.id;

        User.findByIdAndUpdate(id, req.body, {
                useFindAndModify: false
            })
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Failed to update User with id=${id}.`
                    });
                } else res.send({
                    message: "User was updated successfully."
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error occured while updating User with id=" + id
                });
            });
    },
    // DELETE delete User by id
    deleteUser: function(req, res) {
        const id = req.params.id;

        User.deleteOne({
                _id: id
            })
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Failed to delete User with id=${id}.`
                    });
                } else res.send({
                    message: "User was deleted successfully."
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error occured while deleting User with id=" + id
                });
            });
    },
    // DELETE remove all Users
    deleteAllUsers: function(req, res) {
        User.deleteMany({})
            .then(data => {
                res.send({
                    message: "All Users was deleted successfully."
                });
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error occured while deleting all Users"
                });
            });
    }
}

module.exports = users;