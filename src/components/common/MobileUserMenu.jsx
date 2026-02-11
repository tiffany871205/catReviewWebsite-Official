import { Link } from "react-router";

function MobileUserMenu({ user, onOpenLogin, handleLogout, closeNavbarOnMobile }) {
  return (
    <li className="nav-item d-lg-none mt-auto">
      {!user ? (
        <a
          className="nav-link header-log p-1 d-flex justify-content-center py-6"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onOpenLogin();
          }}
        >
          <span className="header-pet material-symbols-outlined align-bottom me-2">pets</span>
          註冊 / 登入
        </a>
      ) : (
        <div className="mobile-user-menu">
          <div className="text-center py-4 border-bottom">
            <p className="mb-1 text-neutral-800 fw-bold">{user.nickname || "使用者"}</p>
            <p className="mb-0 text-neutral-600 fs-7">{user.email}</p>
          </div>

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
  );
}

export default MobileUserMenu;
