import * as bootstrap from "bootstrap";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { clearAuth, isAuthenticated } from "../../utils/auth";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

function Account() {
  const imageBaseUrl = `${import.meta.env.BASE_URL}images/`;
  const navigate = useNavigate();
  const [initialProfile, setInitialProfile] = useState({
    email: "",
    nickname: "",
    tel: "",
  });
  const [currentUserId, setCurrentUserId] = useState(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      nickname: "",
      tel: "",
    },
  });

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
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);
  const changePasswordModalElementRef = useRef(null);
  const changePasswordModalRef = useRef(null);

  // 密碼 modal 開關控制
  const openChangePasswordModal = () => {
    changePasswordModalRef.current?.show();
  };

  const closeChangePasswordModal = () => {
    changePasswordModalRef.current?.hide();
  };

  // 切換密碼欄位顯示/隱藏
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

  // 清除密碼 modal 暫存
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

  // 變更密碼送出
  const handleChangePasswordSubmit = async (event) => {
    event.preventDefault();

    const oldPassword = passwordForm.oldPassword.trim();
    const newPassword = passwordForm.newPassword.trim();
    const confirmNewPassword = passwordForm.confirmNewPassword.trim();

    let validationMessage = "";

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      validationMessage = "請完整填寫所有密碼欄位";
    } else if (newPassword.length < 6) {
      validationMessage = "新密碼至少需要 6 個字元";
    } else if (newPassword !== confirmNewPassword) {
      validationMessage = "新密碼與再次輸入的新密碼不一致";
    } else if (oldPassword === newPassword) {
      validationMessage = "新密碼不可與舊密碼相同";
    } else if (!currentUserId || !initialProfile.email) {
      validationMessage = "尚未取得使用者資料，請重新登入後再試";
    } else if (!API_BASE) {
      validationMessage = "找不到 API 設定，請確認環境變數";
    }

    if (validationMessage) {
      setPasswordError(validationMessage);
      await Swal.fire({
        icon: "warning",
        title: "資料不符合規定",
        text: validationMessage,
        confirmButtonText: "我知道了",
      });
      return;
    }

    setIsChangingPassword(true);

    try {
      // 確認舊密碼
      await axios.post(`${API_BASE}/login`, {
        email: initialProfile.email,
        password: oldPassword,
      });
      // 更新密碼
      await axios.patch(`${API_BASE}/users/${currentUserId}`, {
        password: newPassword,
      });

      setPasswordError("");
      closeChangePasswordModal();

      await Swal.fire({
        icon: "success",
        title: "密碼更新成功",
        text: "請使用新密碼登入。",
        confirmButtonText: "好",
      });
    } catch (error) {
      console.error("變更密碼失敗", error);

      if (error.response?.status === 400 || error.response?.status === 401) {
        setPasswordError("舊密碼輸入錯誤");
        return;
      }

      setPasswordError("變更密碼失敗，請稍後再試");
    } finally {
      setIsChangingPassword(false);
    }
  };

  // 確認更新
  const handleAccountSubmit = async (formValues) => {
    if (!currentUserId) {
      await Swal.fire({
        icon: "error",
        title: "更新失敗",
        text: "尚未取得使用者資訊，請重新登入後再試。",
        confirmButtonText: "我知道了",
      });
      return;
    }

    if (!API_BASE) {
      await Swal.fire({
        icon: "error",
        title: "更新失敗",
        text: "找不到 API 設定，請確認環境變數。",
        confirmButtonText: "我知道了",
      });
      return;
    }

    try {
      const payload = {
        nickname: formValues.nickname,
        tel: formValues.tel,
      };

      const response = await axios.patch(`${API_BASE}/users/${currentUserId}`, payload);
      const updatedUser = response.data;

      const nextProfile = {
        email: updatedUser.email ?? initialProfile.email,
        nickname: updatedUser.nickname ?? "",
        tel: updatedUser.tel ?? "",
      };

      setInitialProfile(nextProfile);
      reset(nextProfile);

      try {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          const nextUser = {
            ...parsedUser,
            email: nextProfile.email,
            nickname: nextProfile.nickname,
            tel: nextProfile.tel,
          };
          localStorage.setItem("user", JSON.stringify(nextUser));
        }
      } catch (error) {
        console.error("同步 localStorage 使用者資料失敗", error);
      }

      await Swal.fire({
        icon: "success",
        title: "更新成功",
        text: "你的會員資料已更新完成。",
        confirmButtonText: "好",
      });
    } catch (error) {
      console.error("更新會員資料失敗", error);

      await Swal.fire({
        icon: "error",
        title: "更新失敗",
        text: "更新過程發生問題，請稍後再試。",
        confirmButtonText: "我知道了",
      });
    }
  };

  // 表單驗證失敗時提示使用者先修正欄位
  const handleAccountInvalidSubmit = async () => {
    await Swal.fire({
      icon: "warning",
      title: "資料格式不正確",
      text: "請先修正表單欄位後再送出。",
      confirmButtonText: "我知道了",
    });
  };

  // 取消更新
  const resetAccountForm = () => {
    reset(initialProfile);
  };

  // 複製使用者帳號（email）
  const handleCopyEmail = async () => {
    const email = initialProfile.email?.trim();

    if (!email) {
      await Swal.fire({
        icon: "warning",
        title: "目前沒有可複製的帳號",
        confirmButtonText: "我知道了",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(email);

      await Swal.fire({
        icon: "success",
        title: "已複製",
        text: "使用者帳號已複製到剪貼簿。",
        timer: 1200,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("複製帳號失敗", error);

      await Swal.fire({
        icon: "error",
        title: "複製失敗",
        text: "請稍後再試，或手動複製。",
        confirmButtonText: "我知道了",
      });
    }
  };

  // 刪除帳號流程：二次確認後刪除
  const handleDeleteAccount = async () => {
    if (!currentUserId) {
      await Swal.fire({
        icon: "error",
        title: "刪除失敗",
        text: "尚未取得使用者資訊，請重新登入後再試。",
        confirmButtonText: "我知道了",
      });
      return;
    }

    if (!API_BASE) {
      await Swal.fire({
        icon: "error",
        title: "刪除失敗",
        text: "找不到 API 設定，請確認環境變數。",
        confirmButtonText: "我知道了",
      });
      return;
    }

    const confirmResult = await Swal.fire({
      icon: "warning",
      title: "確定要刪除帳號嗎？",
      text: "刪除後將無法復原，請再次確認。",
      showCancelButton: true,
      confirmButtonText: "確定刪除",
      cancelButtonText: "先不要",
      reverseButtons: true,
      customClass: {
        confirmButton: "btn btn-danger text-white px-4",
        cancelButton: "btn btn-neutral-100 text-neutral-700 px-4 me-2",
      },
      buttonsStyling: false,
    });

    if (!confirmResult.isConfirmed) return;

    setIsDeletingAccount(true);

    try {
      await axios.delete(`${API_BASE}/users/${currentUserId}`);

      // 清除登入狀態
      clearAuth();

      await Swal.fire({
        icon: "success",
        title: "帳號已刪除",
        text: "期待未來有機會再次為你服務。",
        confirmButtonText: "回到首頁",
      });

      navigate("/index");
    } catch (error) {
      console.error("刪除帳號失敗", error);

      await Swal.fire({
        icon: "error",
        title: "刪除失敗",
        text: "刪除過程發生問題，請稍後再試。",
        confirmButtonText: "我知道了",
      });
    } finally {
      setIsDeletingAccount(false);
    }
  };

  // 初次進頁載入會員資料：先讀 auth 再向 API 取最新資料
  useEffect(() => {
    const currentUser = isAuthenticated();

    if (!currentUser) return;

    setCurrentUserId(currentUser.id ?? null);

    // First hydrate from local auth state for instant UI.
    const localProfile = {
      email: currentUser.email ?? "",
      nickname: currentUser.nickname ?? "",
      tel: currentUser.tel ?? "",
    };
    setInitialProfile(localProfile);
    reset(localProfile);

    if (!currentUser.id || !API_BASE) return;

    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${API_BASE}/users/${currentUser.id}`);
        const user = response.data;

        const serverProfile = {
          email: user.email ?? "",
          nickname: user.nickname ?? "",
          tel: user.tel ?? "",
        };
        setInitialProfile(serverProfile);
        reset(serverProfile);
      } catch (error) {
        // Keep local auth profile values when API request fails.
        console.error("讀取使用者資料失敗", error);
      }
    };

    fetchUserProfile();
  }, [reset]);

  //  Bootstrap modal 關閉問題初始化
  useEffect(() => {
    const modalElement = changePasswordModalElementRef.current;

    if (!modalElement) return;

    changePasswordModalRef.current = bootstrap.Modal.getOrCreateInstance(modalElement);

    const handleHideModal = () => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
      // 重置密碼表單狀態
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
        {/* 帳號資料 */}
        <h3 className="fs-5 fs-lg-4 pb-lg-8 border-bottom border-secondary-300 pb-3">貓奴檔案</h3>
        <div className="d-flex flex-column align-items-center my-6">
          <p className="text-center text-secondary-500">
            為了侍奉主子， <br />
            你的所有資料都整齊放在這裡了~
          </p>
          <img className="mt-3" src={`${imageBaseUrl}favicon.ico`} alt="logo" />
        </div>
        <form
          className="needs-validation"
          noValidate
          onSubmit={handleSubmit(handleAccountSubmit, handleAccountInvalidSubmit)}
        >
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
                {...register("email", {
                  required: "請輸入電子信箱",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "電子信箱格式不正確",
                  },
                })}
                disabled
              />
              <button
                type="button"
                className="btn d-flex align-items-center px-3 py-1 account-inline-action"
                onClick={handleCopyEmail}
              >
                <i className="bi bi-copy me-1 text-secondary-300"></i>
                <p className="text-neutral-700">複製</p>
              </button>
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
                value="********"
                readOnly
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
            </div>
            <br />
            <div className="d-lg-flex d-block align-items-center">
              <input
                className="account-input"
                type="text"
                id="nickname"
                {...register("nickname", {
                  required: "請輸入使用者名稱",
                  minLength: {
                    value: 1,
                    message: "使用者名稱至少需要 1 個字元",
                  },
                })}
              />
            </div>
            {errors.nickname ? (
              <p className="text-danger fs-8 mt-2 mb-0" role="alert">
                {errors.nickname.message}
              </p>
            ) : null}
          </div>
          <div>
            <div className="d-flex account-required-row">
              <label className="fs-8 ms-2 mb-1" htmlFor="tel">
                手機號碼
                <span className="text-highlight-500">*</span>
              </label>
            </div>
            <br />
            <div className="d-flex flex-column flex-lg-row align-items-start align-items-lg-center">
              <input
                className="account-input"
                type="tel"
                id="tel"
                {...register("tel", {
                  required: "請輸入手機號碼",
                  pattern: {
                    value: /^09\d{8}$/,
                    message: "手機號碼格式不正確（例：0912345678）",
                  },
                })}
              />
              <span
                className="d-flex align-items-center px-3 py-1 account-inline-action account-inline-action--disabled"
                aria-disabled="true"
              >
                <i className="bi bi-arrow-repeat me-1 text-secondary-300"></i>
                <p className="text-neutral-700">變更驗證</p>
              </span>
            </div>
            {errors.tel ? (
              <p className="text-danger fs-8 mt-2 mb-0" role="alert">
                {errors.tel.message}
              </p>
            ) : null}
          </div>
          <div className="d-flex mt-lg-12 mt-11 justify-content-center justify-content-lg-start account-action-row">
            <button
              type="button"
              className="btn btn-neutral-100 text-neutral-700 px-4 py-1 account-two-char-wrap"
              onClick={resetAccountForm}
            >
              <span className="account-two-char-wrap-text">取消更新</span>
            </button>
            <button
              type="submit"
              className="btn btn-primary-500 account-submit-btn text-white ms-6 account-two-char-wrap"
            >
              <span className="account-two-char-wrap-text">確認更新</span>
            </button>
          </div>
          <div className="mt-7 d-flex justify-content-center justify-content-lg-start account-delete-row">
            <button
              type="button"
              className="btn btn-outline-danger px-4 py-1"
              onClick={handleDeleteAccount}
              disabled={isDeletingAccount}
            >
              {isDeletingAccount ? "刪除中..." : "刪除帳號"}
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
        {/* 變更密碼modal */}
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
                  disabled={isChangingPassword}
                >
                  取消變更
                </button>
                <button
                  type="submit"
                  className="btn btn-primary-500 text-white member-modal-btn"
                  disabled={isChangingPassword}
                >
                  {isChangingPassword ? "變更中..." : "變更密碼"}
                </button>
              </div>

              <p className="text-center text-neutral-500 mb-0">
                忘記舊密碼了嗎？
                <span
                  className="text-primary-500 ms-1 account-inline-action--disabled"
                  aria-disabled="true"
                >
                  點此重新寄送驗證碼
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
