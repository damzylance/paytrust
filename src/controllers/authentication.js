const bcrypt = require("bcryptjs");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  const userObject = req.body;
  if (!userObject.email || !userObject.password) {
    return res.status(400).json({
      success: false,
      message: "provide email and password",
    });
  }

  try {
    let hashedPassword = bcrypt.hashSync(userObject.password);
    userObject.password = hashedPassword;
    const userRecord = await User.create(userObject);
    console.log(userRecord);
    return res.status(200).json({
      success: true,
      message: "success",
      data: userRecord,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const login = async (req, res, next) => {
  const userObject = req.body;
  try {
    const userRecord = await User.findOne({ email: userObject.email });
    if (!userRecord) {
      return res.status(404).json({
        success: false,
        message: "incorrect email or password",
      });
    }
    const validPassword = bcrypt.compareSync(
      userObject.password,
      userRecord.password
    );
    if (!validPassword) {
      return res.status(404).json({
        success: false,
        message: "Incorrect password",
      });
    }
    const token = jwt.sign(
      {
        user: userRecord._id,
      },
      "passcode",
      {
        expiresIn: "30d",
      }
    );
    res.status(200).json({
      success: true,
      data: token,
    });
  } catch (error) {
    console.log(error);
    res.status(404).json({ success: false, message: error.message });
  }
};

module.exports = { register, login };
