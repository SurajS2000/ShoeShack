const db = require("../../database/server").db;

exports.home = (req, res) => {
  const q =
    "SELECT product_id,name,brand,orginal_price,offer_price,rating,number_of_rating,image_name,subcategory FROM product_table";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json("server error");
    } else {
      res.status(200).json(data);
    }
  });
};
exports.product = (req, res) => {
  const q = "SELECT * FROM product_table WHERE product_id=?";
  db.query(q, [req.query.id], (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).json("server error");
    } else {
      res.status(200).json(data);
    }
  });
};
exports.search = (req, res) => {
  const q =
    "SELECT product_id,name,brand,orginal_price,offer_price,rating,number_of_rating,image_name,subcategory FROM product_table WHERE name LIKE ? OR category LIKE ? OR subcategory LIKE ? OR brand LIKE ?";
  db.query(
    q,
    [
      `%${req.query.search}%`,
      `%${req.query.search}%`,
      `%${req.query.search}%`,
      `%${req.query.search}%`,
    ],
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json("server error");
      } else {
        res.status(200).json(data);
      }
    }
  );
};
exports.searchnav = (req, res) => {
  const q =
    "SELECT product_id,name,brand,image_name,category FROM product_table WHERE name LIKE ? OR category LIKE ? OR subcategory LIKE ? OR brand LIKE ? LIMIT 8";
  db.query(
    q,
    [
      `%${req.query.search}%`,
      `%${req.query.search}%`,
      `%${req.query.search}%`,
      `%${req.query.search}%`,
    ],
    (err, data) => {
      if (err) {
        console.log(err);
        res.status(500).json("server error");
      } else {
        res.status(200).json(data);
      }
    }
  );
};
exports.cart = (req,res) =>{
  const q = 'SELECT cart_table.cart_id, cart_table.product_id, cart_table.size, product_table.name, product_table.brand, product_table.image_name, product_table.rating, product_table.orginal_price, product_table.offer_price, product_table.number_of_rating FROM cart_table INNER JOIN product_table ON cart_table.product_id = product_table.product_id WHERE user_id =?'
  const value = [req.user];
  db.query(q,value,(err,data)=>{
    if (err) {
      res.status(500).json("server error");
    }else{
      res.status(200).json({product:data,total:req.totalcart});
    }
  })
}
exports.carttotals = (req,res,next) => {
  const q = 'SELECT COUNT(cart_table.cart_id) AS items, SUM(product_table.orginal_price) AS orginal, SUM(product_table.offer_price) AS offer FROM cart_table INNER JOIN product_table ON cart_table.product_id = product_table.product_id WHERE user_id =?'
  const value = [req.user];
  db.query(q,value,(err,data)=>{
    if (err) {
      res.status(500).json("server error");
    }else{
      req.totalcart = data;
      next()
    }
  })
}
