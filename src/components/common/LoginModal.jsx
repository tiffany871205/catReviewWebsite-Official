import { Link } from "react-router";

function LoginModal({
  show,
  onClose,
  onSubmit,
  register,
  handleSubmit,
  errors,
  loginError,
  reset,
  closeNavbarOnMobile,
}) {
  if (!show) return null;

  return (
    <div
      className="modalgreyback d-flex align-items-center justify-content-center"
      onClick={() => {
        onClose();
      }}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <div className="modal-dialog modal-dialog-centered m-0">
          <div className="modal-content p-lg-11 px-6 py-11 rounded-0 bg-white">
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                onClick={() => {
                  onClose();
                }}
              ></button>
            </div>
            <div className="modal-header d-flex justify-content-center border-0 p-0">
              <h2 className="modal-title fs-5 mt-3 mb-11 text-neutral-800" id="loginModalLabel">
                登入會員帳號
              </h2>
            </div>
            <div className="modal-body p-0 mb-8">
              {loginError && (
                <div className="alert alert-danger py-2" role="alert">
                  {loginError}
                </div>
              )}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-floating">
                  <input
                    type="email"
                    className="form-control py-2 px-6"
                    id="loginfloatingInput"
                    name="loginfloatingInput"
                    placeholder="name@example.com"
                    {...register("email", {
                      required: "這個欄位是必填",
                    })}
                  />
                  <span className="ms-1" style={{ fontSize: "8pt", color: "red" }}>
                    {errors.email ? errors.email.message : ""}
                  </span>
                  <label className="text-neutral-500 fs-7" htmlFor="loginfloatingInput">
                    <i className="bi bi-search text-white"></i>
                    輸入電子信箱
                  </label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control py-2 px-6"
                    id="loginfloatingPassword"
                    name="loginfloatingPassword"
                    placeholder="Password"
                    {...register("password", {
                      required: "這個欄位是必填",
                    })}
                  />
                  <span className="ms-1" style={{ fontSize: "8pt", color: "red" }}>
                    {errors.password ? errors.password.message : ""}
                  </span>
                  <label className="text-neutral-500" htmlFor="loginfloatingPassword">
                    輸入密碼
                  </label>
                </div>
                <button
                  type="submit"
                  className="btn btn-primary-500 mt-5 text-white w-100 py-1"
                  onClick={() => {
                    closeNavbarOnMobile();
                  }}
                >
                  會員登入
                </button>
              </form>
            </div>
            <div className="modal-footer border-0 d-flex justify-content-center">
              <p className="text-neutral-600">還沒有帳戶?</p>
              <Link
                to="/signup"
                className="text-primary-500 ms-3"
                onClick={() => {
                  onClose();
                  closeNavbarOnMobile();
                }}
              >
                <u>點此註冊</u>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
