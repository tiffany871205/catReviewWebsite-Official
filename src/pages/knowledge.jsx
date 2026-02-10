// import { useState } from "react";
// import { Modal, Popover } from "bootstrap";

// function KnowledgeBanner() {
//   const [keyword, setKeyword] = useState("");

//   /*1-1. banner部分 - 搜尋框 🔥🔥🔥 */
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`你搜尋的是：${keyword}`); // 先用 alert 立即確認有沒有觸發
//   };
//   /*1-1. banner部分 - 搜尋框 🔥🔥 */

//   return (
//     <>
//       {/*1. banner部分*/}
//       <section className="knowledge-banner">
//         <div className="container">
//           <div className="row justify-content-lg-end">
//             <div className="col-lg-4 col-12">
//               <div className="d-flex flex-column">
//                 <img
//                   src="public/images/index/section02_decoration.svg"
//                   alt="deco"
//                   className="mb-lg-10 mb-6 align-self-center"
//                 />

//                 {/* 桌機版標題 */}
//                 <img
//                   src="public/images/knowledge/knowledge-banner-title.png"
//                   alt="banner-title"
//                   className="mb-lg-5 align-self-center d-lg-block d-none"
//                 />

//                 {/* 手機版標題 */}
//                 <img
//                   src="public/images/knowledge/rwdknowledge-banner-title.png"
//                   alt="banner-title"
//                   className="mb-2 align-self-center d-lg-none d-block"
//                 />

//                 <h1 className="fs-lg-5 fs-7 mb-lg-10 mb-6 text-secondary-100 align-self-center">
//                   讓你更懂你的喵皇！
//                 </h1>
//               </div>

//               <div className="justify-content-center w-100">
//                 <form
//                   onSubmit={handleSubmit}
//                   className="position-relative w-100"
//                 >
//                   <input
//                     type="text"
//                     className="form-control rounded-pill py-2 ps-3 pe-5"
//                     placeholder="＃搜尋文章主題"
//                     value={keyword}
//                     onChange={(e) => setKeyword(e.target.value)}
//                   />
//                   <button
//                     className="btn btn-primary-600 rounded position-absolute end-0 top-50 translate-middle-y me-2 d-flex align-items-center justify-content-center"
//                     type="submit"
//                   >
//                     <i
//                       className="bi bi-search text-white"
//                       style={{ fontSize: "1.2rem" }}
//                     ></i>
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       123
//     </>
//   );
// }

// export default function Knowledge() {
//   return (
//     <>
//       <KnowledgeBanner /> {/* 在這裡呼叫上面的 Banner */}
//       <div className="container mt-5">
//         <h1>我是專欄區內容</h1>
//         <p>這裡可以放文章列表...</p>
//       </div>
//     </>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import { Popover } from "bootstrap";

/**
 * 注意：
 * 1) 你要確保有載入 bootstrap 的 JS（bootstrap.bundle.min.js）
 *    才能讓 Modal / Popover 的 data-bs-* 生效
 * 2) React 裡 public 的圖片路徑通常用 "/assets/..." 或 "/images/..."
 *    你原本 "../assets/..." 建議改成 "/assets/..."
 */

/* -----------------------------
   1) 上方 Banner（你前面那段改成可控 props 版本）
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
                  src="public/images/index/section02_decoration.svg"
                  alt="deco"
                  className="mb-lg-10 mb-6 align-self-center"
                />

                {/* 桌機版標題 */}
                <img
                  src="public/images/knowledge/knowledge-banner-title.png"
                  alt="banner-title"
                  className="mb-lg-5 align-self-center d-lg-block d-none"
                />

                {/* 手機版標題 */}
                <img
                  src="public/images/knowledge/rwdknowledge-banner-title.png"
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
   2) 手機版篩選列（含：用途說明 modal + 篩選 modal）
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
            src="public/images/knowledge/info-tip.svg"
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
            src="public/images/knowledge/adjustment.svg"
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
                              onClick={() =>
                                setSelectedTopic(t === "所有主題" ? "" : t)
                              }
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
                    <img
                      src="public/images/knowledge/trash.svg"
                      alt="trash-icon"
                    />{" "}
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
                      src="public/images/knowledge/funnel.svg"
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
   3) 桌機版左側篩選欄（含 popover）
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
            src="public/images/knowledge/info-tip.svg"
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
            src="public/images/knowledge/info-tip.svg"
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
                  onClick={() => setSelectedTopic(t === "所有主題" ? "" : t)}
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
            src="public/images/knowledge/info-tip.svg"
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
            src="public/images/knowledge/newspaper_hover.png"
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
   5) 分頁（示範 UI，邏輯簡化：你可接 API）
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
   6) 主頁：合併所有元件 + 共用狀態（不衝突的關鍵）
------------------------------ */
export default function Knowledge() {
  // 共用狀態：banner / sidebar / mobile 都吃同一份
  const [keyword, setKeyword] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [page, setPage] = useState(1);

  // 你的 dropdown 選項
  const topics = [
    "所有主題",
    "貓咪飲食指南",
    "健康與疾病",
    "行為與心理",
    "新手貓奴入門",
  ];
  const categories = [
    "所有知識類別",
    "糧食類型解析",
    "成份與標籤知識",
    "換糧指南",
    "特殊處方糧",
    "自製食物",
    "飲水與水分攝取",
    "情緒觀察",
    "多貓家庭",
    "養貓前準備",
  ];

  // 文章資料陣列（可以換成 API 回來的 list）
  const articles = [
    {
      id: 1,
      title: "如何判斷貓咪是否生氣？",
      excerpt:
        "貓咪雖然不會說話，但牠們肯定能用其他方式表達自己的感受。你的貓咪生氣的時候可能會有一些超明顯的...",
      topicId: 3,
      categoryId: 302,
      tags: ["行為與心理", "情緒觀察"],
      img: "public/images/knowledge/know-img1.png",
      herf: "#",
      createdAt: "2026-01-01",
      updatedAt: "2026-01-01",
    },
    {
      id: 2,
      title: "各式糧食類型大解析",
      excerpt:
        "市面貓糧種類繁多，乾糧、濕糧、生食、冷凍乾燥差在哪？掌握各類糧食特色、優缺，才能為毛孩挑...",
      topicId: 1,
      categoryId: 101,
      tags: ["貓咪飲食指南", "糧食類型解析"],
      img: "public/images/knowledge/know-img2.png",
      herf: "#",
      createdAt: "2026-01-02",
      updatedAt: "2026-01-02",
    },
    {
      id: 3,
      title: "如何閱讀貓糧成分？",
      excerpt:
        "我們都想給貓咪餵食營養豐富的食物，但閱讀貓糧標籤卻並非易事。市售貓糧包裝上琳瑯滿目，真相其實...",
      topicId: 1,
      categoryId: 102,
      tags: ["貓咪飲食指南", "成份與標籤知識"],
      img: "public/images/knowledge/know-img3.png",
      herf: "#",
      createdAt: "2026-01-03",
      updatedAt: "2026-01-03",
    },
    {
      id: 4,
      title: "關於貓爪的10個有趣事情",
      excerpt:
        "貓咪真是奇妙的生物。牠們那雙靈活的爪子除了伸縮自如，竟然還是排汗的管道？讓我們揭開肉墊...",
      topicId: 3,
      categoryId: 301,
      tags: ["行為與心理", "行為解讀"],
      img: "public/images/knowledge/know-img4.png",
      herf: "#",
      createdAt: "2026-01-04",
      updatedAt: "2026-01-04",
    },
    {
      id: 5,
      title: "貓咪肢體語言解密",
      excerpt:
        "從尾巴、耳朵到鬍鬚，每個小動作都在傳達不同的訊息。學會解讀這些訊號，你就能更了解主子在...",
      topicId: 3,
      categoryId: 301,
      tags: ["行為與心理", "行為解讀"],
      img: "public/images/knowledge/know-img5.png",
      herf: "#",
      createdAt: "2026-01-05",
      updatedAt: "2026-01-05",
    },
    {
      id: 6,
      title: "幼貓照護指南",
      excerpt:
        "剛帶回家的小奶貓又萌又脆弱！從飲食代奶、環境安全到健康疫苗管理，新手貓奴必看的成...",
      topicId: 4,
      categoryId: 401,
      tags: ["新手貓奴入門", "幼貓照護"],
      img: "public/images/knowledge/know-img6.png",
      herf: "#",
      createdAt: "2026-01-06",
      updatedAt: "2026-01-06",
    },
    {
      id: 7,
      title: "老年貓照護要點",
      excerpt:
        "貓咪進入熟齡期後，身體需求大不同。了解腎臟、關節等常見問題，陪主子優雅老去是貓奴最重要...",
      topicId: 2,
      categoryId: 205,
      tags: ["健康與疾病", "老貓照護"],
      img: "public/images/knowledge/know-img7.png",
      herf: "#",
      createdAt: "2026-01-07",
      updatedAt: "2026-01-07",
    },
    {
      id: 8,
      title: "貓咪行為問題解決法",
      excerpt:
        "亂尿尿、破壞家具、半夜暴走？這些行為背後都有原因。找出問題根源，用對方法，才能跟主子...",
      topicId: 3,
      categoryId: 303,
      tags: ["行為與心理", "行為問題解決"],
      img: "public/images/knowledge/know-img8.png",
      herf: "#",
      createdAt: "2026-01-08",
      updatedAt: "2026-01-08",
    },
    {
      id: 9,
      title: "多貓家庭和諧指南",
      excerpt:
        "新貓加入該如何隔離？如何分配貓砂盆資源？讓每隻貓都有自己的空間，打造不打架的多貓幸福...",
      topicId: 3,
      categoryId: 304,
      tags: ["行為與心理", "多貓家庭"],
      img: "public/images/knowledge/know-img9.png",
      herf: "#",
      createdAt: "2026-01-09",
      updatedAt: "2026-01-09",
    },
    {
      id: 10,
      title: "貓咪玩具選購指南",
      excerpt:
        "買了一堆玩具，主子卻只愛紙箱？選對玩具不只能讓貓咪開心，還能消耗精力。這篇教你如何根據狩獵本能挑選最適合的玩具！",
      topicId: 3,
      categoryId: 305,
      tags: ["行為與心理", "遊戲建議"],
      img: "public/images/knowledge/know-img9.png",
      herf: "#",
      createdAt: "2026-01-10",
      updatedAt: "2026-01-10",
    },
    {
      id: 11,
      title: "貓砂選擇全解析",
      excerpt:
        "豆腐砂、礦砂、木屑砂怎麼選？沒有完美的貓砂，只有最適合你和主子的選擇。這篇幫你分析各種貓砂優缺點，告別粉塵與異味！",
      topicId: 4,
      categoryId: 402,
      tags: ["新手貓奴入門", "初養用品"],
      img: "public/images/knowledge/know-img9.png",
      herf: "#",
      createdAt: "2026-01-11",
      updatedAt: "2026-01-11",
    },
    {
      id: 12,
      title: "貓咪疫苗接種指南",
      excerpt:
        "疫苗是保護貓咪健康的重要防線。貓三合一、狂犬病哪些必打？多久補強一次？這篇一次帶你了解核心與非核心疫苗的差異。",
      topicId: 2,
      categoryId: 201,
      tags: ["健康與疾病", "健康照護"],
      img: "public/images/knowledge/know-img9.png",
      herf: "#",
      createdAt: "2026-01-12",
      updatedAt: "2026-01-12",
    },
    {
      id: 13,
      title: "貓咪口腔保健",
      excerpt:
        "80%的成貓都有牙齒問題！口臭不只是味道難聞，更可能影響心腎功能。學習正確的刷牙與居家照護，讓主子擁有一口好牙。",
      topicId: 2,
      categoryId: 201,
      tags: ["健康與疾病", "健康照護"],
      img: "public/images/knowledge/know-img9.png",
      herf: "#",
      createdAt: "2026-01-13",
      updatedAt: "2026-01-13",
    },
    {
      id: 14,
      title: "貓咪體重管理",
      excerpt:
        "肥貓雖然可愛，但糖尿病與關節炎更可怕！教你如何透過 BCS 評分判斷貓咪體態，並制定科學的減重計畫，守護主子健康。",
      topicId: 2,
      categoryId: 203,
      tags: ["健康與疾病", "身體警訊"],
      img: "public/images/knowledge/know-img9.png",
      herf: "#",
      createdAt: "2026-01-14",
      updatedAt: "2026-01-14",
    },
    {
      id: 15,
      title: "貓咪壓力管理",
      excerpt:
        "搬家、新成員、作息變動都可能讓敏感的貓咪壓力爆表。辨識過度理毛等壓力訊號，提供安全的躲藏空間，打造紓壓低敏環境。",
      topicId: 3,
      categoryId: 302,
      tags: ["行為與心理", "情緒觀察"],
      img: "public/images/knowledge/know-img9.png",
      herf: "#",
      createdAt: "2026-01-15",
      updatedAt: "2026-01-15",
    },
    {
      id: 16,
      title: "貓咪常見疾病預防",
      excerpt:
        "預防勝於治療！深入了解泌尿系統疾病、慢性腎病與糖尿病的徵兆。7歲以上老貓如何透過定期健檢及早發現病灶？",
      topicId: 2,
      categoryId: 202,
      tags: ["健康與疾病", "常見疾病"],
      img: "public/images/knowledge/know-img9.png",
      herf: "#",
      createdAt: "2026-01-16",
      updatedAt: "2026-01-16",
    },
    {
      id: 17,
      title: "貓咪美容照護",
      excerpt:
        "梳毛不只是美觀，還能預防毛球症。這篇提供梳毛、剪指甲、清眼耳的完整攻略，讓主子在日常美容中感受到滿滿的愛。",
      topicId: 4,
      categoryId: 404,
      tags: ["新手貓奴入門", "環境設置"],
      img: "public/images/knowledge/know-img9.png",
      herf: "#",
      createdAt: "2026-01-17",
      updatedAt: "2026-01-17",
    },
    {
      id: 18,
      title: "新手養貓準備清單",
      excerpt:
        "決定養貓了卻不知從何下手？從食碗材質選擇、貓砂盆擺放位置到居家環境安全檢查，這份清單幫你一次搞定！",
      topicId: 4,
      categoryId: 402,
      tags: ["新手貓奴入門", "初養用品"],
      img: "public/images/knowledge/know-img9.png",
      herf: "#",
      createdAt: "2026-01-18",
      updatedAt: "2026-01-18",
    },
    {
      id: 19,
      title: "貓咪外出減壓與訓練",
      excerpt:
        "出門看醫生總是像打仗？透過減敏訓練讓貓咪愛上提籠。從外出的安全胸背帶挑選，到建立熟悉的外出儀式，讓旅行不再恐懼。",
      topicId: 4,
      categoryId: 403,
      tags: ["新手貓奴入門", "外出準備"],
      img: "public/images/knowledge/know-img8.png",
      herf: "#",
      createdAt: "2026-01-19",
      updatedAt: "2026-01-19",
    },
    {
      id: 20,
      title: "居家有毒植物大清查",
      excerpt:
        "百合、黃金葛竟是貓咪殺手？許多常見居家綠植對貓具備致命毒性。這篇教你辨識危險植物，並推薦適合貓咪啃食的室內綠化方案。",
      topicId: 2,
      categoryId: 204,
      tags: ["健康與疾病", "居家安全"],
      img: "public/images/knowledge/know-img8.png",
      herf: "#",
      createdAt: "2026-01-20",
      updatedAt: "2026-01-20",
    },
    {
      id: 21,
      title: "貓咪急救入門手冊",
      excerpt:
        "當主子意外誤食或哈姆立克急救時該怎麼辦？掌握黃金救治時間，學會基礎的心肺復甦術與傷口止血處理，是每位稱職貓奴的必修課。",
      topicId: 2,
      categoryId: 206,
      tags: ["健康與疾病", "急救知識"],
      img: "public/images/knowledge/know-img8.png",
      herf: "#",
      createdAt: "2026-01-21",
      updatedAt: "2026-01-21",
    },
    {
      id: 22,
      title: "貓草、貓薄荷與木天蓼",
      excerpt:
        "為什麼有的貓對貓薄荷沒反應？深入解析這些「貓界大麻」的原理與差異。正確給予紓壓小物，能有效緩解貓咪焦慮並增加運動量。",
      topicId: 3,
      categoryId: 306,
      tags: ["行為與心理", "紓壓小物"],
      img: "public/images/knowledge/know-img8.png",
      herf: "#",
      createdAt: "2026-01-22",
      updatedAt: "2026-01-22",
    },
    {
      id: 23,
      title: "垂直空間與環境豐富化",
      excerpt:
        "地坪大小不是重點，高度才是！利用貓跳台、牆面層板打造「貓咪高速公路」，能顯著減少多貓衝突並提升室內貓的心理健康。",
      topicId: 4,
      categoryId: 404,
      tags: ["新手貓奴入門", "環境設置"],
      img: "public/images/knowledge/know-img8.png",
      herf: "#",
      createdAt: "2026-01-23",
      updatedAt: "2026-01-23",
    },
    {
      id: 24,
      title: "智能寵物用品挑選心得",
      excerpt:
        "自動餵食器、智能貓砂盆真的好用嗎？分析科技產品在遠端照護上的優勢，以及在使用時可能被忽略的衛生與安全細節。",
      topicId: 4,
      categoryId: 405,
      tags: ["新手貓奴入門", "科技照護"],
      img: "public/images/knowledge/know-img8.png",
      herf: "#",
      createdAt: "2026-01-24",
      updatedAt: "2026-01-24",
    },
    {
      id: 25,
      title: "貓咪換毛季應對全書",
      excerpt:
        "一年兩次的換毛大戰又要開始了？除了勤快吸地，如何透過飲食調整減少廢毛產生，並正確選用梳具防止貓咪因舔毛過度引發腸胃阻塞。",
      topicId: 2,
      categoryId: 203,
      tags: ["健康與疾病", "日常照護"],
      img: "public/images/knowledge/know-img8.png",
      herf: "#",
      createdAt: "2026-01-25",
      updatedAt: "2026-01-25",
    },
    {
      id: 26,
      title: "解讀貓咪的呼嚕聲",
      excerpt:
        "呼嚕聲不代表一定開心？受傷或疼痛時，貓咪也會透過低頻震動來自我療癒。深入研究貓咪獨特的生理頻率與其傳達的情緒密碼。",
      topicId: 3,
      categoryId: 301,
      tags: ["行為與心理", "行為解讀"],
      img: "public/images/knowledge/know-img8.png",
      herf: "#",
      createdAt: "2026-01-26",
      updatedAt: "2026-01-26",
    },
    {
      id: 27,
      title: "如何幫貓咪剪指甲不流血",
      excerpt:
        "剪指甲像打仗？這篇教你如何辨識指甲裡的「快肉（Quick）」，配合適當的零食獎勵與保定技巧，讓主子乖乖配合修剪不再掙扎。",
      topicId: 4,
      categoryId: 404,
      tags: ["新手貓奴入門", "日常護理"],
      img: "public/images/knowledge/know-img8.png",
      herf: "#",
      createdAt: "2026-01-27",
      updatedAt: "2026-01-27",
    },
  ];

  // Bootstrap Popover 初始化（桌機 info-tip）
  useEffect(() => {
    const triggers = document.querySelectorAll('[data-bs-toggle="popover"]');
    const instances = Array.from(triggers).map(
      (el) => new Popover(el, { html: true, trigger: "focus" })
    );
    return () => instances.forEach((p) => p.dispose());
  }, []);

  const onClear = () => {
    setKeyword("");
    setSelectedTopic("");
    setSelectedCategory("");
    setPage(1);
  };

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();

    return articles.filter((a) => {
      const matchKeyword =
        !k ||
        (a.title + " " + a.excerpt + " " + a.tags.join(" "))
          .toLowerCase()
          .includes(k);

      const matchTopic = !selectedTopic || a.topic === selectedTopic;
      const matchCategory =
        !selectedCategory || a.category === selectedCategory;

      return matchKeyword && matchTopic && matchCategory;
    });
  }, [articles, keyword, selectedTopic, selectedCategory]);

  // 分頁示範
  const pageSize = 9;
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageClamped = Math.min(page, totalPages);
  const paged = filtered.slice(
    (pageClamped - 1) * pageSize,
    pageClamped * pageSize
  );

  const onBannerSubmit = () => {
    // 你原本用 alert 確認觸發：這裡保留也行
    // alert(`你搜尋的是：${keyword}`);
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

      {/* 2) 你提供的 section 改成 React 版本 */}
      <section className="bg-secondary-100 pt-lg-11 pb-0 pb-lg-12 pb-11">
        {/* Mobile filter bar */}
        <MobileFilterBar
          keyword={keyword}
          setKeyword={setKeyword}
          topics={topics}
          categories={categories}
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
              categories={categories}
              selectedTopic={selectedTopic}
              setSelectedTopic={setSelectedTopic}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />

            {/* 文章區 */}

            <div className="col-lg-9 col-12 d-flex justify-content-center flex-wrap">
              {paged.map((a) => (
                <KnowledgeCard key={a.id} article={a} />
              ))}

              {/* 分頁 */}
              <Pagination
                page={pageClamped}
                totalPages={totalPages}
                setPage={setPage}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
