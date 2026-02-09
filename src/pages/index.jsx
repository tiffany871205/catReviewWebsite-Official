import { Link } from "react-router";
function Index() {
  return (
    <main>
      <div className="container-fluid p-0">
        {/* <!-- banner section1 --> */}
        <section className="section-brand">
          {/* <!-- 文字區塊 --> */}
          <div className="container">
            <div className="row justify-content-lg-end">
              <div className="col-lg-6 col-12">
                <div className="d-flex flex-column">
                  <img
                    className="mb-lg-11 mb-9 align-self-center"
                    src="./images/index/herotitle_frame_top.svg"
                    alt="herotitle_frame_top"
                  />
                  <h1 className="fs-2 fs-lg-1 mb-lg-7 mb-3 text-secondary-200 align-self-center">
                    想給主子最好的
                  </h1>
                  <div className="d-flex mb-lg-7 mb-9 align-items-center justify-content-center">
                    <img src="./images/logotype.svg" alt="logotype" />
                    <h3 className="fs-7 fs-lg-5 text-secondary-200 ms-2">來幫忙</h3>
                  </div>
                  <img
                    className="mt-lg-7 mb-lg-8 mb-9 align-self-center"
                    src="./images/index/herotitle_frame_bottom.svg"
                    alt="herotitle_frame_bottom"
                  />
                  {/* <!-- cta btn --> */}
                  <div className="index-cta d-flex align-items-center justify-content-center mt-lg-8 align-self-center">
                    <Link className="w-100 text-center py-2" to="/food">
                      <p className="text-secondary-200">前往探索</p>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- 品牌理念 section2 --> */}
        <section className="section-idea">
          {/* <!-- 背景花紋 --> */}
          <div className="index-texture position-relative pt-7">
            {/* <!-- 下方圓弧 --> */}
            <img
              className="position-absolute bottom-0 start-50 translate-middle-x z-1 w-100"
              src="./images/index/section01_border.png"
              alt="section01_border"
            />
            {/* <!-- 內容 --> */}
            <div className="container position-relative">
              {/* <!-- desktop --> */}
              {/* <!-- 女孩desktop --> */}
              <div className="col-6">
                <img
                  className="girl-hug-desktop position-absolute top-50 translate-middle-y d-none d-lg-block"
                  src="./images/index/section01_image.png"
                  alt="girl-hug"
                />
              </div>
              {/* <!-- 文字desktop --> */}
              <div className="d-lg-flex justify-content-end d-none">
                <div className="col-6 index-idea-container">
                  <h2 className="index-idea-h2 fs-2 text-primary-800 mb-11 ms-4 ms-xl-0">
                    為何創立此平台？
                  </h2>
                  <div className="index-section2-words-bg position-relative">
                    <picture>
                      <source
                        srcSet="
                          ./images/index/section01_card_desktop.svg
                        "
                        media="(min-width: 1200px)"
                      />
                      <img src="./images/index/section01_card_mobile.svg" alt="card_desktop" />
                    </picture>
                    <div className="index-section-2-words position-absolute">
                      <p className="text-neutral-900 mb-6">
                        當在選購貓咪罐頭與飼料時，飼主常需耗費大量時間比對與閱讀資料，卻時常面臨資訊不完整、內容過時，甚至受到商業偏頗影響的困擾。
                      </p>
                      <p className="text-neutral-900 mb-6">
                        市面上缺乏一個真正中立透明、可自由篩選且知識豐富的平台，來協助貓奴們
                        <span className="fw-bold text-primary-500">「理性挑食」。</span>
                      </p>
                      <p className="text-neutral-900">
                        因此我們打造了這個網站，致力於成為一個
                        <span className="fw-bold text-primary-500">「選品有依據、購買有信心」</span>
                        的貓咪食品資料整合平台。
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <!-- mobile --> */}
              <div className="d-flex flex-column align-items-center pt-7 d-lg-none girl-hug-mobile-padding">
                {/* <!-- 文字mobile --> */}
                <div>
                  <h2 className="text-center fs-4 text-primary-800 mb-8">為何創立此平台？</h2>
                  <div className="word-mobile">
                    <p className="text-neutral-900 mb-6">
                      當在選購貓咪罐頭與飼料時，飼主常需耗費大量時間比對與閱讀資料，卻時常面臨資訊不完整、內容過時，甚至受到商業偏頗影響的困擾。
                    </p>
                    <p className="text-neutral-900 mb-6">
                      市面上缺乏一個真正中立透明、可自由篩選且知識豐富的平台，來協助貓奴們
                      <span className="fw-bold text-primary-500">「理性挑食」。</span>
                    </p>
                    <p className="text-neutral-900">
                      因此我們打造了這個網站，致力於成為一個
                      <span className="fw-bold text-primary-500">「選品有依據、購買有信心」</span>
                      的貓咪食品資料整合平台。
                    </p>
                  </div>
                </div>
                {/* <!-- 女孩mobile --> */}
                <img
                  className="girl-hug-mobile d-lg-none position-absolute bottom-0 start-50 translate-middle-x"
                  src="./images/index/section01_image.png"
                  alt="girl-hug"
                />
              </div>
            </div>
          </div>
        </section>
        {/* <!-- 主要服務 section3 --> */}
        <section className="section-service">
          <div className="container">
            {/* <!-- 標題 --> */}
            <div className="section3-title d-flex flex-column align-items-center mb-lg-12 mb-11">
              <img
                className="mb-lg-11 mb-6"
                src="./images/index/section02_decoration.svg"
                alt="section02_decoration"
              />
              <h2 className="fs-lg-2 fs-4 text-center text-secondary-800">
                <span className="d-block d-lg-inline">獻給各位奴才</span>
                <span className="d-block d-lg-inline">最方便的功能</span>
              </h2>
            </div>
            {/* <!-- 圖片區塊 --> */}
            <div className="row gx-lg-3">
              <div className="col-lg-4 p-lg-0 mb-6">
                <div className="index-service-card">
                  <img className="mb-2" src="./images/index/section2-item1.png" alt="膳食探索" />
                  <h4 className="fs-5 text-lg-neutral-900 text-secondary-800 text-center mb-2">
                    膳食探索
                  </h4>
                  <p className="fs-8 fs-lg-7 text-lg-neutral-600 text-secondary-500 text-center">
                    聰明篩選・詳細說明・心得分享
                  </p>
                </div>
              </div>
              <div className="col-lg-4 p-lg-0 mb-6">
                <div className="index-service-card">
                  <img className="mb-2" src="./images/index/section2-item2.png" alt="喵皇學堂" />
                  <h4 className="fs-5 text-lg-neutral-900 text-secondary-800 text-center mb-2">
                    喵皇學堂
                  </h4>
                  <p className="fs-8 fs-lg-7 text-lg-neutral-600 text-secondary-500 text-center">
                    知識拓展・類別分區
                  </p>
                </div>
              </div>
              <div className="col-lg-4 p-lg-0">
                <div className="index-service-card">
                  <img className="mb-2" src="./images/index/section2-item3.png" alt="會員制度" />
                  <h4 className="fs-5 text-lg-neutral-900 text-secondary-800 text-center mb-2">
                    會員制度
                  </h4>
                  <p className="fs-8 fs-lg-7 text-lg-neutral-600 text-secondary-500 text-center">
                    收藏功能・分享投稿
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- 食物篩選 section4 --> */}
        <section className="section-food">
          <div className="container-fluid p-0">
            <div className="d-lg-flex flex-row-reverse d-block">
              {/* <!-- 右區塊 --> */}
              <div className="index-food-right col-lg-6 p-0"></div>
              {/* <!-- 左區塊 --> */}
              <div className="col-lg-6 p-0 position-relative">
                {/* <!-- 左區塊文字 --> */}
                <div className="d-flex justify-content-lg-end justify-content-center ps-lg-11 px-2">
                  <div className="index-food-words">
                    <h2 className="fs-lg-2 fs-4 text-primary-800 mb-lg-11 mb-6">
                      貓食種類也太多！？
                    </h2>
                    <p className="text-neutral-900 mb-lg-11 mb-6">
                      不知道怎麼選？
                      <br />
                      買回家主子不賞臉？
                      <br />
                      快來使用膳食挑選功能
                      <br />
                      找到喵皇命定美食！
                    </p>
                    <a
                      className="btn border-primary-300 py-lg-5 px-lg-8 py-3 px-6 rounded-pill d-flex align-items-center"
                      href="foodmain.html"
                    >
                      前往探索
                      <img className="ms-3" src="./images/arrow_right.png" alt="arrow_right" />
                    </a>
                  </div>
                </div>
                {/* <!-- 裝飾hashtag --> */}
                <div className="index-deco-word-1 text-primary-200 Cactus position-lg-absolute bottom-0 start-0 ps-2">
                  <p>＃清楚成分</p>
                  <p className="ms-11 ps-lg-5">＃簡單篩選</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- 知識專欄 section5 --> */}
        <section className="section-knowledge">
          <div className="container-fluid p-0">
            <div className="d-lg-flex d-block">
              {/* <!-- 左區塊 --> */}
              <div className="index-knowledge-left col-lg-6 p-0"></div>
              {/* <!-- 右區塊 --> */}
              <div className="col-lg-6 p-0 position-relative">
                {/* <!-- 右區塊文字 --> */}
                <div className="d-flex justify-content-lg-start justify-content-center pe-lg-11 px-2">
                  <div className="index-knowledge-words text-lg-end">
                    <h2 className="fs-lg-2 fs-4 text-primary-800 mb-lg-11 mb-6">
                      第一次養貓就上手！
                    </h2>
                    <p className="text-neutral-900 mb-lg-11 mb-6">
                      裡面的成分代表什麼？
                      <br />
                      服侍主子需要注意哪些事？
                      <br />
                      進入學堂告訴你！
                    </p>
                    <a
                      className="btn border-primary-300 rounded-pill d-flex align-items-center py-lg-5 px-lg-8 py-3 px-6"
                      href="knowledge.html"
                    >
                      前往學堂
                      <img className="ms-3" src="./images/arrow_right.png" alt="arrow_right" />
                    </a>
                  </div>
                </div>
                {/* <!-- 裝飾hashtag --> */}
                <div className="index-deco-word-2 text-primary-200 Cactus position-lg-absolute bottom-0 end-0 ps-2">
                  <p className="text-end">＃知識專欄</p>
                  <p className="text-end me-11 pe-lg-5">＃專業鏟屎官</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <!-- 投稿功能 section6 --> */}
        <section className="section-post">
          {/* <!-- 內容 --> */}
          <div className="container">
            <div className="col-lg-6">
              <div className="index-post-word bg-white p-lg-12 py-12 px-11 position-relative">
                {/* <!-- 文字 --> */}
                <div className="d-flex flex-column align-items-center">
                  <h4 className="fs-5 text-secondary-800 mb-lg-6 mb-3">想分享好東西嗎？</h4>
                  <h2 className="fs-lg-2 fs-3 text-secondary-800 mb-lg-9 mb-8">歡迎投稿</h2>
                  <Link
                    className="index-post-share btn rounded-pill mt-lg-1 d-flex align-items-center px-lg-6 py-lg-2 px-3 py-1"
                    to="/contrib"
                  >
                    <img className="quill-pen" src="./images/index/quill-pen.png" alt="quill-pen" />
                    <p className="text-white ms-1">分享好料</p>
                  </Link>
                </div>
                {/* <!-- 裝飾 --> */}
                <img
                  className="index-post-deco position-absolute top-0 start-0 p-3"
                  src="./images/index/section05_decoration_lt.svg"
                  alt="deco"
                />
                <img
                  className="index-post-deco position-absolute bottom-0 start-0 p-3"
                  src="./images/index/section05_decoration_lb.svg"
                  alt="deco"
                />
                <img
                  className="index-post-deco position-absolute top-0 end-0 p-3"
                  src="./images/index/section05_decoration_rt.svg"
                  alt="deco"
                />
                <img
                  className="index-post-deco position-absolute bottom-0 end-0 p-3"
                  src="./images/index/section05_decoration_rb.svg"
                  alt="deco"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
export default Index;
