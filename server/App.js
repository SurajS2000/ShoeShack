const express = require("express");
const app = express();
const bodyParser = require("body-parser");
//importing database connection
const db = require("./database/server").db;
const adminlogin = require("./routes/admin/login");
const pages = require("./routes/admin/pages");
const admincrud = require("./routes/admin/crud");
const usercrud = require("./routes/user/crud");
const product = require("./routes/user/product");
const path = require("path");
const multer = require("multer");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "-" + Math.random(Math.random() * 1e9)
    );
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg" ||
      file.mimetype == "image/webp"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      const err = new Error("Only.png, .jpg, .webp and .jpeg format allowed");
      err.name = "ExtentionError";
      return cb(err);
    }
  },
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.use("/public", express.static(path.join(__dirname, "public")));

const createtoken=(req,res)=>{
  const accessToken=jwt.sign(req.user,process.env.TOKEN_SECRET,{expiresIn:'7d'});
  res.json({accessToken});
}
const aunthenticateToken=(req,res,next)=>{
  const token = req.headers['authorization']&&req.headers['authorization'].split(' ')[1];
  if(!token) return res.status(401).json({ message: 'Unauthorized' });
  jwt.verify(token, process.env.TOKEN_SECRET,(err,user) => {
    if (err) return res.status(403).json({message: 'something went wrong'});
    req.user = user.user_id;
    next();
  })
}

const checkout = async (req, res) => {
  console.log(req.totalcart.offer)
  try{const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
            currency: 'inr',
            product_data: {
                name: 'Shoes',
            },
            unit_amount:(req.totalcart[0].offer*100),
        },
        quantity: 1,
    },
    ],
    mode: 'payment',
    success_url: 'http://localhost:5173/success.html',
    cancel_url: 'http://localhost:5173/cancel.html',
  });

  const fulfillCheckout = async()=>{
    const checkoutSession = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items'],
    });
    if (checkoutSession.payment_status !== 'unpaid') {

    }
  }

  res.json({id:session.id});} catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(400).send('Failed to create checkout session');
  }
};

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to the database.");
  }
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Update to match your frontend's origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.get("/admin", adminlogin.home);
app.post("/admin/login", adminlogin.login);
app.get("/admin/addproduct", pages.addproduct);
app.get("/admin/dashboard", pages.dashboard);
app.get("/admin/order", pages.order);
app.get("/admin/users", pages.user);
app.get("/admin/productlist", pages.productlist);
app.post("/admin/addproduct", upload.array("image"), admincrud.addproduct);
app.get("/admin/updateproduct", pages.updateproduct);
app.post(
  "/admin/updateproduct",
  upload.array("image"),
  admincrud.updateproduct
);
app.get("/admin/deleteproduct", admincrud.deleteproduct);
app.get("/admin/deleteuser", admincrud.deleteuser);
app.get("/admin/updateuser", pages.updateuser);
app.post("/admin/updateuser", admincrud.updateuser);
app.get("/admin/searchproduct", pages.productsearch);
app.get("/admin/searchuser", pages.searchuser);
app.post("/create", usercrud.createuser);
app.post("/login", usercrud.loginuser, createtoken);
app.get("/username",aunthenticateToken,usercrud.username);
app.get("/home", product.home);
app.get("/product", product.product);
app.get("/search", product.search);
app.get("/searchnav", product.searchnav);
app.get("/cart", aunthenticateToken,product.carttotals, product.cart);
app.put("/cart",aunthenticateToken, usercrud.addtocart);
app.get("/checkout-cart",aunthenticateToken,product.carttotals, checkout);
app.post("/deletecartitem",aunthenticateToken,usercrud.deletecart);


app.listen(3000, (req, res) => {
  console.log("connected on port:3000");
});
