const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const config = require('../config/config');
const expressJwt = require("express-jwt");
const { mongodb } = require('../keys');
const signup =  () => {
  

}

const signin = async (req, res) => {
  try {
    // Request body email can be an email or username
    const userFound = await User.findOne({ email: req.body.email });
    if (!userFound) return res.status(400).json({ token: null, message: "Usuario no encontrado" });
    const matchPassword = await User.comparePassword(req.body.password, userFound.password);
    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Contraseña erronea",
      });
      const token = jwt.sign(
        {
          _id: userFound._id
        },
        mongodb.JWT_SECRET
      );
      res.cookie("t", token, {
        expire: new Date() + 9999
      });
      return res.json({
        token,
        user: { _id: userFound._id, name: userFound.name, email: userFound.email }
      });

  } catch (error) {
    console.log(error);
  }
};

const signout = (req, res) => {
  res.clearCookie("t");
  return res.status("200").json({
    message: "sesión cerrada"
  });
};

const requireSignin = expressJwt({
  secret: mongodb.JWT_SECRET,
  userProperty: "auth",
  algorithms: ['HS256']
});

const checkDuplicateUsernameOrEmail = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (user)
      return res.status(400).json({ message: "El usuario ya existe" });
    const email = await User.findOne({ email: req.body.email });
    if (email)
      return res.status(400).json({ message: "El email ya existe" });
    next();
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const hasAuthorization = (req, res, next) => {
  
  const authorized = req.profile._id == req.auth._id;
  if (!authorized) {
    return res.status("403").json({
      error: "El usuario no está autorizado"
    });
  }
  next();
};

module.exports = { signin, signout, signup, checkDuplicateUsernameOrEmail,requireSignin, hasAuthorization };