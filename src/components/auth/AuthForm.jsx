import { useState } from "react";
import { Icon } from "@iconify/react";
import "./style.scss";
import PropTypes from "prop-types";
import axios from "axios";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import CompletionForm from "./CompletionForm";
import Notification from "./Notification";
import { useSnackbar } from "notistack";
function AuthForm({ type, onSubmit, onClose }) {
  const [emailOrPhone, setEmailOrPhone] = useState(""); // Lưu email hoặc số điện thoại
  const [password, setPassword] = useState(""); // Lưu mật khẩu
  const [confirmPassword, setConfirmPassword] = useState(""); // Lưu mật khẩu xác nhận
  const [fullName, setFullName] = useState(""); // Lưu họ và tên
  const [errors, setErrors] = useState({}); // Lưu các lỗi của form
  const [showCompletionForm, setShowCompletionForm] = useState(false); // Hiển thị form hoàn tất đăng ký

    // Sử dụng Notistack
    const { enqueueSnackbar } = useSnackbar();
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
                enqueueSnackbar("Đăng nhập thành công!", { variant: "success" });

                // Tự động tải lại trang
                setTimeout(() => {
                    window.location.reload();
                }, 2000); // Trì hoãn 2 giây để thông báo hiển thị
                onSubmit(user);
            } else {
                enqueueSnackbar(response.data.message || "Có lỗi xảy ra.", {
                    variant: "error",
                });
                setErrors({ password: response.data.message || "Có lỗi xảy ra. Vui lòng thử lại." });
            }
        } catch (error) {
            const errorMessage =
                error.response?.data?.message ||
                "Không thể kết nối với server. Vui lòng thử lại.";
            enqueueSnackbar(errorMessage, { variant: "error" });
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Xóa lỗi trước khi kiểm tra
        setErrors({});
        let passwordError = "";
        let confirmPasswordError = "";

        // Kiểm tra mật khẩu có đáp ứng yêu cầu hay không
        if (!validatePassword(password)) {
            passwordError =
                "Mật khẩu phải có ít nhất 8 ký tự, bao gồm ít nhất một chữ hoa, một chữ thường, một chữ số và một ký tự đặc biệt.";
        }

        // Kiểm tra mật khẩu xác nhận khớp với mật khẩu chính
        if (password !== confirmPassword) {
            confirmPasswordError = "Mật khẩu xác nhận không khớp!";
        }

        // Nếu có lỗi, đặt lỗi vào state và dừng xử lý
        if (passwordError || confirmPasswordError) {
            setErrors({
                password: passwordError,
                confirmPassword: confirmPasswordError,
            });
            enqueueSnackbar("Vui lòng kiểm tra lại thông tin đăng ký.", { variant: "error" });
            return;
        }

        try {
            // Gửi dữ liệu đăng ký đến backend
            const response = await axios.post("http://localhost:3000/register", {
                fullName,
                emailOrPhone,
                password,
            });

            // Nếu đăng ký thành công
            if (response.data.success) {
                console.log("Đăng ký thành công:", response.data);

                // Hiển thị thông báo thành công
                enqueueSnackbar("Đăng ký thành công! Vui lòng đăng nhập.", { variant: "success" });

                // Chuyển hướng người dùng đến trang đăng nhập
                setTimeout(() => {
                    window.location.href = "/"; // Đường dẫn tới trang đăng nhập
                }, 2000);
                onSubmit({ emailOrPhone, fullName, password });
            } else {
                // Nếu phản hồi từ backend báo lỗi
                enqueueSnackbar(response.data.message || "Đăng ký không thành công.", { variant: "error" });
                setErrors({
                    password: response.data.message || "Đăng ký không thành công.",
                });
            }
        } catch (error) {
            // Xử lý lỗi từ server hoặc lỗi kết nối
            const errorMessage =
                error.response?.data?.message || "Không thể kết nối với server. Vui lòng thử lại.";
            console.error("Lỗi khi đăng ký:", errorMessage);


            // Kiểm tra nếu lỗi liên quan đến email hoặc số điện thoại trùng lặp
            if (error.response?.data?.code === "DUPLICATE_ENTRY") {
                enqueueSnackbar("Email hoặc số điện thoại đã tồn tại trong hệ thống.", { variant: "error" });
                setErrors({
                    emailOrPhone: "Email hoặc số điện thoại đã tồn tại trong hệ thống.",
                });
            } else {
                console.error("Lỗi khi đăng ký:", errorMessage);
                enqueueSnackbar(errorMessage, { variant: "error" });
                setErrors({
                    emailOrPhone: errorMessage,
                });
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
