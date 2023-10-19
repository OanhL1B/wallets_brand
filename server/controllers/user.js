const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const message = require("../constan/error");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../middlewares/jwt");
const jwt = require("jsonwebtoken");
const sendMail = require("../ultils/sendMail");
const crypto = require("crypto");

const register = asyncHandler(async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  if (!email || !password || !lastName || !firstName)
    return res.status(400).json({
      success: false,
      mes: message.MISSING_INPUT,
    });
  const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      mes: message.VALIDATION_EMAIL_E001,
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      mes: message.VALIDATION_PASSWORD_E002,
    });
  }

  const user = await User.findOne({ email });
  if (user) throw new Error(message.SIGNUP_FAIL);
  else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      success: newUser ? true : false,
      mes: newUser ? message.SIGNUP_SUCCESS : message.ERROR,
    });
  }
});

// Refresh token => Cấp mới access token
// Access token => Xác thực người dùng, phân quyền người dùng

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: message.MISSING_INPUT,
    });
  }
  const emailRegex = /^[a-zA-Z0-9._-]+@gmail\.com$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: message.VALIDATION_EMAIL_E001,
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: message.VALIDATION_PASSWORD_E002,
    });
  }

  const user = await User.findOne({ email });
  if (user && (await user.isCorrectPassword(password))) {
    const { password, role, refreshToken, ...userData } = user.toObject();
    const accessToken = generateAccessToken(user._id, role);
    const newRefreshToken = generateRefreshToken(user._id);

    await User.findByIdAndUpdate(
      user._id,
      { refreshToken: newRefreshToken },
      { new: true }
    );

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: message.LOGIN_SUCCESS,
      accessToken,
      userData,
      role: role,
    });
  } else {
    return res.status(401).json({
      success: false,
      message: message.LOGIN_E001,
    });
  }
});

const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select("-refreshToken -password");
  return res.status(200).json({
    success: user ? true : false,
    retObj: user ? user : "User not found",
  });
});

// dùng để cấp mới accessToken khi accessToken hết hạn
const refreshAccessToken = asyncHandler(async (req, res) => {
  // Lấy refresh_token từ cookies
  const cookie = req.cookies;
  // Check xem có refresh_token hay không
  if (!cookie && !cookie.refreshToken)
    throw new Error("No refresh token in cookies");
  // Check refresh_token có hợp lệ hay không
  const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
  const response = await User.findOne({
    _id: rs._id,
    refreshToken: cookie.refreshToken,
  });
  return res.status(200).json({
    success: response ? true : false,
    newAccessToken: response
      ? generateAccessToken(response._id, response.role)
      : "Refresh token not matched",
  });
});

const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie || !cookie.refreshToken)
    throw new Error("No refresh token in cookies");
  // Xóa refresh token ở db
  await User.findOneAndUpdate(
    { refreshToken: cookie.refreshToken },
    { refreshToken: "" },
    { new: true }
  );
  // Xóa refresh token ở cookie trình duyệt
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  return res.status(200).json({
    success: true,
    mes: "Logout is done",
  });
});

// Client gửi email
// Server check email có hợp lệ hay không => Gửi mail + kèm theo link (password change token)
// Client check mail => click link
// Client gửi api kèm token
// Check token có giống với token mà server gửi mail hay không
// Change password

// gởi mail
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.query;
  if (!email) throw new Error("Missing email");
  const user = await User.findOne({ email });
  if (!user) throw new Error("Email này chưa được được ký tài khoản!");
  const resetToken = user.createPasswordChangedToken();
  await user.save();

  const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 10 phút kể từ bây giờ. <a href='http://localhost:3000/forgot-password/api/user/reset-password/${resetToken}'>Click here</a>`;

  const data = {
    email,
    html,
  };
  const rs = await sendMail(data);
  return res.status(200).json({
    success: true,
    rs,
  });
});

const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  if (!password || !token) throw new Error("Token đặt lại đã được dùng");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Token đặt lại mật khẩu không hợp lệ");
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordChangedAt = Date.now();
  user.passwordResetExpires = undefined;
  await user.save();
  return res.status(200).json({
    success: user ? true : false,
    mes: user ? "Updated password" : "Something went wrong",
  });
});

const getUsers = asyncHandler(async (req, res) => {
  const response = await User.find().select("-refreshToken -password");
  return res.status(200).json({
    success: response ? true : false,
    retObj: response,
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  const { _id } = req.query;
  if (!_id) throw new Error("Missing inputs");
  const response = await User.findByIdAndDelete(_id);
  return res.status(200).json({
    success: response ? true : false,
    deletedUser: response
      ? `User with email ${response.email} deleted`
      : "No user delete",
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!_id || Object.keys(req.body).length === 0)
    throw new Error("Missing inputs");
  const response = await User.findByIdAndUpdate(_id, req.body, {
    new: true,
  }).select("-password -role -refreshToken");
  return res.status(200).json({
    success: response ? true : false,
    updatedUser: response ? response : "Some thing went wrong",
  });
});

const updateUserByAdmin = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      throw new Error("Missing userId");
    }

    if (Object.keys(req.body).length === 1) {
      throw new Error("Missing inputs");
    }

    const response = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    }).select("-password -refreshToken");

    return res.status(200).json({
      success: response ? true : false,
      updatedUser: response ? response : "Something went wrong",
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

const changePassword = asyncHandler(async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  if (!userId || !currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Missing inputs",
    });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Không có user này trong hệ thống",
    });
  }

  if (!(await user.isCorrectPassword(currentPassword))) {
    return res.status(401).json({
      success: false,
      message: "Mật khẩu hiện tại chưa đúng",
    });
  }

  user.password = newPassword;
  user.passwordChangedAt = Date.now();
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  return res.status(200).json({
    success: true,
    message: "Đổi mật khẩu thành công",
  });
});

module.exports = {
  register,
  login,
  getCurrent,
  refreshAccessToken,
  logout,
  forgotPassword,
  resetPassword,
  getUsers,
  deleteUser,
  updateUser,
  updateUserByAdmin,
  changePassword,
};
