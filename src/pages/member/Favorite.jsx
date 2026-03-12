import { Link } from "react-router";
import { useState } from "react";

const mockRecords = [
  {
    id: 1,
    title: "成貓化毛配方乾糧",
    brand: "HILL's 希爾思",
    price: "NT$ 1,000",
    weight: "600g",
    desc: "雞肉 | 穀類粉 | 膠質成分 | 成貓",
    date: "2025-12-01",
    status: "approved",
    statusLabel: "審核通過",
    image: "contrib-history2-1.png",
    targetPath: "/food",
  },
  {
    id: 2,
    title: "雞肉泥罐頭",
    brand: "Sheba 希寶",
    price: "NT$ 1,000",
    weight: "600g",
    desc: "雞肉 | 泥狀 | 凍蛋配方 | 全齡貓",
    date: "2025-11-16",
    status: "pending",
    statusLabel: "審核中",
    image: "contrib-history2-2.png",
    targetPath: "/food",
  },
  {
    id: 3,
    title: "羊肉主食罐",
    brand: "GO! SOLUTIONS",
    price: "NT$ 800",
    weight: "200g",
    desc: "羊肉 | 膠狀 | 改善皮膚&毛髮 | 成貓",
    date: "2025-10-01",
    status: "rejected",
    statusLabel: "未通過",
    image: "contrib-history2-3.png",
    targetPath: "/food",
  },
  {
    id: 4,
    title: "海洋魚泥罐",
    brand: "t",
    price: "NT$ 1,000",
    weight: "600g",
    desc: "海鮮 | 泥狀 | 凍蛋配方 | 幼貓",
    date: "2025-08-16",
    status: "pending",
    statusLabel: "審核中",
    image: "contrib-history2-4.png",
    targetPath: "/food",
  },
  {
    id: 5,
    title: "海鮮佐雞絲主食罐",
    brand: "MIAO LIFE",
    price: "NT$ 720",
    weight: "180g",
    desc: "海鮮 | 肉塊 | 無穀 | 全齡貓",
    date: "2025-07-20",
    status: "approved",
    statusLabel: "審核通過",
    image: "contrib-history1.png",
    targetPath: "/food",
  },
  {
    id: 6,
    title: "雞胸鮪魚主食湯罐",
    brand: "NUTRI CAT",
    price: "NT$ 560",
    weight: "120g",
    desc: "雞肉 | 湯罐 | 腸胃敏感 | 成貓",
    date: "2025-06-11",
    status: "rejected",
    statusLabel: "未通過",
    image: "contrib-history3.png",
    targetPath: "/food",
  },
];

const mockKnowledgeRecords = [
  {
    id: 101,
    title: "如何判斷貓咪是否生氣？",
    excerpt:
      "貓咪雖然不會說話，但牠們肯定能用其他方式表達自己的感受。你的貓咪生氣的時候可能會有一些超明顯的訊號，學會觀察就能更快安撫牠。",
    tags: ["行為與心理", "情緒觀察"],
    date: "2025-12-01",
    status: "pending",
    statusLabel: "審核中",
    image: "know-img1.png",
    targetPath: "/knowledge/article/1",
  },
  {
    id: 102,
    title: "如何閱讀貓糧成分？",
    excerpt:
      "我們都想給貓咪餵食營養豐富的食物，但閱讀貓糧標籤卻並非易事。這篇幫你一次看懂前五項配方與關鍵營養標示。",
    tags: ["貓咪飲食指南", "糧食類型解析"],
    date: "2025-11-16",
    status: "approved",
    statusLabel: "審核通過",
    image: "know-img3.png",
    targetPath: "/knowledge/article/3",
  },
  {
    id: 103,
    title: "貓咪玩具選購指南",
    excerpt:
      "買玩具不只看可愛，還要看互動方式與材質安全。透過狩獵本能分類，快速找到主子願意反覆玩的玩具組合。",
    tags: ["行為與心理", "遊戲建議"],
    date: "2025-10-25",
    status: "rejected",
    statusLabel: "未通過",
    image: "know-img10.png",
    targetPath: "/knowledge/article/10",
  },
  {
    id: 104,
    title: "老年貓照護要點",
    excerpt:
      "熟齡貓在腎臟與關節上會有不同需求，日常飲食、飲水與活動空間安排都需要調整，才能讓牠們維持舒服生活品質。",
    tags: ["健康與疾病", "老貓照護"],
    date: "2025-09-18",
    status: "pending",
    statusLabel: "審核中",
    image: "know-img7.png",
    targetPath: "/knowledge/article/7",
  },
  {
    id: 105,
    title: "貓咪體重管理",
    excerpt:
      "從 BCS 體態評分到每日熱量估算，掌握關鍵數據就能有效減重，避免主子因肥胖增加慢性病風險。",
    tags: ["健康與疾病", "身體警訊"],
    date: "2025-08-02",
    status: "approved",
    statusLabel: "審核通過",
    image: "know-img14.png",
    targetPath: "/knowledge/article/14",
  },
  {
    id: 106,
    title: "貓咪壓力管理",
    excerpt:
      "環境改變、作息混亂都會讓貓咪長期緊繃。這篇整理可執行的減壓做法，幫助主子恢復穩定與安全感。",
    tags: ["行為與心理", "情緒觀察"],
    date: "2025-06-11",
    status: "rejected",
    statusLabel: "未通過",
    image: "know-img15.png",
    targetPath: "/knowledge/article/15",
  },
];

function Favorite() {
  const memberImageBaseUrl = `${import.meta.env.BASE_URL}images/member/`;
  const knowledgeImageBaseUrl = `${import.meta.env.BASE_URL}images/knowledge/`;
  const [sortBy, setSortBy] = useState("newest");
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);
  const [knowledgeSortBy, setKnowledgeSortBy] = useState("newest");
  const [knowledgeSearchTerm, setKnowledgeSearchTerm] = useState("");
  const [knowledgeVisibleCount, setKnowledgeVisibleCount] = useState(4);

  const sortOptions = [
    { key: "newest", label: "最新投稿" },
    { key: "oldest", label: "最舊投稿" },
  ];

  const filteredRecords = mockRecords.filter((record) =>
    `${record.title}${record.brand}${record.desc}`
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase())
  );

  const sortedRecords = [...filteredRecords].sort((a, b) => {
    const aDate = new Date(a.date).getTime();
    const bDate = new Date(b.date).getTime();
    return sortBy === "newest" ? bDate - aDate : aDate - bDate;
  });

  const visibleRecords = sortedRecords.slice(0, visibleCount);
  const hasMore = visibleCount < sortedRecords.length;

  const filteredKnowledgeRecords = mockKnowledgeRecords.filter((record) =>
    `${record.title}${record.excerpt}${(record.tags ?? []).join("")}`
      .toLowerCase()
      .includes(knowledgeSearchTerm.trim().toLowerCase())
  );

  const sortedKnowledgeRecords = [...filteredKnowledgeRecords].sort((a, b) => {
    const aDate = new Date(a.date).getTime();
    const bDate = new Date(b.date).getTime();
    return knowledgeSortBy === "newest" ? bDate - aDate : aDate - bDate;
  });

  const visibleKnowledgeRecords = sortedKnowledgeRecords.slice(0, knowledgeVisibleCount);
  const hasMoreKnowledge = knowledgeVisibleCount < sortedKnowledgeRecords.length;

  return (
    <>
      <h2 className="fs-4 pb-8 border-bottom border-secondary-300 mb-6 mt-6">膳食珍藏紀錄</h2>
      <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap member-record-toolbar">
        <div className="justify-content-center member-record-search-wrap">
          <form className="position-relative w-100 record-search">
            <input
              type="text"
              className="form-control rounded-pill py-2 ps-3 pe-5"
              placeholder="搜尋珍藏紀錄"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setVisibleCount(4);
              }}
            />
            <i
              className="bi bi-search text-neutral-500 position-absolute end-0 top-50 translate-middle-y me-2 d-flex align-items-center justify-content-center me-2"
              style={{ fontSize: "1.2rem" }}
            />
          </form>
        </div>

        <div className="dropdown ms-auto flex-shrink-0">
          <button
            type="button"
            className="btn btn-neutral-100 py-1 px-3 d-flex align-items-center text-nowrap"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="material-symbols-outlined me-1">tune</span>
            <span>排序依據</span>
          </button>

          <ul className="dropdown-menu dropdown-menu-end mt-2 py-1 shadow-sm member-sort-menu">
            {sortOptions.map((option) => (
              <li key={option.key}>
                <button
                  type="button"
                  className="dropdown-item d-flex align-items-center"
                  onClick={() => {
                    setSortBy(option.key);
                    setVisibleCount(4);
                  }}
                >
                  <i
                    className={`bi bi-check-lg me-2 ${sortBy === option.key ? "" : "invisible"}`}
                  />
                  <span>{option.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="row row-cols-2 g-3 mt-1 member-record-grid">
        {visibleRecords.map((record) => (
          <div key={record.id} className="col">
            <Link to={record.targetPath} className="text-decoration-none text-reset d-block h-100">
              <article className="member-record-card bg-white h-100">
                <img
                  src={`${memberImageBaseUrl}${record.image}`}
                  alt={record.title}
                  className="w-100 member-record-card-image"
                />

                <div className="p-3 pb-2 member-record-card-body">
                  <div className="d-flex justify-content-between align-items-start gap-2 mb-2">
                    <h3 className="member-record-card-title mb-0">{record.title}</h3>
                    <p className="member-record-brand mb-0 text-nowrap">{record.brand}</p>
                  </div>

                  <div className="d-flex gap-4 mb-2">
                    <div>
                      <p className="member-record-label mb-1">每罐價格</p>
                      <p className="member-record-value mb-0">{record.price}</p>
                    </div>
                    <div>
                      <p className="member-record-label mb-1">重量</p>
                      <p className="member-record-value mb-0">{record.weight}</p>
                    </div>
                  </div>

                  <p className="member-record-desc mb-0">{record.desc}</p>
                </div>

                <div className="member-record-footer d-flex justify-content-between align-items-center p-3 pt-2">
                  <p className="member-record-date mb-0">{record.date}</p>
                </div>
              </article>
            </Link>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-5">
          <button
            type="button"
            className="btn btn-neutral-100 rounded-pill px-4 py-2 member-load-more"
            onClick={() => setVisibleCount((prev) => prev + 4)}
          >
            <i className="bi bi-arrow-repeat me-2" />
            載入更多珍藏紀錄
          </button>
        </div>
      )}

      <h2 className="fs-4 pb-8 border-bottom border-secondary-300 mb-6 mt-10">專欄珍藏紀錄</h2>

      <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap member-record-toolbar">
        <div className="justify-content-center member-record-search-wrap">
          <form className="position-relative w-100 record-search">
            <input
              type="text"
              className="form-control rounded-pill py-2 ps-3 pe-5"
              placeholder="搜尋珍藏紀錄"
              value={knowledgeSearchTerm}
              onChange={(e) => {
                setKnowledgeSearchTerm(e.target.value);
                setKnowledgeVisibleCount(4);
              }}
            />
            <i
              className="bi bi-search text-neutral-500 position-absolute end-0 top-50 translate-middle-y me-2 d-flex align-items-center justify-content-center me-2"
              style={{ fontSize: "1.2rem" }}
            />
          </form>
        </div>

        <div className="dropdown ms-auto flex-shrink-0">
          <button
            type="button"
            className="btn btn-neutral-100 py-1 px-3 d-flex align-items-center text-nowrap"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <span className="material-symbols-outlined me-1">tune</span>
            <span>排序依據</span>
          </button>

          <ul className="dropdown-menu dropdown-menu-end mt-2 py-1 shadow-sm member-sort-menu">
            {sortOptions.map((option) => (
              <li key={`knowledge-sort-${option.key}`}>
                <button
                  type="button"
                  className="dropdown-item d-flex align-items-center"
                  onClick={() => {
                    setKnowledgeSortBy(option.key);
                    setKnowledgeVisibleCount(4);
                  }}
                >
                  <i
                    className={`bi bi-check-lg me-2 ${knowledgeSortBy === option.key ? "" : "invisible"}`}
                  />
                  <span>{option.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="row row-cols-2 g-3 mt-1 member-record-grid">
        {visibleKnowledgeRecords.map((record) => (
          <div key={record.id} className="col">
            <Link to={record.targetPath} className="text-decoration-none text-reset d-block h-100">
              <article className="member-record-card bg-white h-100">
                <img
                  src={`${knowledgeImageBaseUrl}${record.image}`}
                  alt={record.title}
                  className="w-100 member-knowledge-record-card-image"
                />

                <div className="p-3 pb-2 member-record-card-body">
                  <h3 className="member-knowledge-record-card-title mb-2">{record.title}</h3>
                  <p className="member-knowledge-record-excerpt mb-3">{record.excerpt}</p>

                  <div className="d-flex gap-2 flex-wrap mb-2">
                    {(record.tags ?? []).map((tag) => (
                      <span key={`${record.id}-${tag}`} className="member-knowledge-tag">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="member-record-footer d-flex justify-content-between align-items-center p-3 pt-2">
                  <p className="member-record-date mb-0">{record.date}</p>
                </div>
              </article>
            </Link>
          </div>
        ))}
      </div>

      {hasMoreKnowledge && (
        <div className="text-center mt-5">
          <button
            type="button"
            className="btn btn-neutral-100 rounded-pill px-4 py-2 member-load-more"
            onClick={() => setKnowledgeVisibleCount((prev) => prev + 4)}
          >
            <i className="bi bi-arrow-repeat me-2" />
            載入更多珍藏紀錄
          </button>
        </div>
      )}
    </>
  );
}

export default Favorite;
