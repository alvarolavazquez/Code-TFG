const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("./config/config");
const mongoose = require("mongoose");
const Grid = require("gridfs-stream");
const orderCtrl = require("./controllers/order.controller");
const jwt = require("jsonwebtoken");
const { mongodb } = require('./keys');
const { Order, CartItem } = require("./models/order.model");

const taskRouter = require("./routes/task.routes");
const usersRouter = require("./routes/users.routes");
const authRouter = require("./routes/auth.routes");
const shopRouter = require("./routes/shop.routes");
const productURLRoutes = require("./routes/productURL.routes");
const productAPIRoutes = require("./routes/productAPI.routes");
const orderRoutes = require("./routes/order.routes");

// Initializations
require("dotenv").config();
require('./database');
const app = express();

const connection = require('./database.js');
let gfsSF;
let gfs;
connection();

const conn = mongoose.connection;
conn.once("open", function () {
  gfsSF = Grid(conn.db, mongoose.mongo);
  gfsSF.collection("SubscriptionFiles");
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("NormalFiles");
});

//settings
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
//app.set('port2', process.env.PORT || 9876);
//app.use( cors(config.application.cors.server) );
app.use(cors({ origin: true, credentials: true }));

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'mysecreysession',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//Routes
app.use('/', taskRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/shops/", shopRouter);
app.use("/api/products/URL", productURLRoutes);
app.use("/api/products/API", productAPIRoutes);
app.use('/api/orders', orderRoutes);
app.get("/downloadFile/:orderId/:File", async (req, res) => {

  //token = await orderCtrl.findProductOrder(req.params.orderId, req.params.File)
  await Order.findById(req.params.orderId).populate("products").exec((err, order) => {
    let token = '';
    if (err || !order) return res.status(404).json({ message: "Not Found" });

    for (var i = 0; i < order.products.length; i++) {
      if (order.products[i].product.File !== undefined && order.products[i].product.File == req.params.File) {
        token = order.products[i].product.TOKEN;
      };
    }
    jwt.verify(token, mongodb.TOKEN, async (error, decoded) => {
      if (error != null && error == 'TokenExpiredError: jwt expired') {
        return res.status(401).send(error);
      } else {
        try {
          gfsSF.files.findOne({ filename: req.params.File }).then(file => {
            const readStream = gfsSF.createReadStream(file.filename);
            readStream.pipe(res);
          });
        } catch (error) {
          return res.status(404).json({
            message: "Not found"
          });
        };
      }
    });
  });
});

//Static files
app.use(express.static(path.join(__dirname, "public")));

//starting the server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});

module.exports = app;