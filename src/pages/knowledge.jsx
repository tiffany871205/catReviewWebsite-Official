import { useEffect, useMemo, useState } from "react";
import db from "../../db.seed.json";

import { Popover } from "bootstrap";

/* -----------------------------
   1) 最上方 Banner
------------------------------ */
function KnowledgeBanner({ keyword, setKeyword, onSubmit }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit?.();
  };

  return (
    <>
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

                {/* 桌機版標題 */}
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
                <form
                  onSubmit={handleSubmit}
                  className="position-relative w-100"
                >
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
    </>
  );
}

/* -----------------------------
   2) 手機版篩選列
------------------------------ */
function MobileFilterBar({
  keyword,
  setKeyword,
  topics,
  categories,
  selectedTopic,
  setSelectedTopic,
  selectedCategory,
  setSelectedCategory,
  onClear,
}) {
  return (
    <div className="col-12 pt-1 pb-1 mb-1 d-lg-none d-block bg-white">
      <div className="container pt-2 pb-2">
        <div className="d-flex ps-2 pe-2 align-items-center">
          <p className="fs-8 pb-1 me-auto">搜尋主題</p>
        </div>

        <div className="d-flex">
          <input
            type="text"
            className="form-control border-radius contrib-input-heigh"
            id="knowledgeNameMobile"
            placeholder="＃搜尋文章主題"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />

          {/* 功能用途說明 icon（開 modal） */}
          <img
            src="./images/knowledge/info-tip.svg"
            alt="information-circle"
            className="mx-1"
            tabIndex={0}
            role="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          />

          {/* 用途說明 Modal */}
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex={-1}
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLabel">
                    功能用途說明
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>

                <div className="modal-body">
                  <div className="my-2">
                    <p className="fs-7 fw-bold mb-2">快速搜尋主題</p>
                    <p className="text-neutral-600 fs-8 pb-2">
                      喵～你在找什麼？
                      <br />
                      這裡是你的小幫手，只要輸入關鍵字，就能馬上找到你想知道的貓咪知識。不管是「貓咪不喝水怎麼辦？」還是「如何跟貓咪培養感情」，輸入一下就幫你找到答案！
                      <br />
                      例如：
                      <br />
                      輸入「嘔吐」，系統就會跳出「常見貓咪疾病」、「嘔吐原因與處理」等相關主題，超方便～
                    </p>
                  </div>

                  <div className="my-2">
                    <p className="fs-7 fw-bold mb-2">主題</p>
                    <p className="text-neutral-600 fs-8 pb-2">
                      貓咪的大小事，這裡通通有！
                      每個主題就是一個完整的小天地，專門介紹貓咪生活中的某個面向，像是飲食、健康、行為、訓練等。每個主題裡都有文章、圖片、甚至影片，幫你一次了解所有相關知識。
                      <br />
                      例如：
                      <br />
                      點進「貓咪飲食指南」主題，你會看到：該怎麼選飼料？能不能吃罐頭？要不要加營養品？都整理好了！
                    </p>
                  </div>

                  <div className="my-2">
                    <p className="fs-7 fw-bold mb-2">知識類別</p>
                    <p className="text-neutral-600 fs-8 pb-2">
                      想從哪個方向了解貓咪呢？
                      這是貓咪知識的大地圖，幫你把所有主題分成幾個分類，像是「貓咪飲食指南」、「健康與疾病」、「行為與心理」、「新手貓奴入門」等等。從你最關心的方向開始探索就對了！
                      <br />
                      例如：
                      <br />
                      如果你是新手鏟屎官，點「新手貓奴入門」就能看到像是「如何讓貓適應新環境」、「貓砂盆怎麼選」這些基本但超實用的內容。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 漢堡（篩選 modal） */}
          <img
            src="./images/knowledge/adjustment.svg"
            alt="adjustment"
            className="me-1"
            tabIndex={0}
            role="button"
            data-bs-toggle="modal"
            data-bs-target="#knowledge-list"
          />

          {/* 篩選 Modal */}
          <div
            className="modal fade"
            id="knowledge-list"
            tabIndex={-1}
            aria-labelledby="knowledgeListLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="knowledgeListLabel">
                    設定篩選條件
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  />
                </div>

                <div className="modal-body">
                  <div className="pb-lg-7">
                    <div className="d-flex ps-2 pe-2 align-items-center">
                      <p className="fs-8 pb-1 me-auto">主題</p>
                    </div>

                    <div className="dropdown">
                      <button
                        className="btn dropdown-toggle border text-start text-neutral-500 w-100 py-2 mb-6"
                        type="button"
                        id="dropdownTopicMobile"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {selectedTopic || "選擇主題"}
                      </button>

                      <ul
                        className="dropdown-menu w-100 border-secondary-500 border-3 py-2"
                        aria-labelledby="dropdownTopicMobile"
                      >
                        {topics.map((t) => (
                          <li key={t}>
                            <button
                              type="button"
                              className="dropdown-item border-bottom py-1"
                              // onClick={() =>
                              //   setSelectedTopic(t === "所有主題" ? "" : t)
                              // }
                              onClick={() => setSelectedTopic(t)}
                            >
                              {t}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pb-lg-7">
                    <div className="d-flex ps-2 pe-2 align-items-center">
                      <p className="fs-8 pb-1 me-auto">知識類別</p>
                    </div>

                    <div className="dropdown">
                      <button
                        className="btn dropdown-toggle border text-start text-neutral-500 w-100 py-2"
                        type="button"
                        id="dropdownCategoryMobile"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {selectedCategory || "選擇知識類別"}
                      </button>

                      <ul
                        className="dropdown-menu w-100 border-secondary-500 border-3 py-2"
                        aria-labelledby="dropdownCategoryMobile"
                      >
                        {categories.map((c) => (
                          <li key={c}>
                            <button
                              type="button"
                              className="dropdown-item border-bottom py-1"
                              onClick={() =>
                                setSelectedCategory(
                                  c === "所有知識類別" ? "" : c
                                )
                              }
                            >
                              {c}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn"
                    data-bs-dismiss="modal"
                    onClick={onClear}
                  >
                    <img src="./images/knowledge/trash.svg" alt="trash-icon" />{" "}
                    清除重填
                  </button>

                  {/* 你原本有「篩選」按鈕，這裡其實 state 已經變更就會即時篩選，
                      所以按鈕主要作用是關 modal */}
                  <button
                    type="button"
                    className="btn btn-primary-500 text-white"
                    data-bs-dismiss="modal"
                  >
                    <img
                      src="./images/knowledge/funnel.svg"
                      alt="funnel-icon"
                    />{" "}
                    篩選
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* /mobile modals */}
        </div>
      </div>
    </div>
  );
}

/* -----------------------------
   3) 桌機版左側篩選欄
------------------------------ */
function DesktopFilterSidebar({
  keyword,
  setKeyword,
  topics,
  categories,
  selectedTopic,
  setSelectedTopic,
  selectedCategory,
  setSelectedCategory,
}) {
  const popoverQuickSearch = `
    <p class="fw-bold mb-1">快速搜尋主題</p>
    <p class="mb-2">喵～你在找什麼？只要輸入關鍵字，就能找到想知道的貓咪知識。</p>
    <p class="mb-0">例如：輸入「嘔吐」，會出現「常見貓咪疾病」、「嘔吐原因與處理」等。</p>
  `;

  const popoverTopic = `
    <p class="fw-bold mb-1">主題</p>
    <p class="mb-0">每個主題是一個完整的小天地：飲食、健康、行為、訓練等。</p>
  `;

  const popoverCategory = `
    <p class="fw-bold mb-1">知識類別</p>
    <p class="mb-0">把內容分類成地圖，從你最關心的方向探索即可。</p>
  `;

  return (
    <div className="col-lg-3 col-12 pe-2 pt-7 bg-white d-lg-block d-none">
      <div className="pb-lg-7">
        <div className="d-flex ps-2 pe-2 align-items-center">
          <p className="fs-8 pb-1 me-auto">搜尋主題</p>
          <img
            src="./images/knowledge/info-tip.svg"
            alt="information-circle"
            tabIndex={0}
            role="button"
            data-bs-toggle="popover"
            data-bs-placement="bottom"
            data-bs-trigger="focus"
            data-bs-html="true"
            data-bs-content={popoverQuickSearch}
          />
        </div>

        <input
          type="text"
          className="form-control border-radius contrib-input-heigh"
          id="knowledgeNameDesktop"
          placeholder="＃搜尋文章主題"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </div>

      <div className="pb-lg-7">
        <div className="d-flex ps-2 pe-2 align-items-center">
          <p className="fs-8 pb-1 me-auto">主題</p>
          <img
            src="./images/knowledge/info-tip.svg"
            alt="information-circle"
            tabIndex={0}
            role="button"
            data-bs-toggle="popover"
            data-bs-placement="bottom"
            data-bs-trigger="focus"
            data-bs-html="true"
            data-bs-content={popoverTopic}
          />
        </div>

        <div className="dropdown">
          <button
            className="btn dropdown-toggle border text-start text-neutral-500 w-100 py-2 mb-6"
            type="button"
            id="dropdownTopicDesktop"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {selectedTopic || "選擇主題"}
          </button>

          <ul
            className="dropdown-menu w-100 border-secondary-500 border-3 py-2"
            aria-labelledby="dropdownTopicDesktop"
          >
            {topics.map((t) => (
              <li key={t}>
                <button
                  type="button"
                  className="dropdown-item border-bottom py-1"
                  // onClick={() => setSelectedTopic(t === "所有主題" ? "" : t)}
                  onClick={() => setSelectedTopic(t)}
                >
                  {t}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pb-lg-7">
        <div className="d-flex ps-2 pe-2 align-items-center">
          <p className="fs-8 pb-1 me-auto">知識類別</p>
          <img
            src="./images/knowledge/info-tip.svg"
            alt="information-circle"
            tabIndex={0}
            role="button"
            data-bs-toggle="popover"
            data-bs-placement="bottom"
            data-bs-trigger="focus"
            data-bs-html="true"
            data-bs-content={popoverCategory}
          />
        </div>

        <div className="dropdown">
          <button
            className="btn dropdown-toggle border text-start text-neutral-500 w-100 py-2"
            type="button"
            id="dropdownCategoryDesktop"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {selectedCategory || "選擇知識類別"}
          </button>

          <ul
            className="dropdown-menu w-100 border-secondary-500 border-3 py-2"
            aria-labelledby="dropdownCategoryDesktop"
          >
            {categories.map((c) => (
              <li key={c}>
                <button
                  type="button"
                  className="dropdown-item border-bottom py-1"
                  onClick={() =>
                    setSelectedCategory(c === "所有知識類別" ? "" : c)
                  }
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* -----------------------------
   4) 文章卡片
------------------------------ */
function KnowledgeCard({ article }) {
  return (
    <div className="knowledge-card mt-lg-1 mt-2 ms-2 me-2 mb-3 position-relative">
      <a href={article.href || "#"} className="text-decoration-none text-reset">
        <img src={article.img} alt={article.imgAlt} className="img mb-3" />

        <p className="button border-pill position-absolute top-50 start-50 translate-middle">
          <img
            src="./images/knowledge/newspaper_hover.png"
            className="newspaper-icon"
            alt=""
          />
          <span className="material-symbols-outlined fs-7"> 閱讀全文 </span>
        </p>

        <div className="ms-2 me-2">
          <h5 className="mb-1">{article.title}</h5>
          <p className="fs-8 text-neutral-600 mb-3 truncate-multi">
            {article.excerpt}
          </p>

          <div className="d-flex mb-3 flex-wrap">
            {article.tags.map((tag) => (
              <p
                key={tag}
                className="knowledge-tag fs-8 text-primary-600 border border-primary-600 me-2 mb-2"
              >
                #{tag}
              </p>
            ))}
          </div>
        </div>
      </a>
    </div>
  );
}

/* -----------------------------
   5) 分頁
------------------------------ */
function Pagination({ page, totalPages, setPage }) {
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="m-auto">
      <ul className="d-flex justify-content-center align-items-center">
        <li className="page-item me-2">
          <button
            type="button"
            className="btn knowledge-btn"
            onClick={() => canPrev && setPage(page - 1)}
            disabled={!canPrev}
          >
            <i className="bi bi-chevron-left" />
          </button>
        </li>

        {/* 這裡先簡單顯示 1~totalPages */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <li className="page-item me-2" key={p}>
            <button
              type="button"
              className={`btn knowledge-btn ${
                p === page ? "btn-primary-600 border-0 text-white active" : ""
              }`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          </li>
        ))}

        <li className="page-item">
          <button
            type="button"
            className="btn knowledge-btn"
            onClick={() => canNext && setPage(page + 1)}
            disabled={!canNext}
          >
            <i className="bi bi-chevron-right" />
          </button>
        </li>
      </ul>
    </div>
  );
}

/* -----------------------------
   6) 主頁
------------------------------ */
export default function Knowledge() {
  const [keyword, setKeyword] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("所有主題");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);

  // dropdown 選項 🔥待調整 - 等有時間再來製作互動部分-start🔥
  const topics = [
    "所有主題",
    "貓咪飲食指南",
    "健康與疾病",
    "行為與心理",
    "新手貓奴入門",
  ];

  const categoryMapping = {
    所有主題: [
      // "糧食類型解析",
      // "成份與標籤知識",
      // "換糧指南",
      // "特殊處方糧",
      // "自製食物",
      // "飲水與水分攝取",
      // "健康照護",
      // "常見疾病",
      // "身體警訊",
      // "居家安全",
      // "老貓照護",
      // "急救知識",
      // "行為解讀",
      // "情緒觀察",
      // "行為問題解決",
      // "多貓家庭",
      // "遊戲建議",
      // "紓壓小物",
      // "幼貓照護",
      // "養貓前準備",
      // "初養用品",
      // "環境設置",
      // "日常護理",
      // "科技照護",
    ],
    貓咪飲食指南: [
      "糧食類型解析",
      "成份與標籤知識",
      "換糧指南",
      "特殊處方糧",
      "自製食物",
      "飲水與水分攝取",
    ],
    健康與疾病: [
      "健康照護",
      "常見疾病",
      "身體警訊",
      "居家安全",
      "老貓照護",
      "急救知識",
    ],
    行為與心理: [
      "行為解讀",
      "情緒觀察",
      "行為問題解決",
      "多貓家庭",
      "遊戲建議",
      "紓壓小物",
    ],
    新手貓奴入門: [
      "幼貓照護",
      "養貓前準備",
      "初養用品",
      "環境設置",
      "日常護理",
      "科技照護",
    ],
  };

  // const categories = [
  //   "所有知識類別",
  //   "糧食類型解析",
  //   "成份與標籤知識",
  //   "換糧指南",
  //   "特殊處方糧",
  //   "自製食物",
  //   "飲水與水分攝取",
  //   "情緒觀察",
  //   "多貓家庭",
  //   "養貓前準備",
  // ];

  // dropdown 選項 🔥待調整 - 等有時間再來製作互動部分-end🔥

  // 文章資料陣列

  const articles = db.knowledge;

  const currentCategories = useMemo(() => {
    const list = categoryMapping[selectedTopic] || categoryMapping["所有主題"];
    return ["所有知識類別", ...list];
  }, [selectedTopic]);
  useEffect(() => {
    setSelectedCategory("");
  }, [selectedTopic]);

  // Bootstrap Popover 初始化（桌機 info-tip）
  useEffect(() => {
    const triggers = document.querySelectorAll('[data-bs-toggle="popover"]');
    const instances = Array.from(triggers).map(
      (el) => new Popover(el, { html: true, trigger: "focus" })
    );
    return () => instances.forEach((p) => p.dispose());
  }, []);

  const DEFAULT_TOPIC = "所有主題";
  const DEFAULT_CATEGORY = "";
  const onClear = () => {
    setKeyword("");
    setSelectedTopic(DEFAULT_TOPIC);
    setSelectedCategory(DEFAULT_CATEGORY);
    setPage(1);
  };

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();

    return articles.filter((a) => {
      const matchKeyword =
        !keyword ||
        (a.title + a.excerpt).toLowerCase().includes(keyword.toLowerCase());

      // const matchTopic = !selectedTopic || a.tags.includes(selectedTopic);
      const matchTopic =
        selectedTopic === "所有主題" || !selectedTopic
          ? true
          : a.tags.includes(selectedTopic);

      const matchCategory =
        !selectedCategory || a.tags.includes(selectedCategory);

      return matchKeyword && matchTopic && matchCategory;
    });
  }, [keyword, selectedTopic, selectedCategory]);

  // 分頁示範
  const pageSize = 9;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageClamped = Math.min(page, totalPages);
  const paged = filtered.slice(
    (pageClamped - 1) * pageSize,
    pageClamped * pageSize
  );

  const onBannerSubmit = () => {
    setPage(1);
  };

  return (
    <>
      {/* 1) Banner */}
      <KnowledgeBanner
        keyword={keyword}
        setKeyword={setKeyword}
        onSubmit={onBannerSubmit}
      />

      {/* 2) 原本的section 改成 React 版本 */}
      <section className="bg-secondary-100 pt-lg-11 pb-0 pb-lg-12 pb-11">
        {/* Mobile filter bar */}
        <MobileFilterBar
          keyword={keyword}
          setKeyword={setKeyword}
          topics={topics}
          categories={currentCategories}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          onClear={onClear}
        />

        <div className="container pt-0">
          <div className="row">
            {/* Desktop sidebar */}
            <DesktopFilterSidebar
              keyword={keyword}
              setKeyword={setKeyword}
              topics={topics}
              categories={currentCategories}
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            {/* 文章區 */}

            <div
              className="col-lg-9 col-12 d-flex flex-wrap 
            justify-content-lg-start justify-content-md-start     justify-content-center"
            >
              {paged.map((a) => (
                <KnowledgeCard key={a.id} article={a} />
              ))}

              {/* 分頁 */}
              <div className="w-100">
                <Pagination
                  page={pageClamped}
                  totalPages={totalPages}
                  setPage={setPage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
