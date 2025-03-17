const jwt = require("jsonwebtoken");
// Get user detials
const fetch = (req, res, next) => {
  // Get the user from the jwt token and add id to req object
  const token = req.header("token");
  if (!token) {
    return res.status(401).send({ error: "token not found" });
  }
  try {
    const data = jwt.verify(token, process.env.Secret);
    req.userID = data.user;
    console.log(data);
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
};
module.exports = fetch;
