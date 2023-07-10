const User = require("../models/user");
const asyncHandler = require("express-async-handler");

const register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password || !lastName || !firstName)
    return res.status(400).json({
      sucess: false,
      mes: "Missing inputs", // Thiếu 1 trong 4 trường thì nó sẽ báo lỗi liền
    });

  const user = await User.findOne({ email });
  if (user) throw new Error("User has existed");
  else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      sucess: newUser ? true : false,
      mes: newUser
        ? "Register is successfully. Please go login~"
        : "Something went wrong",
    });
  }
});

module.exports = {
  register,
};
