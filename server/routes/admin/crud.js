const db = require("../../database/server").db;

exports.addproduct = (req, res) => {
  let image = "";
  for (i = 0; i < req.files.length; i++) {
    if (i == 0) {
      image = req.files[i].filename;
    } else {
      image = image + "," + req.files[i].filename;
    }
  }
  const values = [
    req.body.productname,
    req.body.category,
    req.body.subcategory,
    req.body.brand,
    req.body.discription,
    req.body.orginalprice,
    req.body.offerprice,
    req.body.size,
    image,
  ];
  const q =
    "INSERT INTO product_table (name,category,subcategory,brand,description,orginal_price,offer_price,available_size,image_name) VALUES(?,?,?,?,?,?,?,?,?)";
  db.query(q, values, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  });
};
exports.deleteproduct = (req, res) => {
  const q = "DELETE FROM product_table WHERE product_id = ?";
  db.query(q, [req.query.id], (err, data) => {
    if (err) {
      res.json("something went wrong");
    } else {
      res.json("success");
    }
  });
};
exports.updateproduct = (req, res) => {
  db.query(
    "SELECT image_name FROM product_table WHERE product_id=?",
    [req.query.id],
    (err, data) => {
      if (err) {
        return res.json(err);
      } else {
        let image = data[0].image_name;
        if (req.files) {
          for (i = 0; i < req.files.length; i++) {
            image = image + "," + req.files[i].filename;
          }
        }
        const q =
          "UPDATE product_table SET name=?,category=?,subcategory=?,brand=?,description=?,orginal_price=?,offer_price=?,available_size=?,image_name=? WHERE product_id=?";
        const values = [
          req.body.productname,
          req.body.category,
          req.body.subcategory,
          req.body.brand,
          req.body.discription,
          req.body.orginalprice,
          req.body.offerprice,
          req.body.size,
          image,
          req.query.id,
        ];
        db.query(q, values, (err, data) => {
          if (err) {
            return res.json(err);
          } else {
            return res.json(data);
          }
        });
      }
    }
  );
};
exports.deleteuser = (req, res) => {
  const q = "DELETE FROM user WHERE user_id = ?";
  db.query(q, [req.query.id], (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
};
exports.updateuser = (req, res) => {
  const q =
    "UPDATE user SET name=?,email=?,number=?,password=? WHERE user_id=?";
  const values = [
    req.body.name,
    req.body.email,
    req.body.number,
    req.body.password,
    req.query.id,
  ];
  db.query(q, values, (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json(data);
    }
  });
};
