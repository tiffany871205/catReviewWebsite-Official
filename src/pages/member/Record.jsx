import { NavLink, Outlet } from "react-router";
import BackToTopButton from "../../components/common/BackToTopButton";

function Record() {
  return (
    <div className="member-tab-pane px-2 px-md-12 fade show active">
      <div className="record-container my-0 mx-auto">
        {/* 電腦版按鈕 */}
        <ul className="nav nav-pills justify-content-between align-items-center pb-6 mb-9 d-none d-lg-flex">
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link record-btn d-flex align-items-center ${isActive ? "active" : ""}`
              }
              to="comment"
              end
            >
              <i className="text-secondary-300 bi bi-chat-dots me-1"></i>
              <p className="text-neutral-900">留言評分</p>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link record-btn d-flex align-items-center ${isActive ? "active" : ""}`
              }
              to="favorite"
            >
              <i className="text-secondary-300 bi bi-bookmark me-1"></i>
              <p className="text-neutral-900">珍藏</p>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              className={({ isActive }) =>
                `nav-link record-btn d-flex align-items-center ${isActive ? "active" : ""}`
              }
              to="contribution"
            >
              <i className="text-secondary-300 bi bi-newspaper me-1"></i>
              <p className="text-neutral-900">投稿</p>
            </NavLink>
          </li>
        </ul>
        {/* 手機板按鈕 */}
        <div
          className="btn-group w-100 member-record-mobile-group mb-9 d-flex d-lg-none"
          role="group"
          aria-label="會員紀錄分類"
        >
          <NavLink
            className={({ isActive }) =>
              `btn record-mobile-btn d-inline-flex align-items-center justify-content-center gap-2 ${isActive ? "active" : ""}`
            }
            to="comment"
            end
          >
            <i className="text-secondary-300 bi bi-chat-dots"></i>
            <span className="text-neutral-900">留言評分</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `btn record-mobile-btn d-inline-flex align-items-center justify-content-center gap-2 ${isActive ? "active" : ""}`
            }
            to="favorite"
          >
            <i className="text-secondary-300 bi bi-bookmark"></i>
            <span className="text-neutral-900">珍藏</span>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `btn record-mobile-btn d-inline-flex align-items-center justify-content-center gap-2 ${isActive ? "active" : ""}`
            }
            to="contribution"
          >
            <i className="text-secondary-300 bi bi-newspaper"></i>
            <span className="text-neutral-900">投稿</span>
          </NavLink>
        </div>
        {/* 內容 */}
        <Outlet />
      </div>
      {/* 回到頂端按鈕 */}
      <BackToTopButton />
    </div>
  );
}

export default Record;
