const jwt = require("jsonwebtoken");

// Middleware to verify the user's token.
// This middleware is used in every route that is private.
module.exports = function (req, res, next) {
  //Get the authenthication header from the request.
  const authHeader = req.headers["authorization"];
  let token;
  if (authHeader) {
    //Remove "Bearer" from the header.
    token = authHeader.split(" ")[1];
  } else {
    token = null;
  }
  //Return 401 unauthorized if user has no token
  if (token == null) return res.sendStatus(401);
  //Verify the token with the process secret and the user token, if errors again return 401 unauthorized.
  jwt.verify(token, `${process.env.SECRET}`, (err, user) => {
    if (err) return res.status(401).send(err);
    req.user = user;
    next();
  });
};
