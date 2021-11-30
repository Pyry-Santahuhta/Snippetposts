const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  let token;
  if (authHeader) {
    token = authHeader.split(" ")[1];
  } else {
    token = null;
  }
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, `${process.env.SECRET}`, (err, user) => {
    if (err) return res.status(401).send(err);
    req.user = user;
    next();
  });
};
