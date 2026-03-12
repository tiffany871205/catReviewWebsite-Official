import { useLocation, useNavigate } from "react-router";
import { useState } from "react";
import MemberEmptyState from "../../components/member/MemberEmptyState";

const mockCommentRecords = [
  {
    id: 1,
    foodName: "雞+南瓜主食罐",
    rating: 3,
    date: "2026-03-12T09:00:00",
    relativeTime: "3分鐘前",
    content:
      "我家貓原本腸胃有點敏感，換季時很容易軟便。試了這款「雞+南瓜主食罐」開罐皮薄、南瓜的比例剛好，不會太甜，肉塊也很實在。現在每天都會混一點在乾飼料裡，吃得超乾淨！",
    photos: ["contrib-history2-1.png", "contrib-history2-2.png"],
    targetPath: "/knowledge/article/1",
  },
  {
    id: 2,
    foodName: "雞肉泥罐頭",
    rating: 3,
    date: "2026-03-08T10:00:00",
    relativeTime: "4個月前",
    content:
      "我家老貓打了不打，這款主食罐的熟度對他來說剛剛好。雞肉很細嫩，南瓜也不會太濕，吃完不會有油膩感。觀察一個月後，精神變得更好，體態也比較穩定。",
    photos: ["contrib-history2-3.png", "contrib-history2-4.png"],
    targetPath: "/knowledge/article/2",
  },
  {
    id: 3,
    foodName: "羊肉主食罐",
    rating: 5,
    date: "2026-03-02T10:00:00",
    relativeTime: "10個月前",
    content:
      "夏天貓咪食慾真的特別差，本來每天都要擔心牠只吃兩口就走人。但這款雞+南瓜主食罐完全是我們的救星！拌在乾乾裡之後，整碗瞬間變得滑順又香氣明顯，尤其南瓜纖維口感更順胃，也更容易入口。原本半推半就，現在幾乎次次都清碗。",
    photos: [
      "contrib-history1.png",
      "contrib-history3.png",
      "contrib-history4.png",
      "contrib-history2.png",
    ],
    canExpand: true,
    targetPath: "/knowledge/article/3",
  },
  {
    id: 4,
    foodName: "海洋魚泥罐",
    rating: 3,
    date: "2025-01-01T09:00:00",
    relativeTime: "2025-01-01 09:00",
    content:
      "挑食貓終於找到願意吃的主食罐了！雞肉味道很香，打開就會跑來喵喵。質地介於濕泥跟肉絲之間，挺好拌。吃了兩週，毛髮變亮、排便也比較規律，應該會回購。",
    photos: [],
    targetPath: "/knowledge/article/4",
  },
  {
    id: 5,
    foodName: "海鮮佐雞絲主食罐",
    rating: 4,
    date: "2024-12-22T12:30:00",
    relativeTime: "1年前",
    content:
      "這款主食罐我會搭配少量溫水一起餵，適口性比預期好很多。家裡原本很挑嘴的主子連續吃了幾天都沒有抗拒，便便狀況也穩定，之後會再回購不同口味試試。",
    photos: ["contrib-history2.png", "contrib-history4.png"],
    targetPath: "/knowledge/article/5",
  },
  {
    id: 6,
    foodName: "雞胸鮪魚主食湯罐",
    rating: 2,
    date: "2024-11-05T08:20:00",
    relativeTime: "1年前",
    content:
      "香味不錯，但我家貓吃到後段就興趣下降，需要和其他肉泥交替餵才會吃完。優點是成分標示清楚、開罐方便，保存也不會太麻煩，整體算中規中矩。",
    photos: ["contrib-history1.png"],
    targetPath: "/knowledge/article/6",
  },
];

const mockKnowledgeCommentRecords = [
  {
    id: 101,
    articleTitle: "如何判斷貓咪是否生氣？",
    rating: 4,
    date: "2026-03-10T10:00:00",
    relativeTime: "2天前",
    content:
      "以前以為炸毛才是生氣，看完這篇才知道尾巴節奏和耳朵角度也很關鍵，現在比較能分辨主子是緊張還是不耐煩。",
    targetPath: "/knowledge/article/1",
  },
  {
    id: 102,
    articleTitle: "各式糧食類型大解析",
    rating: 5,
    date: "2026-03-01T08:00:00",
    relativeTime: "11天前",
    content:
      "乾糧、濕糧和凍乾的比較整理得很清楚，尤其是不同年齡層的餵食建議很實用，讓我換糧時比較不焦慮。",
    targetPath: "/knowledge/article/2",
  },
  {
    id: 103,
    articleTitle: "如何閱讀貓糧成分？",
    rating: 4,
    date: "2026-02-26T09:00:00",
    relativeTime: "2週前",
    content:
      "原本看到標籤一堆英文就放棄，這篇把常見成分拆解得很直白，現在挑罐頭至少知道先看前五項。",
    targetPath: "/knowledge/article/3",
  },
  {
    id: 104,
    articleTitle: "關於貓爪的10個有趣事情",
    rating: 3,
    date: "2026-02-22T09:00:00",
    relativeTime: "3週前",
    content: "內容輕鬆好讀，原來肉墊真的會協助散熱。雖然偏知識小品，但很適合新手快速吸收。",
    targetPath: "/knowledge/article/4",
  },
  {
    id: 105,
    articleTitle: "貓咪玩具選購指南：從狩獵本能到環境豐富化一次搞懂超完整懶人版",
    rating: 5,
    date: "2026-02-15T15:00:00",
    relativeTime: "4週前",
    content: "這篇直接救了我，買玩具不再亂買，改成輪替制後主子每天都會主動玩，夜間暴衝也明顯減少。",
    targetPath: "/knowledge/article/10",
  },
  {
    id: 106,
    articleTitle: "貓咪壓力管理",
    rating: 4,
    date: "2026-02-10T11:00:00",
    relativeTime: "1個月前",
    content: "搬家後貓咪一直躲床底，看完照著做建立固定躲藏點和氣味交換，恢復速度比預期快很多。",
    targetPath: "/knowledge/article/15",
  },
];

function Comment() {
  const navigate = useNavigate();
  const location = useLocation();
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
  const memberImageBaseUrl = `${import.meta.env.BASE_URL}images/member/`;

  // 空狀態預覽開關：?empty=all|food|knowledge。
  const emptyPreview = new URLSearchParams(location.search).get("empty");
  const forceFoodEmpty = emptyPreview === "all" || emptyPreview === "food";
  const forceKnowledgeEmpty = emptyPreview === "all" || emptyPreview === "knowledge";
  const foodCommentBaseRecords = forceFoodEmpty ? [] : mockCommentRecords;
  const knowledgeCommentBaseRecords = forceKnowledgeEmpty ? [] : mockKnowledgeCommentRecords;

  const hasFoodCommentBase = foodCommentBaseRecords.length > 0;
  const hasKnowledgeCommentBase = knowledgeCommentBaseRecords.length > 0;
  const hasAnyCommentRecord = hasFoodCommentBase || hasKnowledgeCommentBase;

  // 全頁資料都不存在時，顯示整頁空狀態
  if (!hasAnyCommentRecord) {
    const isAllEmptyPreview = emptyPreview === "all";

    return (
      <MemberEmptyState
        title="您無任何留言評分項目"
        buttonText={isAllEmptyPreview ? "繼續探索" : "前往探索"}
        to={isAllEmptyPreview ? "/index" : "/food"}
      />
    );
  }

  // 上半區塊（膳食留言）搜尋
  const filteredRecords = foodCommentBaseRecords.filter((record) =>
    `${record.foodName}${record.content}`.toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const sortedRecords = [...filteredRecords].sort((a, b) => {
    const aDate = new Date(a.date).getTime();
    const bDate = new Date(b.date).getTime();
    return sortBy === "newest" ? bDate - aDate : aDate - bDate;
  });

  const visibleRecords = sortedRecords.slice(0, visibleCount);
  const hasMore = visibleCount < sortedRecords.length;

  // 下半區塊（專欄留言）搜尋
  const filteredKnowledgeRecords = knowledgeCommentBaseRecords.filter((record) =>
    `${record.articleTitle}${record.content}`
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
      {/* 區塊一：膳食留言評分紀錄 */}
      {/* 這是電腦版：區塊標題 */}
      <h2 className="d-none d-lg-block fs-4 pb-8 border-bottom border-secondary-300 mb-6 mt-6">
        膳食留言評分紀錄
      </h2>

      {/* 這是手機板：區塊標題與排序按鈕 */}
      <div className="d-flex d-lg-none justify-content-between align-items-center pb-3 border-bottom border-secondary-300 mb-3 mt-6">
        <h2 className="fs-6 mb-0">膳食留言評分紀錄</h2>
        <div className="dropdown ms-2 flex-shrink-0">
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
              <li key={`mobile-food-comment-sort-${option.key}`}>
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
      {hasFoodCommentBase ? (
        <>
          {/* 這是電腦版：搜尋與排序工具列 */}
          <div className="d-none d-lg-flex justify-content-between align-items-center gap-3 member-record-toolbar">
            <div className="justify-content-center w-100 member-record-search-wrap">
              <form className="position-relative w-100 record-search">
                <input
                  type="text"
                  className="form-control rounded-pill py-2 ps-3 pe-5"
                  placeholder="搜尋留言評分紀錄"
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
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

          {/* 這是手機板：搜尋列 */}
          <div className="d-lg-none member-record-toolbar mb-3">
            <div className="member-record-search-wrap">
              <form className="position-relative w-100 record-search member-record-search-mobile">
                <input
                  type="text"
                  className="form-control rounded-pill py-2 ps-3 pe-5"
                  placeholder="搜尋留言評分紀錄"
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                    setVisibleCount(4);
                  }}
                />
                <i
                  className="bi bi-search text-neutral-500 position-absolute end-0 top-50 translate-middle-y me-2 d-flex align-items-center justify-content-center me-2"
                  style={{ fontSize: "1.2rem" }}
                />
              </form>
            </div>
          </div>

          {filteredRecords.length === 0 ? (
            <MemberEmptyState
              compact
              title="找不到符合條件的膳食留言"
              buttonText="清除篩選"
              showIllustration={false}
              onAction={() => {
                setSearchTerm("");
                setVisibleCount(4);
              }}
            />
          ) : (
            <>
              <div className="row row-cols-1 row-cols-lg-2 g-3 mt-2 mb-6">
                {visibleRecords.map((record) => {
                  const visiblePhotos = record.photos.slice(0, 3);
                  const photoOverflowCount = record.photos.length - visiblePhotos.length;

                  return (
                    <div key={record.id} className="col">
                      <article
                        className="member-comment-card h-100 bg-white p-4"
                        role="link"
                        tabIndex={0}
                        // 只是一個暫時的路徑
                        onClick={() => navigate(record.targetPath)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            navigate(record.targetPath);
                          }
                        }}
                      >
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h3 className="fs-5 mb-1">{record.foodName}</h3>
                            <p className="fs-8 text-neutral-500 mb-0">{record.relativeTime}</p>
                          </div>
                        </div>

                        <p className="member-comment-content mb-0">{record.content}</p>

                        {visiblePhotos.length > 0 && (
                          <div className="member-comment-gallery mt-3">
                            {visiblePhotos.map((photo, index) => {
                              const showOverflow =
                                index === visiblePhotos.length - 1 && photoOverflowCount > 0;

                              return (
                                <div
                                  key={`${record.id}-photo-${photo}`}
                                  className="member-comment-photo-wrap"
                                >
                                  <img
                                    src={`${memberImageBaseUrl}${photo}`}
                                    alt={`${record.foodName}-評論圖片-${index + 1}`}
                                    className="member-comment-photo"
                                  />
                                  {/* 圖片超過上限顯示 */}
                                  {showOverflow && (
                                    <span className="member-comment-photo-overlay">
                                      +{photoOverflowCount}
                                    </span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </article>
                    </div>
                  );
                })}
              </div>

              {hasMore && (
                <div className="text-center my-3">
                  <button
                    type="button"
                    className="rounded-pill px-3 py-1 member-load-more text-neutral-700"
                    onClick={() => setVisibleCount((prev) => prev + 4)}
                  >
                    <i className="bi bi-arrow-repeat me-1 text-secondary-300" />
                    載入更多留言紀錄
                  </button>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <MemberEmptyState compact title="您尚未新增膳食留言評分" buttonText="前往探索" to="/food" />
      )}

      {/* 這是電腦版：區塊標題 */}
      <h2 className="d-none d-lg-block fs-4 pb-8 border-bottom border-secondary-300 mb-6 mt-10">
        專欄留言評分紀錄
      </h2>

      {/* 這是手機板：區塊標題與排序按鈕 */}
      <div className="d-flex d-lg-none justify-content-between align-items-center pb-3 border-bottom border-secondary-300 mb-3 mt-10">
        <h2 className="fs-6 mb-0">專欄留言評分紀錄</h2>
        <div className="dropdown ms-2 flex-shrink-0">
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
              <li key={`mobile-knowledge-comment-sort-${option.key}`}>
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
      {/* 區塊二：專欄留言評分紀錄 */}

      {hasKnowledgeCommentBase ? (
        <>
          {/* 這是電腦版：搜尋與排序工具列 */}
          <div className="d-none d-lg-flex justify-content-between align-items-center gap-3 member-record-toolbar">
            <div className="justify-content-center w-100 member-record-search-wrap">
              <form className="position-relative w-100 record-search">
                <input
                  type="text"
                  className="form-control rounded-pill py-2 ps-3 pe-5"
                  placeholder="搜尋留言評分紀錄"
                  value={knowledgeSearchTerm}
                  onChange={(event) => {
                    setKnowledgeSearchTerm(event.target.value);
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
                  <li key={`knowledge-${option.key}`}>
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

          {/* 這是手機板：搜尋列 */}
          <div className="d-lg-none member-record-toolbar mb-3">
            <div className="member-record-search-wrap">
              <form className="position-relative w-100 record-search member-record-search-mobile">
                <input
                  type="text"
                  className="form-control rounded-pill py-2 ps-3 pe-5"
                  placeholder="搜尋留言評分紀錄"
                  value={knowledgeSearchTerm}
                  onChange={(event) => {
                    setKnowledgeSearchTerm(event.target.value);
                    setKnowledgeVisibleCount(4);
                  }}
                />
                <i
                  className="bi bi-search text-neutral-500 position-absolute end-0 top-50 translate-middle-y me-2 d-flex align-items-center justify-content-center me-2"
                  style={{ fontSize: "1.2rem" }}
                />
              </form>
            </div>
          </div>

          {filteredKnowledgeRecords.length === 0 ? (
            <MemberEmptyState
              compact
              title="找不到符合條件的專欄留言"
              buttonText="清除篩選"
              showIllustration={false}
              onAction={() => {
                setKnowledgeSearchTerm("");
                setKnowledgeVisibleCount(4);
              }}
            />
          ) : (
            <>
              <div className="row row-cols-1 row-cols-lg-2 g-3 mt-2 member-comment-grid">
                {visibleKnowledgeRecords.map((record) => (
                  <div key={record.id} className="col">
                    <article
                      className="member-comment-card h-100 bg-white p-4"
                      role="link"
                      tabIndex={0}
                      onClick={() => navigate(record.targetPath)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          navigate(record.targetPath);
                        }
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-start mb-2">
                        <div className="w-100">
                          <h3 className="member-comment-name member-comment-title-one-line mb-1">
                            {record.articleTitle}
                          </h3>
                          <p className="member-comment-time mb-0">{record.relativeTime}</p>
                        </div>
                      </div>

                      <p className="member-comment-content mb-0">{record.content}</p>
                    </article>
                  </div>
                ))}
              </div>

              {hasMoreKnowledge && (
                <div className="text-center mt-5">
                  <button
                    type="button"
                    className="rounded-pill px-3 py-1 member-load-more text-neutral-700"
                    onClick={() => setKnowledgeVisibleCount((prev) => prev + 4)}
                  >
                    <i className="bi bi-arrow-repeat me-1 text-secondary-300" />
                    載入更多留言紀錄
                  </button>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <MemberEmptyState
          compact
          title="您尚未新增專欄留言評分"
          buttonText="前往學堂"
          to="/knowledge"
        />
      )}
    </>
  );
}

export default Comment;
