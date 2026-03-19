export default function KnowledgeBanner({ keyword, setKeyword, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <section className="knowledge-banner">
      <div className="container">
        <div className="row justify-content-lg-end">
          <div className="col-lg-4 col-12">
            <div className="d-flex flex-column">
              <img
                src="./images/index/section02_decoration.svg"
                alt="deco"
                className="mb-lg-10 mb-6 align-self-center"
              />

              {/* 桌面版標題 */}
              <img
                src="./images/knowledge/knowledge-banner-title.png"
                alt="banner-title"
                className="mb-lg-5 align-self-center d-lg-block d-none"
              />

              {/* 手機版標題 */}
              <img
                src="./images/knowledge/rwdknowledge-banner-title.png"
                alt="banner-title"
                className="mb-2 align-self-center d-lg-none d-block"
              />

              <h1 className="fs-lg-5 fs-7 mb-lg-10 mb-6 text-secondary-100 align-self-center">
                讓你更懂你的喵皇！
              </h1>
            </div>

            <div className="justify-content-center w-100">
              <form onSubmit={handleSubmit} className="position-relative w-100">
                <input
                  type="text"
                  className="form-control rounded-pill py-2 ps-3 pe-5"
                  placeholder="＃搜尋文章主題"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                />
                <button
                  className="btn btn-primary-600 rounded position-absolute end-0 top-50 translate-middle-y me-2 d-flex align-items-center justify-content-center"
                  type="submit"
                >
                  <i
                    className="bi bi-search text-white"
                    style={{ fontSize: "1.2rem" }}
                  />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
