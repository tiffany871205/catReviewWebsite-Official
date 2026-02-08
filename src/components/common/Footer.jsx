import { Link } from "react-router";

function Footer() {
  return (
    <>
      <div className="container">
        <div className="d-flex align-items-center justify-content-lg-between py-8 flex-column flex-lg-row">
          {/* <!-- logo --> */}
          <Link className="navbar-brand" to="/index">
            <img src="./images/logo.svg" alt="logo" />
          </Link>
          {/* <!-- 選單內容 --> */}
          <ul className="footer-nav d-flex gap-lg-10 gap-6 align-items-center mt-7 mt-lg-0">
            {/* <!-- 膳食探索 --> */}
            <li className="nav-item">
              <Link className="nav-link" to="/food">
                膳食探索
              </Link>
            </li>
            {/* <!-- 喵皇學堂 --> */}
            <li className="nav-item">
              <Link className="nav-link" to="/knowledge">
                喵皇學堂
              </Link>
            </li>
            {/* <!-- 我要投稿 --> */}
            <li className="nav-item">
              <Link className="nav-link" to="/contrib">
                我要投稿
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/member">
                會員中心
              </Link>
            </li>
          </ul>
        </div>
      </div>
      {/* <!-- 版權 --> */}
      <div className="text-center pt-8 mb-8 text-neutral-600 fs-8 border-top border-secondary-300">
        <p className="mx-2">本作品為專題製作使用，所有內容均受版權法保護</p>
        <p className="mx-2">未經作者書面許可，禁止任何形式的複製、修改、發佈或商業使用</p>
        <p className="mx-2">若需使用，請聯繫作者取得授權。感謝您的理解與尊重</p>
      </div>
    </>
  );
}

export default Footer;
