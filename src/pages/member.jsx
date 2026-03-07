import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import db from "../../db.seed.json";
import KnowledgeCard from "../components/knowledges/KnowledgeCard";

function Member() {
  const navigate = useNavigate();
  const location = useLocation();
  const getTabFromHash = (hash) => (hash === "#record" ? "record" : "account");
  const activeTab = getTabFromHash(location.hash);
  const isAccountTab = activeTab === "account";
  const isRecordTab = activeTab === "record";

  const handleTabClick = (tab) => {
    navigate(`/member#${tab}`);
  };

  useEffect(() => {
    const queryTab = new URLSearchParams(location.search).get("tab");

    if (queryTab === "account" || queryTab === "record") {
      navigate(`/member#${queryTab}`, { replace: true });
    }
  }, [location.search, navigate]);

  // const article = db?.knowledge?.[0];

  // if (!article) return null;

  return (
    <>
      {/* <KnowledgeCard article={article} />; */}
      <div class="d-lg-flex">
        {/* <!-- 投稿選單: lg --> */}
        <div class="d-none d-lg-block member-side-menu member-position-relative">
          <ul
            class="nav d-flex flex-column justify-content-center align-items-center"
            id="myTab"
            role="tablist"
          >
            {/* <!-- 帳號管理按鍵 --> */}
            <li class="nav-item w-100" role="presentation">
              <button
                class={`nav-link p-3 w-100 text-start d-flex align-center ${
                  isAccountTab ? "active" : ""
                }`}
                id="account-tab"
                data-bs-toggle="tab"
                data-bs-target="#account"
                type="button"
                role="tab"
                aria-controls="account"
                aria-selected={isAccountTab}
                onClick={() => handleTabClick("account")}
              >
                <span class="me-3 tab-icon"></span>
                <span>帳號管理</span>
              </button>
            </li>
            {/* <!-- 會員紀錄按鍵 --> */}
            <li class="nav-item w-100" role="presentation">
              <button
                class={`nav-link p-3 w-100 text-start d-flex align-center ${
                  isRecordTab ? "active" : ""
                }`}
                id="record-tab"
                data-bs-toggle="tab"
                data-bs-target="#record"
                type="button"
                role="tab"
                aria-controls="record"
                aria-selected={isRecordTab}
                onClick={() => handleTabClick("record")}
              >
                <span class="me-3 tab-icon"></span>
                <span>會員紀錄</span>
              </button>
            </li>
          </ul>
        </div>
        {/* <!-- 投稿選單: sm --> */}
        <div class="d-block d-lg-none contrib-top-menu contrib-position-relative">
          <ul
            class="nav d-flex justify-content-center align-items-center"
            id="myTab"
            role="tablist"
          >
            {/* <!-- 帳號管理按鍵 --> */}
            <li class="nav-item" role="presentation">
              <button
                class={`nav-link px-5 py-3 w-100 text-start d-flex align-center ${
                  isAccountTab ? "active" : ""
                }`}
                id="account-tab"
                data-bs-toggle="tab"
                data-bs-target="#account"
                type="button"
                role="tab"
                aria-controls="account"
                aria-selected={isAccountTab}
                onClick={() => handleTabClick("account")}
              >
                <span class="me-3 tab-icon"></span>
                <span>帳號管理</span>
              </button>
            </li>
            {/* <!-- 會員紀錄按鍵 --> */}
            <li class="nav-item" role="presentation">
              <button
                class={`nav-link px-5 py-3 w-100 text-start d-flex align-center ${
                  isRecordTab ? "active" : ""
                }`}
                id="record-tab"
                data-bs-toggle="tab"
                data-bs-target="#record"
                type="button"
                role="tab"
                aria-controls="record"
                aria-selected={isRecordTab}
                onClick={() => handleTabClick("record")}
              >
                <span class="me-3 tab-icon"></span>
                <span>會員紀錄</span>
              </button>
            </li>
          </ul>
        </div>
        {/* <!-- 撰寫投稿 --> */}
        <div class="member-tab-content bg-secondary-100 py-12" id="myTabContent">
          {/* <!-- 帳號管理頁面 --> */}
          <div
            class={`member-tab-pane px-2 px-md-12 fade ${isAccountTab ? "show active" : ""}`}
            id="account"
          >
            <form class="needs-validation" novalidate>
              {/* <!-- １. 基本資訊 --> */}
              <div class="mb-11 mb-md-12">
                <div class="d-flex align-items-baseline pb-3 pb-md-8 border-bottom border-secondary-300 mb-3 mb-md-8">
                  <h3 class="me-3 neutral-900 d-none d-md-block">１. 基本資訊</h3>
                  <h5 class="me-3 neutral-900 d-block d-md-none">１. 基本資訊</h5>
                  <p>
                    <span class="neutral-600">(</span>
                    <span class="text-highlight">*</span>
                    <span class="neutral-600">為必填欄位)</span>
                  </p>
                </div>
                <div class="mb-3 mb-md-8">
                  <label for="foodName" class="w-100">
                    <p class="px-2 d-flex mb-1 mb-md-2">
                      <span class="contrib-font-size-sm neutral-900">食品名稱</span>
                      <span class="contrib-font-size-sm text-highlight ms-1">*</span>
                      <span class="contrib-font-size-xs text-highlight ms-auto">必填</span>
                    </p>
                    <div>
                      <input
                        type="text"
                        class="form-control border-radius contrib-input-heigh px-4"
                        id="foodName"
                        placeholder="請輸入食品名稱"
                        required
                      />
                      <p class="invalid-feedback px-2 mt-2">請輸入食品名稱</p>
                    </div>
                  </label>
                </div>
              </div>
            </form>
          </div>
          {/* <!-- 會員紀錄頁面 --> */}
          <div
            class={`member-tab-pane px-2 px-md-12 fade ${isRecordTab ? "show active" : ""}`}
            id="record"
          >
            {/* <!-- １. 專欄資訊 --> */}
            <div>
              <form class="needs-validation" novalidate method="POST" action="/submit">
                <div class="d-flex align-items-baseline pb-3 pb-md-8 border-bottom border-secondary-300 mb-3 mb-md-8">
                  <h3 class="me-3 neutral-900 d-none d-md-block">１. 專欄資訊</h3>
                  <h5 class="me-3 neutral-900 d-block d-md-none">１. 專欄資訊</h5>
                  <p>
                    <span class="neutral-600">(</span>
                    <span class="text-highlight">*</span>
                    <span class="neutral-600">為必填欄位)</span>
                  </p>
                </div>
                <div class="mb-3 mb-md-8">
                  <label for="columnTitle" class="w-100">
                    <p class="px-2 d-flex mb-1 mb-md-2">
                      <span class="contrib-font-size-sm neutral-900">1. 標題名稱</span>
                      <span class="contrib-font-size-sm text-highlight ms-1">*</span>
                      <span class="contrib-font-size-xs text-highlight ms-auto">必填</span>
                    </p>
                    <div>
                      <input
                        type="text"
                        class="form-control border-radius contrib-input-heigh px-4"
                        id="columnTitle"
                        placeholder="請輸入文章標題（例如: 如何改善貓咪挑食問題）"
                        required
                      />
                      <p class="invalid-feedback px-2 mt-2">
                        請輸入文章標題（例如: 如何改善貓咪挑食問題）
                      </p>
                    </div>
                  </label>
                </div>
                <div class="mb-3 mb-md-8">
                  <label for="columnAbstract" class="w-100">
                    <p class="px-2 d-flex mb-1 mb-md-2">
                      <span class="contrib-font-size-sm neutral-900">
                        2. 文章摘要（簡短介紹該文章內容）
                      </span>
                      <span class="contrib-font-size-sm text-highlight">*</span>
                      <span class="contrib-font-size-xs text-highlight ms-auto">必填</span>
                    </p>
                    <div>
                      <input
                        type="text"
                        class="form-control border-radius contrib-input-heigh px-4"
                        id="columnAbstract"
                        placeholder="請輸入文章摘要（總字數不得少於20字，不得多於100字）"
                        required
                      />
                      <p class="invalid-feedback px-2 mt-2">
                        請輸入文章摘要（總字數不得少於20字，不得多於100字）
                      </p>
                    </div>
                  </label>
                </div>
                <div class="mb-3 mb-md-8">
                  <label for="topicSelect" class="w-100">
                    <p class="px-2 d-flex mb-1 mb-md-2">
                      <span class="contrib-font-size-sm neutral-900">4. 選擇文章主題</span>
                      <span class="contrib-font-size-sm text-highlight ms-1">*</span>
                      <span class="contrib-font-size-xs text-highlight ms-auto">必填</span>
                    </p>
                    <div>
                      <select
                        id="topicSelect"
                        class="form-select border-radius contrib-input-heigh px-4"
                        aria-label="Default select example"
                        required
                      >
                        <option value="" selected>
                          請選擇
                        </option>
                        <option value="Diet">貓咪飲食指南</option>
                        <option value="Health">健康與疾病</option>
                        <option value="Behavior">行為與心理</option>
                        <option value="Ownership">新手貓奴入門</option>
                        <option value="Others">其他</option>
                      </select>
                      <p class="invalid-feedback px-2 mt-2">請選擇文章主題</p>
                    </div>
                  </label>
                </div>
                <div class="mb-3 mb-md-8">
                  <label for="categorySelect" class="w-100">
                    <p class="px-2 d-flex mb-1 mb-md-2">
                      <span class="contrib-font-size-sm neutral-900">
                        5. 選擇上述主題的知識類別
                      </span>
                      <span class="contrib-font-size-sm text-highlight ms-1">*</span>
                      <span class="contrib-font-size-xs text-highlight ms-auto">必填</span>
                    </p>
                    <div>
                      <select
                        id="categorySelect"
                        class="form-select border-radius contrib-input-heigh px-4"
                        aria-label="Default select example"
                        required
                      >
                        <option value="" selected>
                          請選擇
                        </option>
                      </select>
                      <p class="invalid-feedback px-2 mt-2">請選擇文章主題的知識類別</p>
                    </div>
                  </label>
                </div>
                <div class="mb-3 mb-md-8">
                  <label for="infoSource" class="w-100">
                    <p class="px-2 d-flex mb-1 mb-md-2">
                      <span class="contrib-font-size-sm neutral-900">6. 資料來源</span>
                      <span class="contrib-font-size-xs neutral-600 ms-auto">選填</span>
                    </p>
                    <div>
                      <input
                        type="url"
                        class="form-control border-radius contrib-input-heigh px-4"
                        id="infoSource"
                        placeholder="請列出文章參考資料來源（例如: 網站連結）"
                      />
                    </div>
                  </label>
                </div>
                <div class="mb-11 mb-md-12">
                  <p class="px-2 d-flex mb-1 mb-md-2">
                    <span class="contrib-font-size-sm neutral-900">9. 聲明欄位</span>
                    <span class="contrib-font-size-sm text-highlight ms-1">*</span>
                    <span class="contrib-font-size-xs text-highlight ms-auto">必填</span>
                  </p>
                  <div id="columnPublicationSpeciForm">
                    <label class="btn align-center columnPublicationSpeci px-3 py-2">
                      <input type="checkbox" id="agreeColumnCheckbox" disabled />
                      我已閱讀並同意平台審核且遵守
                      <a
                        href="#"
                        class="text-secondary-800 text-decoration-none font-weight-bold"
                        data-bs-toggle="modal"
                        data-bs-target="#columnPublicationSpeci"
                      >
                        刊登規範
                      </a>
                    </label>
                  </div>
                </div>
                {/* <!-- 提交&清除表單欄位 --> */}
                <div class="d-flex justify-content-between justify-content-md-none">
                  <button
                    class="btn btn-border contrib-delete-btn ms-md-auto d-flex align-items-center justify-content-center px-md-3"
                    type="reset"
                  >
                    <img class="me-2" src="../assets/images/contrib/trash.png" alt="trash" />
                    <span class="text-neutral-700">清除重填</span>
                  </button>
                  <button
                    class="btn btn-border contrib-submit-btn ms-md-4 d-flex align-items-center justify-content-center px-md-12"
                    type="submit"
                  >
                    <img
                      class="me-2"
                      src="../assets/images/contrib/paper-airplane.png"
                      alt="paper-airplane"
                    />
                    <span class="text-white">送出投稿</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Member;
