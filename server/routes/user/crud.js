const db = require("../../database/server").db;

exports.createuser = (req, res) => {
  db.query(
    "SELECT email FROM user WHERE email=?",
    [req.body.email],
    (err, data) => {
      if (err) {
        return res.json("error occured");
      } else if (data[0]) {
        console.log(data);
        return res.json("email already exist");
      } else {
        db.query(
          "INSERT INTO cart_table (user_id,product_id,size,quantity) VALUES (NULL,NULL,NULL,NULL)",
          (err, data) => {
            if (err) {
              return res.status(500).json("error occured");
            } else {
              const values = [
                req.body.name,
                req.body.email,
                req.body.number,
                req.body.password,
                req.body.state,
                req.body.city,
                req.body.house,
                req.body.pincode,
                req.body.landmark,
                data.insertId,
              ];
              const q =
                "INSERT INTO user (name,email,number,password,state,city,housenumber_housename,pincode,landmark,cart_id) VALUES(?,?,?,?,?,?,?,?,?)";
              db.query(q, values, (err, data) => {
                if (err) {
                  return res.status(500).json("error occured");
                } else {
                  return res.status(201).json("successfull");
                }
              });
            }
          }
        );
      }
    }
  );
};
exports.loginuser = (req, res, next) => {
  const values = [req.body.email, req.body.password];
  const q = "SELECT user_id FROM user WHERE email=? AND password=?";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.status(500).json("error occured");
    } else if (data.length > 0) {
      req.user = JSON.parse(JSON.stringify(data[0]));
      next();
    } else {
      return res.json("wrong email or password");
    }
  });
};
exports.addtocart = (req, res) => {
  const q = "INSERT INTO cart_table (user_id,product_id,size) VALUES (?,?,?)";
  const values = [req.user, req.body.productid, req.body.size];
  db.query(q, values, (err, data) => {
    if (err) {
      return res.status(500).json("error occured");
    } else {
      return res.json({ message: "successfull" });
    }
  });
};
exports.username = (req, res) => {
  const q = "SELECT name FROM user WHERE user_id=?";
  const value = [req.user];
  db.query(q, value, (err, data) => {
    if (err) {
      return res.status(500).json("error occured");
    } else {
      return res.json(data);
    }
  });
};
exports.deletecart = (req, res) => {
  const value = [req.body.cart_id];
  const q = "SELECT user_id FROM cart_table WHERE cart_id=?";
  db.query(q, value, (err, data) => {
    if (err) {
      return res.status(500).json("error occured");
    } else if (data[0].user_id == req.user) {
      const a = "DELETE FROM cart_table WHERE cart_id=?";
      db.query(a, value, (err, data1) => {
        if (err) {
          return res.status(500).json("error occured");
        } else {
          return res.json({ message: "successfully deleted" });
        }
      });
    } else {
      res.json({ message: "something went wrong" });
    }
  });
};
