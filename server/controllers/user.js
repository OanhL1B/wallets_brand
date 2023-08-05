const User = require("../models/user");
const asyncHandler = require("express-async-handler");
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
      mes: "Missing inputs", // Thiếu 1 trong 4 trường thì nó sẽ báo lỗi liền
    });

  const user = await User.findOne({ email });
  if (user) throw new Error("User has existed");
  else {
    const newUser = await User.create(req.body);
    return res.status(200).json({
      success: newUser ? true : false,
      mes: newUser
        ? "Register is successfully. Please go login~"
        : "Something went wrong",
    });
  }
});

// Refresh token => Cấp mới access token
// Access token => Xác thực người dùng, phân quyền người dùng
// const login = asyncHandler(async (req, res) => {
//   const { email, password } = req.body;
//   if (!email || !password)
//     return res.status(400).json({
//       success: false,
//       mes: "Missing inputs",
//     });

//   // plain object
//   const response = await User.findOne({ email });
//   if (response && (await response.isCorrectPassword(password))) {
//     // Tách password và role ra khỏi response
//     const { password, role, refreshToken, ...userData } = response.toObject();
//     // Tạo access token
//     const accessToken = generateAccessToken(response._id, role);
//     // Tạo refresh token
//     const newRefreshToken = generateRefreshToken(response._id);
//     // Lưu refresh token vào database
//     await User.findByIdAndUpdate(
//       response._id,
//       { refreshToken: newRefreshToken },
//       { new: true }
//     );
//     // Lưu refresh token vào cookie
//     res.cookie("refreshToken", newRefreshToken, {
//       httpOnly: true,
//       maxAge: 7 * 24 * 60 * 60 * 1000,
//     });
//     return res.status(200).json({
//       success: true,
//       accessToken,
//       userData,
//     });
//   } else {
//     throw new Error("Invalid credentials!");
//   }
// });
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      mes: "Missing inputs",
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
      accessToken,
      userData,
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Mật khẩu hoặc password chưa đúng!",
    });
  }
});

const getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select("-refreshToken -password -role");
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
  if (!user) throw new Error("User not found");
  const resetToken = user.createPasswordChangedToken();
  await user.save();

  const html = `Xin vui lòng click vào link dưới đây để thay đổi mật khẩu của bạn.Link này sẽ hết hạn sau 15 phút kể từ bây giờ. <a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click here</a>`;

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

// người dùng đổi mật khẩu
const resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  if (!password || !token) throw new Error("Missing imputs ");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");
  const user = await User.findOne({
    passwordResetToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user) throw new Error("Invalid reset token");
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
  //
  const { _id } = req.user;
  // const { Id,  } = req.body
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
// const updateUserByAdmin = asyncHandler(async (req, res) => {
//   //
//   const { uid } = req.params;
//   if (Object.keys(req.body).length === 0) throw new Error("Missing inputs");
//   const response = await User.findByIdAndUpdate(uid, req.body, {
//     new: true,
//   }).select("-password  -refreshToken");
//   return res.status(200).json({
//     success: response ? true : false,
//     updatedUser: response ? response : "Some thing went wrong",
//   });
// });

const updateUserByAdmin = asyncHandler(async (req, res) => {
  try {
    const { userId } = req.body; // Lấy userId từ req.body
    if (!userId) {
      throw new Error("Missing userId");
    }

    if (Object.keys(req.body).length === 1) {
      // Kiểm tra xem chỉ có userId mà không có các trường thông tin khác
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
};
