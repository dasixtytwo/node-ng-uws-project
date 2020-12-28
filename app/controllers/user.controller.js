const User = require('../models/user.model');
const Role = require('../models/role.model');

exports.allPublicAccess = (req, res) => {
  res.status(200).send("This is the Public HomePage.");
};

exports.userDashboard = (req, res) => {
  res.status(200).send("This is the User Page and is a private page.");
};

exports.adminDashboard = (req, res) => {
  res.status(200).send("This is the Admin Page and is a private page.");
};

exports.moderatorDashboard = (req, res) => {
  res.status(200).send("This is the Moderator Page and is a private page.");
};

// @route  GET api/users/
// @desc   Get users
// @access Private
exports.findAll = (req, res) => {
  User.find()
    .populate('user', ['username', 'email', 'roles'])
    .then(users => {
      if (!users) {
        errors.nouser = 'There are no users';
        res.status(404).json(errors);
      }
      res.json(users);
    })
    .catch(err => res.status(404).json({
      user: 'There are no users'
    }));
}

// @route  GET api/users/user/:id
// @desc   Get user by id
// @access Private
exports.find_user_by_id = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving User with id=" + id });
    });
};

// @route  PUT api/users/user/:id
// @desc   Put user by id
// @access Private
exports.update_user_by_id = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`
        });
      } else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating User with id=" + id
      });
    });
};

// @route  DELETE api/users/user/:id
// @desc   Delete user
// @access Private
exports.delete_user_by_id = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete User with id=${id}. Maybe User was not found!`
        });
      } else {
        res.send({
          message: "User was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete User with id=" + id
      });
    });
};
