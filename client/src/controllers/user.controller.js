const User = require("../models/user.model");
const _ = require("lodash");
const errorHandler = require("../manageError/dbErrorHandler");

const create = async (req, res, next) => {

  const user = new User(req.body);
  user.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    res.status(200).json({
      message: "¡Registro completado!"
    });
  });
  
};

const list = (req, res) => {
  User.find((err, users) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    res.json(users);
  }).select("Nombre del correo electrónico actualizado ");
};

const userByID = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user)
      return res.status("400").json({
        error: "Usuario no encontrado"
      });
    req.profile = user;
    next();
  });
};

const read = (req, res) => {
  req.profile.password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

const update = (req, res, next) => {
  let user = req.profile;
  user = _.extend(user, req.body);
  user.updated = Date.now();
  user.save(err => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  });
};

const remove = (req, res, next) => {
  let user = req.profile;
  user.remove((err, deletedUser) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    deletedUser.hashed_password = undefined;
    deletedUser.salt = undefined;
    res.json(deletedUser);
  });
};

const isSeller = (req, res, next) => {
  const isSeller = req.profile && req.profile.seller;
  if (!isSeller) {
    return res.status("403").json({
      error: "El usuario no es un vendedor"
    });
  }
  next();
};

module.exports = {
  isSeller,
  create,
  userByID,
  read,
  list,
  remove,
  update,
};