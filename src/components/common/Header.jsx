import { Link } from "react-router";

function Header() {
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
              <ul className="header-navbar-nav navbar-nav">
                {/* <!-- 膳食探索 --> */}
                <li className="nav-item me-lg-10 mb-10 mb-lg-0">
                  <Link className="nav-link d-flex justify-content-center" to="/food">
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
                  <Link className="nav-link d-flex justify-content-center" to="/knowledge">
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
                <li className="nav-item">
                  <Link className="nav-link d-flex justify-content-center" to="/contrib">
                    <div className="header-post-btn me-1 d-none d-lg-block"></div>
                    <img
                      src="./images/decoration.png"
                      alt="decoration"
                      className="align-bottom me-1 d-lg-none d-block"
                    />
                    我要投稿
                  </Link>
                </li>
              </ul>
              {/* <!-- 註冊登入 --> */}
              <a
                className="nav-link header-log p-lg-1 d-flex justify-content-center mt-auto py-6"
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#loginModal"
              >
                <span className="header-pet material-symbols-outlined align-bottom me-2">pets</span>
                註冊 / 登入
              </a>

              {/* <!-- Modal --> */}
              <div
                className="modal fade"
                id="loginModal"
                tabindex="-1"
                aria-labelledby="loginModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered">
                  <div className="modal-content p-11 rounded-0">
                    <div className="d-flex justify-content-end">
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
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
                      <div className="form-floating mb-3">
                        <input
                          type="email"
                          className="form-control py-2 px-6"
                          id="loginfloatingInput"
                          name="loginfloatingInput"
                          placeholder="name@example.com"
                        />
                        <label className="text-neutral-500 fs-7" htmlFor="loginfloatingInput">
                          <i className="bi bi-search text-white"></i>輸入電子信箱
                        </label>
                      </div>
                      <div className="form-floating">
                        <input
                          type="password"
                          className="form-control py-2 px-6"
                          id="loginfloatingPassword"
                          name="loginfloatingPassword"
                          placeholder="Password"
                        />
                        <label className="text-neutral-500" htmlFor="loginfloatingPassword">
                          輸入密碼
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary-500 mt-8 text-white w-100 py-1"
                      >
                        會員登入
                      </button>
                    </div>
                    <div className="modal-footer border-0 d-flex justify-content-center">
                      <p className="text-neutral-600">還沒有帳戶?</p>
                      <a href="#" className="text-primary-500 ms-3">
                        <u>點此註冊</u>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- 漸層線條 --> */}
        <div class="header-liner"></div>
      </nav>
    </>
  );
}

export default Header;
