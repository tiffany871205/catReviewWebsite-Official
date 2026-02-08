import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();

  const {
    register: registerForm,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
    reset: resetRegister,
  } = useForm();

  //註冊處理
  const [registerError, setRegisterError] = useState("");

  const onRegister = async (data) => {
    try {
      // 清除之前的錯誤訊息
      setRegisterError("");

      const response = await axios.post(`http://localhost:3000/register`, {
        nickname: data.nickname,
        email: data.email,
        password: data.password,
        tel: data.tel,
      });

      console.log("註冊成功:", response.data);

      // 重置註冊表單
      resetRegister();

      navigate("/index");
    } catch (error) {
      console.error("註冊錯誤:", error);
      // 顯示錯誤訊息
      if (error.response?.status === 400) {
        setRegisterError("此電子信箱已被使用");
      } else if (error.response?.data?.message) {
        setRegisterError(error.response.data.message);
      } else {
        setRegisterError("註冊失敗，請稍後再試");
      }
    }
  };

  return (
    <>
      <div className="container mb-11 px-11">
        <h1 className="text-center fs-4 mt-11 mb-11 text-neutral-800">註冊會員帳號</h1>

        {/* 顯示註冊錯誤訊息 */}
        {registerError && (
          <div className="alert alert-danger py-2" role="alert">
            {registerError}
          </div>
        )}

        <form className="px-11" onSubmit={handleRegisterSubmit(onRegister)}>
          {/* 輸入名字 */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className={`form-control py-2 px-6 ${registerErrors.nickname ? "is-invalid" : ""}`}
              id="nickname"
              placeholder="輸入名字"
              {...registerForm("nickname", {
                required: "請輸入名字",
                minLength: {
                  value: 1,
                  message: "名字至少需要 1 個字元",
                },
              })}
            />
            <label className="text-neutral-500 fs-7" htmlFor="nickname">
              使用者名稱
            </label>
            {registerErrors.nickname && (
              <div className="invalid-feedback">{registerErrors.nickname.message}</div>
            )}
          </div>

          {/* 輸入電子信箱 */}
          <div className="form-floating mb-3">
            <input
              type="email"
              className={`form-control py-2 px-6 ${registerErrors.email ? "is-invalid" : ""}`}
              id="registerEmail"
              placeholder="name@example.com"
              {...registerForm("email", {
                required: "請輸入電子信箱",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "電子信箱格式不正確",
                },
              })}
            />
            <label className="text-neutral-500 fs-7" htmlFor="registerEmail">
              電子信箱
            </label>
            {registerErrors.email && (
              <div className="invalid-feedback">{registerErrors.email.message}</div>
            )}
          </div>

          {/* 輸入密碼 */}
          <div className="form-floating mb-3">
            <input
              type="password"
              className={`form-control py-2 px-6 ${registerErrors.password ? "is-invalid" : ""}`}
              id="registerPassword"
              placeholder="Password"
              {...registerForm("password", {
                required: "請輸入密碼",
                minLength: {
                  value: 6,
                  message: "密碼至少需要 6 個字元",
                },
              })}
            />
            <label className="text-neutral-500" htmlFor="registerPassword">
              密碼
            </label>
            {registerErrors.password && (
              <div className="invalid-feedback">{registerErrors.password.message}</div>
            )}
          </div>

          {/* 輸入手機號碼 */}
          <div className="form-floating mb-3">
            <input
              type="tel"
              className={`form-control py-2 px-6 ${registerErrors.tel ? "is-invalid" : ""}`}
              id="tel"
              placeholder="0912345678"
              {...registerForm("tel", {
                required: "請輸入手機號碼",
                pattern: {
                  value: /^09\d{8}$/,
                  message: "手機號碼格式不正確（例：0912345678）",
                },
              })}
            />
            <label className="text-neutral-500" htmlFor="tel">
              手機號碼
            </label>
            {registerErrors.tel && (
              <div className="invalid-feedback">{registerErrors.tel.message}</div>
            )}
          </div>

          {/* 註冊按鈕 */}
          <button
            type="submit"
            className="btn btn-primary-500 mt-8 text-white w-100 py-1"
            data-bs-toggle="modal"
            data-bs-target="#signUpSuccessModal"
            style={{ width: "10px" }}
          >
            註冊
          </button>
        </form>
        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="signUpSuccessModal"
          tabIndex="-1"
          aria-labelledby="signUpSuccessModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content p-5">
              <div className="modal-header">
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body text-center mt-3 text-neutral-800">您已成功註冊</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignUp;
