import { useState } from "react";
import { Icon } from "@iconify/react";
import "./style.scss";
import PropTypes from "prop-types";
import axios from "axios";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import CompletionForm from "./CompletionForm";

function AuthForm({ type, onSubmit, onClose }) {
  const [emailOrPhone, setEmailOrPhone] = useState(""); // Lưu email hoặc số điện thoại
  const [password, setPassword] = useState(""); // Lưu mật khẩu
  const [confirmPassword, setConfirmPassword] = useState(""); // Lưu mật khẩu xác nhận
  const [fullName, setFullName] = useState(""); // Lưu họ và tên
  const [errors, setErrors] = useState({}); // Lưu các lỗi của form
  const [showCompletionForm, setShowCompletionForm] = useState(false); // Hiển thị form hoàn tất đăng ký

  // Hàm kiểm tra email
  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Biểu thức kiểm tra định dạng email
    return emailRegex.test(value);
  };

  // Hàm kiểm tra số điện thoại
  const validatePhone = (value) => {
    const phoneRegex = /^\d{10,12}$/; // Biểu thức kiểm tra số điện thoại (10-12 số)
    return phoneRegex.test(value);
  };

  // Hàm kiểm tra mật khẩu theo tiêu chuẩn hiện nay
  const validatePassword = (value) => {
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(value);
  };

  // Xử lý khi form đăng nhập được gửi
  const handleLogin = async (e) => {
    e.preventDefault();
    let emailOrPhoneError = "";
    let passwordError = "";

    // Kiểm tra email hoặc số điện thoại
    if (!validateEmail(emailOrPhone) && !validatePhone(emailOrPhone)) {
        emailOrPhoneError = "Email hoặc số điện thoại không hợp lệ!";
    }

    // Kiểm tra mật khẩu
    if (!validatePassword(password)) {
        passwordError = "Mật khẩu không hợp lệ!";
    }

    if (emailOrPhoneError || passwordError) {
        setErrors({ emailOrPhone: emailOrPhoneError, password: passwordError });
        return; // Dừng hàm nếu có lỗi
    }

    try {
        // Gửi yêu cầu POST đến API đăng nhập
        const response = await axios.post("http://localhost:3000/api/login", {
            emailOrPhone,
            password,
        });

        // In phản hồi từ API ra console để kiểm tra
        console.log("API response:", response.data);

        // Kiểm tra phản hồi từ API
        if (response.data.success) {
            const user = response.data.user;

            // Kiểm tra xem `user` có `role` không
            if (user.role) {
                console.log("User role:", user.role); // In ra role để kiểm tra
                localStorage.setItem("role", user.role); // Lưu vào localStorage
            } else {
                console.log("Không tìm thấy thông tin role trong dữ liệu người dùng.");
            }

            // Lưu thông tin người dùng vào localStorage
            localStorage.setItem("user", JSON.stringify(user));

            // Truyền dữ liệu cho `onSubmit` để cập nhật giao diện trong `Header`
            onSubmit(user);
        } else {
            // Nếu phản hồi không thành công, hiển thị thông báo lỗi cụ thể
            setErrors({ password: response.data.message });
        }
    } catch (error) {
        console.error("Lỗi khi xử lý đăng nhập:", error.response ? error.response.data : error.message);
        
        // Thông báo lỗi tùy chỉnh cho các trường hợp cụ thể
        if (error.response && error.response.status === 404) {
            setErrors({ emailOrPhone: "Người dùng không tồn tại!" });
        } else if (error.response && error.response.status === 401) {
            setErrors({ password: "Mật khẩu không đúng!" });
        } else {
            // Thông báo lỗi chung nếu không có thông tin chi tiết
            setErrors({
                password: "Có lỗi xảy ra trong quá trình đăng nhập. Vui lòng thử lại.",
            });
        }
    }
};



  // Xử lý khi form đăng ký được gửi
  const handleContinue = (e) => {
    e.preventDefault();
    let emailOrPhoneError = "";

    // Kiểm tra email hoặc số điện thoại
    if (!validateEmail(emailOrPhone) && !validatePhone(emailOrPhone)) {
      emailOrPhoneError = "Email hoặc số điện thoại không hợp lệ!";
    }

    if (emailOrPhoneError) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailOrPhone: emailOrPhoneError,
      }));
    } else {
      // Chuyển sang bước hoàn tất đăng ký nếu không có lỗi
      setShowCompletionForm(true);
      setErrors({});
    }
  };

  // Xử lý khi form hoàn tất được gửi
  const handleSubmit = async (e) => {
    e.preventDefault();
    let passwordError = "";
    let confirmPasswordError = "";

    // Kiểm tra mật khẩu theo tiêu chuẩn hiện nay
    if (!validatePassword(password)) {
      passwordError =
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm ít nhất một chữ hoa, một chữ thường, một chữ số và một ký tự đặc biệt.";
    }

    // Kiểm tra mật khẩu xác nhận khớp với mật khẩu
    if (password !== confirmPassword) {
      confirmPasswordError = "Mật khẩu xác nhận không khớp!";
    }

    if (passwordError || confirmPasswordError) {
      setErrors({
        password: passwordError,
        confirmPassword: confirmPasswordError,
      });
    } else {
      try {
        // Gửi dữ liệu đăng ký đến backend
        const response = await axios.post(
          "http://localhost:3000/api/register",
          {
            fullName,
            emailOrPhone,
            password,
          }
        );

        // Xử lý phản hồi từ backend nếu đăng ký thành công
        console.log("Đăng ký thành công:", response.data);
        onSubmit({ emailOrPhone, fullName, password });

        // Chuyển hướng người dùng sau khi đăng ký thành công
        window.location.href = "/";
      } catch (error) {
        console.error(
          "Lỗi khi đăng ký:",
          error.response ? error.response.data : error.message
        );
        setErrors({ password: "Có lỗi xảy ra khi đăng ký. Vui lòng thử lại." });
      }
    }
  };

  // Khi người dùng bắt đầu nhập, xóa lỗi tương ứng
  const handleInputChange = (setter, field) => (e) => {
    setter(e.target.value);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
  };

  return (
    <div className="modal-overlay">
      <div className="auth-container">
        <div className="auth-box">
          {/* Nút đóng */}
          <div className="close-btn-container">
            <button onClick={onClose} className="close-btn">
              <Icon icon="material-symbols:close" />
            </button>
          </div>

          {/* Tiêu đề của form */}
          <h2>
            {type === "login"
              ? "Đăng Nhập"
              : showCompletionForm
              ? "Hoàn Tất Đăng Ký"
              : "Đăng Ký"}
          </h2>

          {/* Form nhập thông tin */}
          <form
            onSubmit={
              type === "login"
                ? handleLogin
                : showCompletionForm
                ? handleSubmit
                : handleContinue
            }
          >
            {type === "login" && (
              <LoginForm
                emailOrPhone={emailOrPhone}
                password={password}
                onEmailOrPhoneChange={handleInputChange(
                  setEmailOrPhone,
                  "emailOrPhone"
                )}
                onPasswordChange={handleInputChange(setPassword, "password")}
                onSubmit={handleLogin}
                errors={errors}
              />
            )}

            {type === "register" && !showCompletionForm && (
              <RegisterForm
                emailOrPhone={emailOrPhone}
                onEmailOrPhoneChange={handleInputChange(
                  setEmailOrPhone,
                  "emailOrPhone"
                )}
                onSubmit={handleContinue}
                errors={errors}
              />
            )}

            {showCompletionForm && (
              <CompletionForm
                fullName={fullName}
                emailOrPhone={emailOrPhone}
                password={password}
                confirmPassword={confirmPassword}
                onFullNameChange={handleInputChange(setFullName, "fullName")}
                onPasswordChange={handleInputChange(setPassword, "password")}
                onConfirmPasswordChange={handleInputChange(
                  setConfirmPassword,
                  "confirmPassword"
                )}
                onSubmit={handleSubmit}
                errors={errors}
                validateEmail={validateEmail}
                validatePhone={validatePhone}
              />
            )}
          </form>

          {/* Hiển thị đăng ký với Google hoặc Facebook chỉ trong bước đầu */}
          {!showCompletionForm && (
            <>
              <div className="divider">Hoặc đăng ký với</div>

              <button className="social-btn google-btn">
                <Icon icon="logos:google-icon" style={{ fontSize: "24px" }} />{" "}
                Tiếp tục với Google
              </button>

              <button className="social-btn facebook-btn">
                <Icon icon="logos:facebook" style={{ fontSize: "24px" }} /> Tiếp
                tục với Facebook
              </button>
            </>
          )}

          {/* Điều khoản & Chính sách */}
          <div className="terms">
            Bằng cách {type === "login" ? "đăng nhập" : "đăng ký"}, bạn đồng ý
            với <a href="#">Điều khoản & Điều kiện</a> và xác nhận rằng bạn đã
            đọc <a href="#">Chính sách Bảo mật</a> của chúng tôi.
          </div>
        </div>
      </div>
    </div>
  );
}

AuthForm.propTypes = {
  type: PropTypes.string.isRequired, // Kiểm tra kiểu của `type` là string
  onSubmit: PropTypes.func.isRequired, // Kiểm tra kiểu của `onSubmit` là function
  onClose: PropTypes.func, // Kiểm tra kiểu của `onClose` là function (không bắt buộc)
};

export default AuthForm;
