const db = require("../../database/server").db;
exports.home = (req, res) => {
  res.render("login", { message: false });
};
exports.login = (req, res) => {
  const q = "SELECT * FROM admin WHERE user_name = ? AND password = ?";
  const value = [req.body.username, req.body.password];
  db.query(q, value, (err, data) => {
    if (err) {
      return res.json(err);
    }
    if (data.length > 0) {
      return res.render("dashboard");
    } else {
      return res.render("login", { message: true });
    }
  });
};
