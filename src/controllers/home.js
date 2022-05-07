const User = require("../model/user");
const home = async (req, res, next) => {
  const currentUser = req.user;
  console.log(req.user);
  if (!currentUser) {
    return res.status(404).json({ success: false, message: "user not found" });
  }
  console.log(currentUser);
  try {
    const userRecord = await User.findOne({ email: currentUser.user }).select(
      "email balance"
    );

    res.status(200).json({
      success: true,
      data: userRecord,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { home };
