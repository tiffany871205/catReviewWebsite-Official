import { Link, Outlet, useLocation } from "react-router";

function Member() {
  // 依目前路由高亮會員中心側欄標籤。
  const location = useLocation();
  const isAccountTab = location.pathname.startsWith("/member/account");
  const isRecordTab = location.pathname.startsWith("/member/record");

  return (
    <>
      {/* 會員中心主版型：左側導覽 + 右側子頁內容。 */}
      <div className="d-lg-flex">
        {/* 左側選單 */}
        <div className="d-none d-lg-block member-side-menu">
          <div className=" position-relative ">
            <ul
              className="nav d-flex flex-column justify-content-center align-items-center w-100 position-fixed top-50 start-0 translate-middle-y mx-3"
              id="myTab"
            >
              {/* 帳號管理按鍵 */}
              <li className="nav-item w-100">
                <Link
                  className={`nav-link p-3 w-100 text-start d-flex align-center ${
                    isAccountTab ? "active" : ""
                  }`}
                  id="account-tab"
                  to="account"
                >
                  <span className="me-3 tab-icon"></span>
                  <span>帳號管理</span>
                </Link>
              </li>
              {/* 會員紀錄按鍵 */}
              <li className="nav-item w-100">
                <Link
                  className={`nav-link p-3 w-100 text-start d-flex align-center ${
                    isRecordTab ? "active" : ""
                  }`}
                  id="record-tab"
                  to="record"
                >
                  <span className="me-3 tab-icon"></span>
                  <span>會員紀錄</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* 左側選單: sm */}
        <div className="d-block d-lg-none contrib-top-menu contrib-position-relative">
          <ul className="nav d-flex justify-content-center align-items-center">
            {/* 帳號管理按鍵 */}
            <li className="nav-item">
              <Link
                className={`nav-link px-5 py-3 w-100 text-start d-flex align-center ${
                  isAccountTab ? "active" : ""
                }`}
                id="account-tab"
                to="account"
              >
                <span className="me-3 tab-icon"></span>
                <span>帳號管理</span>
              </Link>
            </li>
            {/* 會員紀錄按鍵 */}
            <li className="nav-item">
              <Link
                className={`nav-link px-5 py-3 w-100 text-start d-flex align-center ${
                  isRecordTab ? "active" : ""
                }`}
                id="record-tab"
                to="record"
              >
                <span className="me-3 tab-icon"></span>
                <span>會員紀錄</span>
              </Link>
            </li>
          </ul>
        </div>
        {/* 右側頁面內容 */}
        <div className="member-tab-content bg-secondary-100">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Member;
