// errors.js

module.exports = {
  // Đăng nhập
  MISSING_INPUT: "Chưa nhập dữ liệu.",
  LOGIN_E001: "Mật khẩu hoặc gmail không chính xác",
  LOGIN_SUCCESS: "Đăng nhập thành công",
  VALIDATION_EMAIL_E001: "Không đúng định dạng của email vui lòng nhập lại.",
  VALIDATION_PASSWORD_E002: "Nhập mật khẩu không bé hơn 6 kí tự.",

  // Đăng kí
  SIGNUP_FAIL: "Email đã tồn tại trong hệ thống này",
  SIGNUP_SUCCESS: "Đăng kí tài khoản thành công",
  ERROR: "Đã có lỗi xảy ra",
  PRODUCT_ERROR: "Tên sản phẩm bị trùng",
  PRODUCT_SUCCESS: "Thêm mới sản phẩm  thành công!",

  // Giỏ hàng
  CART_SUCCESS: "Product added to the cart successfully",
  CART_ITEM_NOTFOUND: "Cart item not found",
  UPDATE_CART_SUCCESS: "Cart item quantity updated successfully",
  REMOVE_CART_SUCCESS: "Product removed from the cart successfully",
  CART_QUANTITY_ERROR:
    "Số lượng sản phẩm trong giỏ hàng vượt quá số lượng có sẵn trong kho",
  CART_ERROR: "Đã có lỗi xảy ra khi thêm/cập nhật sản phẩm vào giỏ hàng",
  //danh mục
  CATEGORY_ERROR: "Tên danh mục này đã tồn tại, vui lòng chọn một tên khác!",
  CATEGORY_SUCCESS: "Thêm mới danh mục thành công!",
  CATEGORY_ITEM_NOTFOUND: "Danh mục không tồn tại",
};
