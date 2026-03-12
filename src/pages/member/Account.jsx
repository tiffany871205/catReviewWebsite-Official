import * as bootstrap from "bootstrap";
import { useEffect, useRef, useState } from "react";

function Account() {
  const [passwordVisible, setPasswordVisible] = useState({
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const changePasswordModalElementRef = useRef(null);
  const changePasswordModalRef = useRef(null);

  const openChangePasswordModal = () => {
    changePasswordModalRef.current?.show();
  };

  const closeChangePasswordModal = () => {
    changePasswordModalRef.current?.hide();
  };

  const handleTogglePasswordVisible = (field) => {
    setPasswordVisible((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handlePasswordInputChange = (event) => {
    const { name, value } = event.target;
    setPasswordForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (passwordError) {
      setPasswordError("");
    }
  };

  const resetChangePasswordForm = () => {
    setPasswordForm({
      oldPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
    setPasswordVisible({
      oldPassword: false,
      newPassword: false,
      confirmNewPassword: false,
    });
    setPasswordError("");
  };

  const handleChangePasswordSubmit = (event) => {
    event.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmNewPassword) {
      setPasswordError("新密碼與再次輸入的新密碼不一致");
      return;
    }

    setPasswordError("");
  };

  useEffect(() => {
    const modalElement = changePasswordModalElementRef.current;

    if (!modalElement) return;

    changePasswordModalRef.current = bootstrap.Modal.getOrCreateInstance(modalElement);

    const handleHideModal = () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      resetChangePasswordForm();
    };

    modalElement.addEventListener("hide.bs.modal", handleHideModal);

    return () => {
      modalElement.removeEventListener("hide.bs.modal", handleHideModal);
      changePasswordModalRef.current?.dispose();
      changePasswordModalRef.current = null;
    };
  }, []);

  return (
    <div className="bg-white m-0 member-tab-pane m-lg-6 py-lg-11 px-lg-12 p-6 fade show active">
      <div className="form-container my-0 mx-auto">
        <h3 className="fs-5 fs-lg-4 pb-lg-8 border-bottom border-secondary-300 pb-3">貓奴檔案</h3>
        <div className="d-flex flex-column align-items-center my-6">
          <p className="text-center text-secondary-500">
            為了侍奉主子， <br />
            你的所有資料都整齊放在這裡了~
          </p>
          <img className="mt-3" src="./public/images/favicon.ico" alt="logo" />
        </div>
        <form className="needs-validation" noValidate>
          <div className="mb-lg-8 mb-6">
            <label className="fs-8 ms-2 mb-1" htmlFor="username">
              使用者帳號
            </label>
            <br />
            <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center">
              <input
                className="account-input"
                type="email"
                id="username"
                name="username"
                disabled
              />
              <a href="#" className="d-flex align-items-center px-3 py-1 account-inline-action">
                <i className="bi bi-copy me-1 text-secondary-300"></i>
                <p className="text-neutral-700">複製</p>
              </a>
            </div>
          </div>
          <div className="mb-lg-8 mb-6">
            <label className="fs-8 ms-2 mb-1" htmlFor="password">
              密碼
            </label>
            <br />
            <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center">
              <input
                className="account-input"
                type="password"
                id="password"
                name="password"
                disabled
              />
              <button
                type="button"
                className="btn d-flex align-items-center px-3 py-1 account-inline-action"
                onClick={openChangePasswordModal}
              >
                <i className="bi bi-pencil-square me-1 text-secondary-300"></i>
                <p className="text-neutral-700">變更密碼</p>
              </button>
            </div>
          </div>
          <div className="mb-lg-8 mb-6">
            <div className="d-flex account-required-row">
              <label className="fs-8 ms-2 mb-1" htmlFor="nickname">
                使用者名稱
                <span className="text-highlight-500">*</span>
              </label>
              <span className="fs-8 text-highlight-500 ms-auto">必填</span>
            </div>
            <br />
            <div className="d-lg-flex d-block align-items-center">
              <input className="account-input" type="text" id="nickname" name="nickname" />
            </div>
          </div>
          <div>
            <div className="d-flex account-required-row">
              <label className="fs-8 ms-2 mb-1" htmlFor="tel">
                手機號碼
                <span className="text-highlight-500">*</span>
              </label>
              <span className="fs-8 text-highlight-500 ms-auto">必填</span>
            </div>
            <br />
            <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center">
              <input className="account-input" type="tel" id="tel" name="tel" />
              <a href="#" className="d-flex align-items-center px-3 py-1 account-inline-action">
                <i className="bi bi-arrow-repeat me-1 text-secondary-300"></i>
                <p className="text-neutral-700">變更驗證</p>
              </a>
            </div>
          </div>
          <div className="d-flex mt-lg-12 mt-11 justify-content-center justify-content-lg-start">
            <button type="button" className="btn text-neutral-700 px-4 py-1">
              取消更新
            </button>
            <button
              type="submit"
              className="btn btn-primary-500 account-submit-btn text-white ms-6"
            >
              確認更新
            </button>
          </div>
        </form>
      </div>

      <div
        className="modal fade change-password-modal"
        id="changePasswordModal"
        tabIndex="-1"
        aria-labelledby="changePasswordModalLabel"
        aria-hidden="true"
        ref={changePasswordModalElementRef}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 rounded-0 p-8 p-md-10">
            <div className="d-flex justify-content-end mb-2">
              <button
                type="button"
                className="btn-close member-modal-close"
                aria-label="Close"
                onClick={closeChangePasswordModal}
              ></button>
            </div>

            <div className="text-center mb-8">
              <h3 id="changePasswordModalLabel" className="mb-3">
                變更密碼
              </h3>
              <p className="text-secondary-500">保持帳號安全，建議定期更換密碼</p>
            </div>

            <form onSubmit={handleChangePasswordSubmit}>
              <div className="mb-6">
                <label className="mb-2" htmlFor="oldPassword">
                  請輸入舊密碼
                </label>
                <div className="member-password-field position-relative">
                  <span className="member-password-icon-start">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    id="oldPassword"
                    name="oldPassword"
                    type={passwordVisible.oldPassword ? "text" : "password"}
                    className="form-control member-password-input"
                    placeholder="請輸入舊密碼"
                    value={passwordForm.oldPassword}
                    onChange={handlePasswordInputChange}
                  />
                  <button
                    type="button"
                    className="member-password-icon-end"
                    aria-label="切換密碼顯示"
                    onClick={() => handleTogglePasswordVisible("oldPassword")}
                  >
                    <i
                      className={`bi ${passwordVisible.oldPassword ? "bi-eye" : "bi-eye-slash"}`}
                    ></i>
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2" htmlFor="newPassword">
                  請輸入新密碼
                </label>
                <div className="member-password-field position-relative">
                  <span className="member-password-icon-start">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type={passwordVisible.newPassword ? "text" : "password"}
                    className="form-control member-password-input"
                    placeholder="請輸入新密碼"
                    value={passwordForm.newPassword}
                    onChange={handlePasswordInputChange}
                  />
                  <button
                    type="button"
                    className="member-password-icon-end"
                    aria-label="切換密碼顯示"
                    onClick={() => handleTogglePasswordVisible("newPassword")}
                  >
                    <i
                      className={`bi ${passwordVisible.newPassword ? "bi-eye" : "bi-eye-slash"}`}
                    ></i>
                  </button>
                </div>
              </div>

              <div className="mb-9">
                <label className="mb-2" htmlFor="confirmNewPassword">
                  請再次輸入新密碼
                </label>
                <div className="member-password-field position-relative">
                  <span className="member-password-icon-start">
                    <i className="bi bi-lock"></i>
                  </span>
                  <input
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    type={passwordVisible.confirmNewPassword ? "text" : "password"}
                    className={`form-control member-password-input ${passwordError ? "is-invalid" : ""}`}
                    placeholder="請再次輸入新密碼"
                    value={passwordForm.confirmNewPassword}
                    onChange={handlePasswordInputChange}
                  />
                  <button
                    type="button"
                    className="member-password-icon-end"
                    aria-label="切換密碼顯示"
                    onClick={() => handleTogglePasswordVisible("confirmNewPassword")}
                  >
                    <i
                      className={`bi ${passwordVisible.confirmNewPassword ? "bi-eye" : "bi-eye-slash"}`}
                    ></i>
                  </button>
                </div>
                {passwordError ? (
                  <p className="text-danger fs-8 mt-2 mb-0" role="alert">
                    {passwordError}
                  </p>
                ) : null}
              </div>

              <div className="d-flex gap-5 mb-8">
                <button
                  type="button"
                  className="btn btn-neutral-100 text-neutral-800 member-modal-btn"
                  onClick={closeChangePasswordModal}
                >
                  取消變更
                </button>
                <button type="submit" className="btn btn-primary-500 text-white member-modal-btn">
                  變更密碼
                </button>
              </div>

              <p className="text-center text-neutral-500 mb-0">
                忘記舊密碼了嗎？
                <a href="#" className="text-primary-500 ms-1" aria-disabled="true">
                  點此重新寄送驗證碼
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
