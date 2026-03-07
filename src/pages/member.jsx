import * as bootstrap from "bootstrap";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import db from "../../db.seed.json";
import KnowledgeCard from "../components/knowledges/KnowledgeCard";

function Member() {
  const navigate = useNavigate();
  const location = useLocation();
  const getTabFromHash = (hash) => (hash === "#record" ? "record" : "account");
  const activeTab = getTabFromHash(location.hash);
  const isAccountTab = activeTab === "account";
  const isRecordTab = activeTab === "record";
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

  const handleTabClick = (tab) => {
    navigate(`/member#${tab}`);
  };

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
    const queryTab = new URLSearchParams(location.search).get("tab");

    if (queryTab === "account" || queryTab === "record") {
      navigate(`/member#${queryTab}`, { replace: true });
    }
  }, [location.search, navigate]);

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

  // const article = db?.knowledge?.[0];

  // if (!article) return null;

  return (
    <>
      {/* <KnowledgeCard article={article} />; */}
      <div className="d-lg-flex">
        {/* <!-- 投稿選單: lg --> */}
        <div className="d-none d-lg-block member-side-menu">
          <div className=" position-relative ">
            <ul
              className="nav d-flex flex-column justify-content-center align-items-center w-100 position-fixed top-50 start-0 translate-middle-y mx-3"
              id="myTab"
              role="tablist"
            >
              {/* <!-- 帳號管理按鍵 --> */}
              <li className="nav-item w-100" role="presentation">
                <button
                  className={`nav-link p-3 w-100 text-start d-flex align-center ${
                    isAccountTab ? "active" : ""
                  }`}
                  id="account-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#account"
                  type="button"
                  role="tab"
                  aria-controls="account"
                  aria-selected={isAccountTab}
                  onClick={() => handleTabClick("account")}
                >
                  <span className="me-3 tab-icon"></span>
                  <span>帳號管理</span>
                </button>
              </li>
              {/* <!-- 會員紀錄按鍵 --> */}
              <li className="nav-item w-100" role="presentation">
                <button
                  className={`nav-link p-3 w-100 text-start d-flex align-center ${
                    isRecordTab ? "active" : ""
                  }`}
                  id="record-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#record"
                  type="button"
                  role="tab"
                  aria-controls="record"
                  aria-selected={isRecordTab}
                  onClick={() => handleTabClick("record")}
                >
                  <span className="me-3 tab-icon"></span>
                  <span>會員紀錄</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        {/* <!-- 投稿選單: sm --> */}
        <div className="d-block d-lg-none contrib-top-menu contrib-position-relative">
          <ul
            className="nav d-flex justify-content-center align-items-center"
            id="myTab"
            role="tablist"
          >
            {/* <!-- 帳號管理按鍵 --> */}
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link px-5 py-3 w-100 text-start d-flex align-center ${
                  isAccountTab ? "active" : ""
                }`}
                id="account-tab"
                data-bs-toggle="tab"
                data-bs-target="#account"
                type="button"
                role="tab"
                aria-controls="account"
                aria-selected={isAccountTab}
                onClick={() => handleTabClick("account")}
              >
                <span className="me-3 tab-icon"></span>
                <span>帳號管理</span>
              </button>
            </li>
            {/* <!-- 會員紀錄按鍵 --> */}
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link px-5 py-3 w-100 text-start d-flex align-center ${
                  isRecordTab ? "active" : ""
                }`}
                id="record-tab"
                data-bs-toggle="tab"
                data-bs-target="#record"
                type="button"
                role="tab"
                aria-controls="record"
                aria-selected={isRecordTab}
                onClick={() => handleTabClick("record")}
              >
                <span className="me-3 tab-icon"></span>
                <span>會員紀錄</span>
              </button>
            </li>
          </ul>
        </div>
        {/* <!-- 撰寫投稿 --> */}
        <div className="member-tab-content bg-secondary-100" id="myTabContent">
          {/* <!-- 帳號管理頁面 --> */}
          <div
            className={`bg-white m-0 member-tab-pane m-6 py-11 px-md-12 fade ${isAccountTab ? "show active" : ""}`}
            id="account"
          >
            <div className="form-container my-0 mx-auto">
              <h3 className="pb-lg-8 border-bottom border-secondary-300">貓奴檔案</h3>
              <div className="d-flex flex-column align-items-center my-6">
                <p className="text-center text-secondary-500">
                  為​了​侍奉​主子，​ <br />
                  你​的​所有​資料​都​整齊​放​在​這裡​了～
                </p>
                <img className="mt-3" src="./public/images/favicon.ico" alt="logo" />
              </div>
              <form className="needs-validation" novalidate>
                {/* 使用者帳號 */}
                <div className="mb-8">
                  <label className="fs-8 ms-2 mb-1" htmlFor="username">
                    使用者帳號
                  </label>
                  <br />
                  <div className="d-flex align-items-center">
                    <input
                      className="account-input"
                      type="email"
                      id="username"
                      name="username"
                      disabled
                    />
                    <a href="#" className="d-flex align-items-center px-3 py-1 ms-2">
                      <i className="bi bi-copy me-1 text-secondary-300"></i>
                      <p className="text-neutral-700">複製</p>
                    </a>
                  </div>
                </div>
                {/* 密碼 */}
                <div className="mb-8">
                  <label className="fs-8 ms-2 mb-1" htmlFor="password">
                    密碼
                  </label>
                  <br />
                  <div className="d-flex align-items-center">
                    <input
                      className="account-input"
                      type="password"
                      id="password"
                      name="password"
                      disabled
                    />
                    <button
                      type="button"
                      className="btn d-flex align-items-center px-3 py-1 ms-2"
                      onClick={openChangePasswordModal}
                    >
                      <i className="bi bi-pencil-square me-1 text-secondary-300"></i>
                      <p className="text-neutral-700">變更密碼</p>
                    </button>
                  </div>
                </div>
                {/* 使用者名稱 */}
                <div className="mb-8">
                  <label className="fs-8 ms-2 mb-1" htmlFor="nickname">
                    使用者名稱
                  </label>
                  <br />
                  <div className="d-flex align-items-center">
                    <input className="account-input" type="text" id="nickname" name="nickname" />
                  </div>
                </div>
                {/* 電話 */}
                <div>
                  <label className="fs-8 ms-2 mb-1" htmlFor="tel">
                    手機號碼
                  </label>
                  <br />
                  <div className="d-flex align-items-center">
                    <input className="account-input" type="tel" id="tel" name="tel" />
                    <a href="#" className=" d-flex align-items-center px-3 py-1 ms-2">
                      <i className="bi bi-arrow-repeat me-1 text-secondary-300"></i>
                      <p className="text-neutral-700">變更驗證</p>
                    </a>
                  </div>
                </div>
                {/* 按鈕 */}
                <div className="d-flex mt-12">
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
            {/* 變更密碼modal */}
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
                      <button
                        type="submit"
                        className="btn btn-primary-500 text-white member-modal-btn"
                      >
                        變更密碼
                      </button>
                    </div>

                    <p className="text-center text-neutral-500 mb-0">
                      忘記舊密碼了嗎？
                      <a href="#" className="text-primary-500 ms-1" disabled>
                        點此重新寄送驗證碼
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- 會員紀錄頁面 --> */}
          <div
            className={`member-tab-pane px-2 px-md-12 fade ${isRecordTab ? "show active" : ""}`}
            id="record"
          >
            {/* <!-- １. 專欄資訊 --> */}
            <div>
              <form className="needs-validation" novalidate method="POST" action="/submit">
                <div className="d-flex align-items-baseline pb-3 pb-md-8 border-bottom border-secondary-300 mb-3 mb-md-8">
                  <h3 className="me-3 neutral-900 d-none d-md-block">１. 專欄資訊</h3>
                  <h5 className="me-3 neutral-900 d-block d-md-none">１. 專欄資訊</h5>
                  <p>
                    <span className="neutral-600">(</span>
                    <span className="text-highlight">*</span>
                    <span className="neutral-600">為必填欄位)</span>
                  </p>
                </div>
                <div className="mb-3 mb-md-8">
                  <label for="columnTitle" className="w-100">
                    <p className="px-2 d-flex mb-1 mb-md-2">
                      <span className="contrib-font-size-sm neutral-900">1. 標題名稱</span>
                      <span className="contrib-font-size-sm text-highlight ms-1">*</span>
                      <span className="contrib-font-size-xs text-highlight ms-auto">必填</span>
                    </p>
                    <div>
                      <input
                        type="text"
                        className="form-control border-radius contrib-input-heigh px-4"
                        id="columnTitle"
                        placeholder="請輸入文章標題（例如: 如何改善貓咪挑食問題）"
                        required
                      />
                      <p className="invalid-feedback px-2 mt-2">
                        請輸入文章標題（例如: 如何改善貓咪挑食問題）
                      </p>
                    </div>
                  </label>
                </div>
                <div className="mb-3 mb-md-8">
                  <label for="columnAbstract" className="w-100">
                    <p className="px-2 d-flex mb-1 mb-md-2">
                      <span className="contrib-font-size-sm neutral-900">
                        2. 文章摘要（簡短介紹該文章內容）
                      </span>
                      <span className="contrib-font-size-sm text-highlight">*</span>
                      <span className="contrib-font-size-xs text-highlight ms-auto">必填</span>
                    </p>
                    <div>
                      <input
                        type="text"
                        className="form-control border-radius contrib-input-heigh px-4"
                        id="columnAbstract"
                        placeholder="請輸入文章摘要（總字數不得少於20字，不得多於100字）"
                        required
                      />
                      <p className="invalid-feedback px-2 mt-2">
                        請輸入文章摘要（總字數不得少於20字，不得多於100字）
                      </p>
                    </div>
                  </label>
                </div>
                <div className="mb-3 mb-md-8">
                  <label for="topicSelect" className="w-100">
                    <p className="px-2 d-flex mb-1 mb-md-2">
                      <span className="contrib-font-size-sm neutral-900">4. 選擇文章主題</span>
                      <span className="contrib-font-size-sm text-highlight ms-1">*</span>
                      <span className="contrib-font-size-xs text-highlight ms-auto">必填</span>
                    </p>
                    <div>
                      <select
                        id="topicSelect"
                        className="form-select border-radius contrib-input-heigh px-4"
                        aria-label="Default select example"
                        required
                      >
                        <option value="" selected>
                          請選擇
                        </option>
                        <option value="Diet">貓咪飲食指南</option>
                        <option value="Health">健康與疾病</option>
                        <option value="Behavior">行為與心理</option>
                        <option value="Ownership">新手貓奴入門</option>
                        <option value="Others">其他</option>
                      </select>
                      <p className="invalid-feedback px-2 mt-2">請選擇文章主題</p>
                    </div>
                  </label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Member;
