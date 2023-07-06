const { Order, CartItem } = require("../models/order.model");
const _ = require("lodash");
const errorHandler = require("../manageError/dbErrorHandler");
const fs = require('fs');
const expressJwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const { mongodb } = require('../keys');

const create = async (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);

  for (var i = 0; i < order.products.length; i++) {
    if (order.products[i].product.type == 'API') {
      const token = jwt.sign({
        _id: order._id
      }, mongodb.TOKEN, { expiresIn: 90 });
      order.products[i].product.TOKEN = token;
    }
  }
  order.save((err, result) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    res.status(200).json(result);
  });
};

const listByShop = (req, res) => {
  Order.find({ "products.shop": req.shopId }).populate({ path: "products.product", select: "_id name price" }).sort("-created").exec((err, orders) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    res.json(orders);
  });
};

const update = (req, res) => {
  Order.update({ "products._id": req.body.cartItemId }, {
    $set: {
      "products.$.status": req.body.status
    }
  }, (err, order) => {
    if (err) {
      return res.status(400).send({
        error: errorHandler.getErrorMessage(err)
      });
    }
    res.json(order);
  });
};

const getStatusValues = (req, res) => {
  res.json(CartItem.schema.path("status").enumValues);
};

const orderByID = (req, res, next, id) => {
  Order.findById(id).populate("products").exec((err, order) => {
    if (err || !order) return res.status("400").json({
      error: "Pedido no encontrado"
    });
    req.order = order;
    next();
  });
};

const findProductOrder = async (req, id, name) => {
  await Order.findById(id).populate("products").exec((err, order) => {
    if (err || !order) return 'Not found';

    for (var i = 0; i < order.products.length; i++) {
      if (order.products[i].product.File !== undefined && order.products[i].product.File == name) {
        return order.products[i].product.TOKEN;
      };
    }
  });
};

const getFile = async (req, res) => {
  if (jwt.verify(req.body.token, mongodb.TOKEN)) {
    var config = {
      method: 'get',
      url: 'http://localhost:3000/dowloadFile/' + req.params.File,
      headers: {
        'Authorization': req.headers.authorization,
        'Accept-Encoding': 'gzip, deflate, br',
        'Host': 'localhost:8000',
        'Origin': 'localhost:3000',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36',
        'Accept': 'application/json,Content-Type:application/json,Access-Control-Allow-Origin:http://localhost:3000,Access-Control-Allow-Methods:*,Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept,Authorization,referrerPolicy : no-referrer-when-downgrade'
      }
    };
  };

  axios(config).then(function (response) {
    return response.data;
    //console.log(JSON.stringify(response.data));
  }).catch(function (error) {
    console.log(error);
  });
};

const listByUser = (req, res) => {
  Order.find({ user: req.profile._id }).sort("-created").exec((err, orders) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
      });
    }
    res.json(orders);
  });
};

const read = (req, res) => {
  return res.json(req.order);
};

const prodFind = (req, res, next, id) => {
  let product = '';
  req.order.products.forEach(prod => {
    if (prod.product._id == id) product = prod;
  });
  req.product = product;
  next();
};

const isPurchasedProduct = (req, res, next) => {
  console.log('purchase check');
  if (req.order.products.indexOf(req.product.File) < -1) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err)
    });
  }
  next();
};

module.exports = {
  create,
  listByShop,
  update,
  getStatusValues,
  orderByID,
  listByUser,
  read,
  isPurchasedProduct,
  getFile,
  prodFind,
  findProductOrder
};