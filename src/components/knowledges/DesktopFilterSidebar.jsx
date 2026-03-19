export default function DesktopFilterSidebar({
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
            {selectedTopic || "所有主題"}
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
            {selectedCategory || "所有知識類別"}
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
