import { Link } from "react-router";

function NavLinks({ user, closeNavbarOnMobile }) {
  return (
    <ul className="header-navbar-nav navbar-nav w-100">
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

      {user && (
        <li className="nav-item mb-10 mb-lg-0 d-lg-none">
          <Link
            className="nav-link d-flex justify-content-center"
            to="/member"
            onClick={() => {
              closeNavbarOnMobile();
            }}
          >
            <img src="./images/decoration.png" alt="decoration" className="align-bottom me-1" />
            會員中心
          </Link>
        </li>
      )}
    </ul>
  );
}

export default NavLinks;
