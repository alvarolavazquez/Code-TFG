const Shop = require("../models/shop.model");
const _ = require("lodash");
const errorHandler = require("../manageError/dbErrorHandler");
const formidable = require("formidable");
const fs = require("fs");
const profileImage = '../App/src/assets/images/profile-pic.png';

const create = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      res.status(400).json({
        message: "No se pudo cargar la imagen"
      });
    }
    let shop = new Shop(fields);
    shop.owner = req.profile;
    if (files.image) {
      shop.image.data = fs.readFileSync(files.image.path);
      shop.image.contentType = files.image.type;
    }
    shop.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler.getErrorMessage(err)
        });
      }
      res.status(200).json(result);
    });
  });
};

const photo = (req, res, next) => {
  if (req.shop.image.data) {
    res.set("Content-Type", req.shop.image.contentType);
    return res.send(req.shop.image.data);
  }
  next();
};
const defaultPhoto = (req, res) => {
  return res.sendFile(process.cwd() + profileImage);
};

const list = (req, res) => {
  Shop.find((err, shops) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    res.json(shops);
  });
};

const listByOwner = (req, res) => {
  Shop.find({ owner: req.profile._id }, (err, shops) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err),
        message: "No se encuentra propietario"
      });
    }
    res.json(shops);
  });
};

const shopByID = (req, res, next, id) => {
  Shop.findById(id).exec((err, shop) => {
    if (err || !shop) return res.status("400").json({
      error: "Tienda no encontrada"
    });
    req.shop = shop;
    next();
  });
};
const read = (req, res) => {
  req.shop.image = undefined;
  return res.json(req.shop);
};

const isOwner = (req, res, next) => {
  Shop.findOne({ _id: req.params.shopId }).exec((err, shop) => {
    if (err || !shop || !shop.owner == req.auth._id) return res.status("403").json({
      error: "El usuario no está autorizado"
    });
  });
  next();
};

const update = (req, res, next) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        message: "No se pudo cargar la foto"
      });
    }
    let shop = req.shop;
    shop = _.extend(shop, fields);
    shop.updated = Date.now();
    if (files.image) {
      shop.image.data = fs.readFileSync(files.image.path);
      shop.image.contentType = files.image.type;
    }
    shop.save((err, result) => {
      if (err) {
        return res.status(400).send({
          error: errorHandler.getErrorMessage(err)
        });
      }
      res.json(result);
    });
  });
};

const remove = (req, res, next) => {
  let shop = req.shop;
  shop.remove((err, deletedShop) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    res.json(deletedShop);
  });
};

module.exports = {
  create,
  list,
  listByOwner,
  shopByID,
  read,
  update,
  isOwner,
  remove,
  photo,
  defaultPhoto
};