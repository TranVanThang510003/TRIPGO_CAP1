import { useState } from "react";
import { Icon } from "@iconify/react";
import "./style.scss";
import PropTypes from "prop-types";
import axios from "axios";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import CompletionForm from "./CompletionForm";
import Notification from "./Notification";
function AuthForm({ type, onSubmit, onClose }) {
  const [emailOrPhone, setEmailOrPhone] = useState(""); // Lưu email hoặc số điện thoại
  const [password, setPassword] = useState(""); // Lưu mật khẩu
  const [confirmPassword, setConfirmPassword] = useState(""); // Lưu mật khẩu xác nhận
  const [fullName, setFullName] = useState(""); // Lưu họ và tên
  const [errors, setErrors] = useState({}); // Lưu các lỗi của form
  const [showCompletionForm, setShowCompletionForm] = useState(false); // Hiển thị form hoàn tất đăng ký

    // State quản lý thông báo
    const [notification, setNotification] = useState({
        message: "",
        type: "", // success hoặc error
        visible: false,
    });
    const showNotification = (message, type) => {
        setNotification({
            message,
            type,
            visible: true,
        });

        // Ẩn thông báo sau 3 giây
        setTimeout(() => {
            setNotification({
                ...notification,
                visible: false,
            });
        }, 3000);
    };

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

        if (!validateEmail(emailOrPhone) && !validatePhone(emailOrPhone)) {
            emailOrPhoneError = "Email hoặc số điện thoại không hợp lệ!";
        }

        if (!validatePassword(password)) {
            passwordError = "Mật khẩu không hợp lệ!";
        }

        if (emailOrPhoneError || passwordError) {
            setErrors({ emailOrPhone: emailOrPhoneError, password: passwordError });
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/login", {
                emailOrPhone,
                password,
            });

            console.log("Phản hồi từ server:", response.data); // Log chi tiết phản hồi từ server

            if (response.data.success) {
                const user = response.data.user;
                localStorage.setItem("user", JSON.stringify(user));
                showNotification("Đăng nhập thành công!", "success");

                // Tự động tải lại trang
                window.location.reload();
                onSubmit(user);
            } else {
                console.error("Lỗi phản hồi từ server:", response.data.message);
                showNotification(response.data.message || "Có lỗi xảy ra. Vui lòng thử lại.", "error");
                setErrors({ password: response.data.message || "Có lỗi xảy ra. Vui lòng thử lại." });
            }
        } catch (error) {
            console.error("Lỗi khi gọi API đăng nhập:", error); // Log chi tiết lỗi
            if (error.response) {
                console.error("Chi tiết lỗi response:", error.response.data); // Log phản hồi lỗi từ server
                showNotification(error.response.data.message || "Có lỗi xảy ra từ server.", "error");
            } else if (error.request) {
                console.error("Chi tiết lỗi request:", error.request); // Log chi tiết request nếu không nhận được phản hồi
                showNotification("Không nhận được phản hồi từ server. Vui lòng thử lại.", "error");
            } else {
                console.error("Lỗi khác:", error.message); // Log lỗi khác (ví dụ cấu hình sai)
                showNotification("Đã xảy ra lỗi. Vui lòng thử lại.", "error");
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
          "http://localhost:3000/register",
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
            {/* Hiển thị thông báo nếu có */}
            {notification.visible && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification({ ...notification, visible: false })}
                />
            )}

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
