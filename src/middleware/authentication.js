const jwt = require("jsonwebtoken");

const userAccess = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(404).json({
      success: false,
      message: "No token in the header",
    });
  }
  token = token.split(" ")[1];
  try {
    const data = jwt.verify(token, "passcode");
    req.user = data;
    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = userAccess;
