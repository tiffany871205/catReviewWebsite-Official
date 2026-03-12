import { Link, useLocation, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import LoginModal from "./LoginModal";
import NavLinks from "./NavLinks";
import MobileUserMenu from "./MobileUserMenu";
import { isAuthenticated, setAuth, clearAuth } from "../../utils/auth";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

function Header() {
  // 統一管理 header 內會用到的靜態資源路徑。
  const imageBaseUrl = `${import.meta.env.BASE_URL}images/`;

  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // 每次路由切換時同步一次登入狀態，避免 UI 顯示舊資料。
  useEffect(() => {
    try {
      const userData = isAuthenticated();
      setUser(userData || null);
    } catch (err) {
      clearAuth();
      setUser(null);
    }
  }, [location.pathname]);
  // 控制登入 modal 開關時的 body 滾動行為。
  useEffect(() => {
    if (showLoginModal) {
      document.body.style.cssText = "overflow: hidden !important; padding-right: 15px !important;";
    } else {
      document.body.style.cssText = "";
    }
  }, [showLoginModal]);

  // 登入送出：打 API、寫入 auth、更新 header 使用者顯示。
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

      // 使用 utils 處理認證儲存
      setAuth({ accessToken, user: userData });

      // 儲存使用者資訊到 state
      setUser(userData);

      // 重置表單
      reset();

      console.log("登入成功:", response.data);
      console.log("使用者資訊已儲存:", userData);

      setShowLoginModal(false);

      await Swal.fire({
        icon: "success",
        title: `歡迎回來，${userData.nickname || "貓奴"}`,
        text: "登入成功，開始今天的探索吧。",
        confirmButtonText: "開始逛逛",
        customClass: {
          popup: "rounded-4 border-0 shadow-lg",
          confirmButton: "btn btn-primary-500 text-white px-6",
        },
        buttonsStyling: false,
      });

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

  // 登出流程：清除 auth 後提示並導回首頁。
  const handleLogout = async () => {
    // 清除認證相關資訊
    clearAuth();
    setUser(null);

    await Swal.fire({
      icon: "success",
      title: "已成功登出",
      text: "下次再回來幫主子挑好料、學新知。",
      confirmButtonText: "回到首頁",
      customClass: {
        popup: "rounded-4 border-0 shadow-lg",
        confirmButton: "btn btn-primary-500 text-white px-6",
      },
      buttonsStyling: false,
    });

    // 導向首頁
    navigate("/index");
  };

  // 手機斷點判斷（navbar 收合控制使用）。
  function isMobile() {
    return window.innerWidth < 992;
  }

  // 手機版點選功能後主動收起漢堡選單。
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
      {/* 網站主導覽：桌機/手機共用一份資料流，不同呈現。 */}
      <nav>
        <div className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            {/* <!-- logo --> */}
            <Link to="/index" className="navbar-brand d-none d-lg-block">
              <img src={`${imageBaseUrl}logo.svg`} alt="logo" className="me-72" />
            </Link>

            {/* <!-- 手機板header --> */}
            <div className="navbar-header d-lg-none w-100 d-flex justify-content-between align-items-center py-1 flex-shrink-0">
              {/* <!-- logo --> */}
              <Link className="navbar-brand" to="/index">
                <img src={`${imageBaseUrl}logo.svg`} alt="logo" className="me-72" />
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
              <NavLinks user={user} closeNavbarOnMobile={closeNavbarOnMobile} />

              <MobileUserMenu
                user={user}
                onOpenLogin={() => setShowLoginModal(true)}
                handleLogout={handleLogout}
                closeNavbarOnMobile={closeNavbarOnMobile}
              />

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
                        className="dropdown-item header-dropdown-item justify-content-start d-flex align-items-center p-3 pe-12"
                        to="/member/account"
                      >
                        <img
                          src={`${imageBaseUrl}member/user-circle.png`}
                          alt="user-circle"
                          className="me-3"
                        />
                        帳號管理
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item header-dropdown-item justify-content-start d-flex align-items-center p-3 pe-12"
                        to="/member/record"
                      >
                        <img
                          src={`${imageBaseUrl}member/history.png`}
                          alt="history"
                          className="me-3"
                        />
                        會員紀錄
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="dropdown-item header-dropdown-item justify-content-start d-flex align-items-center p-3 pe-12"
                        to="/index"
                        onClick={async (e) => {
                          e.preventDefault();
                          await handleLogout();
                        }}
                      >
                        <img
                          src={`${imageBaseUrl}member/logout.png`}
                          alt="logout"
                          className="me-3"
                        />
                        登出
                      </Link>
                    </li>
                  </ul>
                </div>
              )}

              <LoginModal
                show={showLoginModal}
                onClose={() => {
                  setShowLoginModal(false);
                  setLoginError("");
                  reset();
                }}
                onSubmit={onSubmit}
                register={register}
                handleSubmit={handleSubmit}
                errors={errors}
                loginError={loginError}
                reset={reset}
                closeNavbarOnMobile={closeNavbarOnMobile}
              />
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
