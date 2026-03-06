export default function MobileFilterBar({
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

          {/* 功能用途說明的 icons */}
          <img
            src="./images/knowledge/info-tip.svg"
            alt="information-circle"
            className="mx-1"
            tabIndex={0}
            role="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          />

          {/* 用途說明的 Modal */}
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
                      貓咪的大小事，這裡通通有！每個主題就是一個完整的小天地，專門介紹貓咪生活中的某個面向，像是飲食、健康、行為、訓練等。
                    </p>
                  </div>

                  <div className="my-2">
                    <p className="fs-7 fw-bold mb-2">知識類別</p>
                    <p className="text-neutral-600 fs-8 pb-2">
                      這是貓咪知識的大地圖，幫你把所有主題分成幾個分類，像是「貓咪飲食指南」、「健康與疾病」、「行為與心理」、「新手貓奴入門」等等。
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 漢堡選單的篩選 Modal） */}
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
                        {selectedTopic || "所有主題"}
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
                        {selectedCategory || "所有知識類別"}
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
        </div>
      </div>
    </div>
  );
}
