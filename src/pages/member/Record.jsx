import { NavLink, Outlet } from "react-router";

function Record() {
  return (
    <div className="member-tab-pane px-2 px-md-12 fade show active">
      <div className="record-container my-0 mx-auto">
        {/* 上方btn */}
        <ul className="nav nav-pills justify-content-between align-items-center pb-6 mb-9">
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
        {/* 內容 */}
        <Outlet />
      </div>
    </div>
  );
}

export default Record;
