const db = require("../../database/server").db;

exports.addproduct = (req, res) => {
  res.render("addproduct", { url: "./addproduct", data: "" });
};
exports.dashboard = (req, res) => {
  res.render("dashboard");
};
exports.order = (req, res) => {
  res.render("order");
};
exports.user = (req, res) => {
  const q = "SELECT user_id,name,email,number FROM user";
  db.query(q, (err, data) => {
    if (err) {
      res.render("dashboard");
    } else {
      res.render("user", { data });
    }
  });
};
exports.productlist = (req, res) => {
  const q = "SELECT * FROM  product_table";
  db.query(q, (err, data) => {
    if (err) {
      res.render("dashboard");
    } else {
      res.render("productlist", { data });
    }
  });
};
exports.updateproduct = (req, res) => {
  const q = "SELECT * FROM product_table WHERE  product_id = ?";
  db.query(q, [req.query.id], (err, data) => {
    res.render("addproduct", {
      url: `./updateproduct?id=${req.query.id}`,
      data,
    });
  });
};
exports.updateuser = (req, res) => {
  const q = "SELECT * FROM user WHERE  user_id = ?";
  db.query(q, [req.query.id], (err, data) => {
    res.render("updateuser", { data });
  });
};
exports.productsearch = (req, res) => {
  const q =
    "SELECT * FROM product_table WHERE name LIKE ? OR category LIKE ? OR subcategory LIKE ? OR brand LIKE ?";
  const value = [
    `%${req.query.search}%`,
    `%${req.query.search}%`,
    `%${req.query.search}%`,
    `%${req.query.search}%`,
  ];
  db.query(q, value, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render("productlist", { data });
    }
  });
};
exports.searchuser = (req, res) => {
  const q =
    "SELECT * FROM user WHERE name LIKE ? OR email LIKE ? OR number LIKE ?";
  const value = [
    `%${req.query.search}%`,
    `%${req.query.search}%`,
    `%${req.query.search}%`,
  ];
  db.query(q, value, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render("user", { data });
    }
  });
};
