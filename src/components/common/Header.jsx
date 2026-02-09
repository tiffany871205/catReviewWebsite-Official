import { Link, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

function Header() {
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    const checkAuth = () => {
      // 從 cookie 中取得 token
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("catToken="))
        ?.split("=")[1];

      if (token) {
        try {
          // 從 localStorage 取得使用者資訊
          const userData = localStorage.getItem("user");
          if (userData) {
            setUser(JSON.parse(userData));
            axios.defaults.headers.common["Authorization"] = token;
          }
        } catch (error) {
          // Token 無效,清除所有登入資訊
          document.cookie = "catToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
          localStorage.removeItem("user");
          setUser(null);
        }
      }
    };

    checkAuth();
  }, []);
  // 控制 Modal 開閉時的 body overflow
  useEffect(() => {
    if (showLoginModal) {
      document.body.style.cssText = "overflow: hidden !important; padding-right: 15px !important;";
    } else {
      document.body.style.cssText = "";
    }
  }, [showLoginModal]);

  const onSubmit = async (data) => {
    try {
      // 清除之前的錯誤訊息
      setLoginError("");

      const response = await axios.post(`${API_BASE}/login`, {
        email: data.email,
        password: data.password,
      });

      console.log("後端回傳的完整資料:", response.data);

      const { accessToken, user: userData } = response.data;

      // 設定 cookie（7天後過期）
      const expireDate = new Date();
      expireDate.setDate(expireDate.getDate() + 7);
      document.cookie = `catToken=${accessToken};expires=${expireDate.toUTCString()};path=/`;

      // 設定 axios header
      axios.defaults.headers.common["Authorization"] = accessToken;

      // 儲存使用者資訊到 localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // 儲存使用者資訊到 state
      setUser(userData);

      // 重置表單
      reset();

      console.log("登入成功:", response.data);
      console.log("使用者資訊已儲存:", userData);

      setShowLoginModal(false);

      // 關閉手機版漢堡選單
      try {
        closeNavbarOnMobile();
      } catch (err) {
        console.log("關閉漢堡選單時發生錯誤（不影響登入）:", err);
      }
    } catch (error) {
      console.error("登入錯誤:", error);
      console.log(error.response);

      // 顯示錯誤訊息
      if (error.response?.status === 400 || error.response?.status === 401) {
        setLoginError("電子信箱或密碼錯誤");
      } else if (error.response?.data?.message) {
        setLoginError(error.response.data.message);
      } else {
        setLoginError("登入失敗，請稍後再試");
      }
    }
  };

  // 登出處理
  const handleLogout = () => {
    // 清除 cookie
    document.cookie = "catToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";

    // 清除 localStorage
    localStorage.removeItem("user");

    // 清除 axios header
    delete axios.defaults.headers.common["Authorization"];

    // 清除使用者狀態
    setUser(null);

    // 導向首頁
    navigate("/index");
  };

  //定義手機板寬度判斷
  function isMobile() {
    return window.innerWidth < 992;
  }

  // 手機版點擊後收起選單
  function closeNavbarOnMobile() {
    const navbarCollapse = document.getElementById("navbarNav");

    if (navbarCollapse && isMobile() && navbarCollapse.classList.contains("show")) {
      navbarCollapse.classList.remove("show");

      // 如果有 Bootstrap JS，也用 Bootstrap 的方法關閉
      if (window.bootstrap && window.bootstrap.Collapse) {
        const bsCollapse = window.bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      }
    }
  }

  return (
    <>
      <nav>
        <div className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            {/* <!-- logo --> */}
            <Link to="/index" className="navbar-brand d-none d-lg-block">
              <img src="./images/logo.svg" alt="logo" className="me-72" />
            </Link>

            {/* <!-- 手機板header --> */}
            <div className="navbar-header d-lg-none w-100 d-flex justify-content-between align-items-center py-1 flex-shrink-0">
              {/* <!-- logo --> */}
              <Link className="navbar-brand" to="/index">
                <img src="./images/logo.svg" alt="logo" className="me-72" />
              </Link>
              {/* <!-- 漢堡按鈕 --> */}
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
            {/* <!-- nav內容 --> */}
            <div
              className="collapse navbar-collapse justify-content-between mt-11 mt-lg-0"
              id="navbarNav"
            >
              <ul className="header-navbar-nav navbar-nav w-100">
                {/* <!-- 膳食探索 --> */}
                <li className="nav-item me-lg-10 mb-10 mb-lg-0">
                  <Link
                    className="nav-link d-flex justify-content-center"
                    to="/food"
                    onClick={() => {
                      closeNavbarOnMobile();
                    }}
                  >
                    <div className="header-food-btn me-1 d-none d-lg-block"></div>
                    <img
                      src="./images/decoration.png"
                      alt="decoration"
                      className="align-bottom me-1 d-lg-none d-block"
                    />
                    膳食探索
                  </Link>
                </li>
                {/* <!-- 喵皇學堂 --> */}
                <li className="nav-item me-lg-10 mb-10 mb-lg-0">
                  <Link
                    className="nav-link d-flex justify-content-center"
                    to="/knowledge"
                    onClick={() => {
                      closeNavbarOnMobile();
                    }}
                  >
                    <div className="header-knowledge-btn me-1 d-none d-lg-block"></div>
                    <img
                      src="./images/decoration.png"
                      alt="decoration"
                      className="align-bottom me-1 d-lg-none d-block"
                    />
                    喵皇學堂
                  </Link>
                </li>
                {/* <!-- 我要投稿 --> */}
                <li className="nav-item mb-10 mb-lg-0">
                  <Link
                    className="nav-link d-flex justify-content-center"
                    to="/contrib"
                    onClick={() => {
                      closeNavbarOnMobile();
                    }}
                  >
                    <div className="header-post-btn me-1 d-none d-lg-block"></div>
                    <img
                      src="./images/decoration.png"
                      alt="decoration"
                      className="align-bottom me-1 d-lg-none d-block"
                    />
                    我要投稿
                  </Link>
                </li>

                {/* <!-- 手機版會員中心(僅登入後顯示) --> */}
                {user && (
                  <li className="nav-item mb-10 mb-lg-0 d-lg-none">
                    <Link
                      className="nav-link d-flex justify-content-center"
                      to="/member"
                      onClick={() => {
                        closeNavbarOnMobile();
                      }}
                    >
                      <img
                        src="./images/decoration.png"
                        alt="decoration"
                        className="align-bottom me-1"
                      />
                      會員中心
                    </Link>
                  </li>
                )}

                {/* <!-- 手機版登入/使用者資訊 --> */}
                <li className="nav-item d-lg-none mt-auto">
                  {!user ? (
                    <a
                      className="nav-link header-log p-1 d-flex justify-content-center py-6"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowLoginModal(true);
                      }}
                    >
                      <span className="header-pet material-symbols-outlined align-bottom me-2">
                        pets
                      </span>
                      註冊 / 登入
                    </a>
                  ) : (
                    <div className="mobile-user-menu">
                      {/* 使用者資訊區塊 */}
                      <div className="text-center py-4 border-bottom">
                        <p className="mb-1 text-neutral-800 fw-bold">{user.nickname || "使用者"}</p>
                        <p className="mb-0 text-neutral-600 fs-7">{user.email}</p>
                      </div>

                      {/* 登出 */}
                      <Link
                        className="nav-link d-flex align-items-center justify-content-center py-4"
                        href="#"
                        to="/index"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLogout();
                          closeNavbarOnMobile();
                        }}
                      >
                        <img src="./images/member/logout.png" alt="logout" className="me-3" />
                        登出
                      </Link>
                    </div>
                  )}
                </li>
              </ul>

              {/* <!-- 電腦版註冊登入 --> */}
              {!user ? (
                <a
                  className="nav-link header-log p-lg-1 d-none d-lg-flex justify-content-center py-6 flex-shrink-0"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowLoginModal(true);
                  }}
                >
                  <span className="header-pet material-symbols-outlined align-bottom me-2">
                    pets
                  </span>
                  註冊 / 登入
                </a>
              ) : (
                <div className="dropdown d-none d-lg-block flex-shrink-0">
                  <a
                    className="nav-link header-log p-lg-1 d-flex justify-content-center py-6 text-nowrap"
                    href="#"
                    id="dropdownMenuMember"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span className="header-pet material-symbols-outlined align-bottom me-2">
                      pets
                    </span>
                    {user.nickname}
                  </a>
                  <ul
                    className="dropdown-menu p-3 dropdown-menu-end mt-5 rounded-0"
                    aria-labelledby="dropdownMenuMember"
                  >
                    <li>
                      <Link
                        className="dropdown-item d-flex align-items-center p-3 pe-12"
                        to="/member"
                      >
                        <img
                          src="./images/member/user-circle.png"
                          alt="user-circle"
                          className="me-3"
                        />
                        帳號管理
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item d-flex align-items-center p-3 pe-12"
                        to="/member"
                      >
                        <img src="./images/member/history.png" alt="history" className="me-3" />
                        會員紀錄
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item d-flex align-items-center p-3 pe-12"
                        to="/index"
                        data-bs-toggle="modal"
                        data-bs-target="#logoutModal"
                        onClick={(e) => {
                          e.preventDefault();
                          handleLogout();
                        }}
                      >
                        <img src="./images/member/logout.png" alt="logout" className="me-3" />
                        登出
                      </Link>
                      {/* <!-- Modal --> */}
                      <div
                        className="modal fade"
                        id="logoutModal"
                        tabIndex="-1"
                        aria-labelledby="logoutModalLabel"
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
                            <div className="modal-body text-center mt-3 text-neutral-800">
                              您已成功登出
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              )}

              {/* <!-- 登入Modal --> */}
              {showLoginModal && (
                <div
                  className="modalgreyback d-flex align-items-center justify-content-center"
                  onClick={() => {
                    setShowLoginModal(false);
                    setLoginError("");
                    reset();
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
                              setLoginError("");
                              reset();
                              setShowLoginModal(false);
                            }}
                          ></button>
                        </div>
                        <div className="modal-header d-flex justify-content-center border-0 p-0">
                          <h2
                            className="modal-title fs-5 mt-3 mb-11 text-neutral-800"
                            id="loginModalLabel"
                          >
                            登入會員帳號
                          </h2>
                        </div>
                        <div className="modal-body p-0 mb-11">
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
                              className="btn btn-primary-500 mt-8 text-white w-100 py-1"
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
                              setShowLoginModal(false);
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
              )}
            </div>
          </div>
        </div>
        {/* <!-- 漸層線條 --> */}
        <div className="header-liner"></div>
      </nav>
    </>
  );
}

export default Header;
