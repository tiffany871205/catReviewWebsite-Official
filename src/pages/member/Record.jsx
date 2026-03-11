function Record() {
  return (
    <div className="member-tab-pane px-2 px-md-12 fade show active">
      <div>
        <form className="needs-validation" noValidate>
          <div className="d-flex align-items-baseline pb-3 pb-md-8 border-bottom border-secondary-300 mb-3 mb-md-8">
            <h3 className="me-3 neutral-900 d-none d-md-block">1. 專欄資訊</h3>
            <h5 className="me-3 neutral-900 d-block d-md-none">1. 專欄資訊</h5>
            <p>
              <span className="neutral-600">(</span>
              <span className="text-highlight">*</span>
              <span className="neutral-600">為必填欄位)</span>
            </p>
          </div>
          <div className="mb-3 mb-md-8">
            <label htmlFor="columnTitle" className="w-100">
              <p className="px-2 d-flex mb-1 mb-md-2">
                <span className="contrib-font-size-sm neutral-900">1. 標題名稱</span>
                <span className="contrib-font-size-sm text-highlight ms-1">*</span>
                <span className="contrib-font-size-xs text-highlight ms-auto">必填</span>
              </p>
              <div>
                <input
                  type="text"
                  className="form-control border-radius contrib-input-heigh px-4"
                  id="columnTitle"
                  placeholder="請輸入文章標題（例如: 如何改善貓咪挑食問題）"
                  required
                />
                <p className="invalid-feedback px-2 mt-2">
                  請輸入文章標題（例如: 如何改善貓咪挑食問題）
                </p>
              </div>
            </label>
          </div>
          <div className="mb-3 mb-md-8">
            <label htmlFor="columnAbstract" className="w-100">
              <p className="px-2 d-flex mb-1 mb-md-2">
                <span className="contrib-font-size-sm neutral-900">
                  2. 文章摘要（簡短介紹該文章內容）
                </span>
                <span className="contrib-font-size-sm text-highlight">*</span>
                <span className="contrib-font-size-xs text-highlight ms-auto">必填</span>
              </p>
              <div>
                <input
                  type="text"
                  className="form-control border-radius contrib-input-heigh px-4"
                  id="columnAbstract"
                  placeholder="請輸入文章摘要（總字數不得少於20字，不得多於100字）"
                  required
                />
                <p className="invalid-feedback px-2 mt-2">
                  請輸入文章摘要（總字數不得少於20字，不得多於100字）
                </p>
              </div>
            </label>
          </div>
          <div className="mb-3 mb-md-8">
            <label htmlFor="topicSelect" className="w-100">
              <p className="px-2 d-flex mb-1 mb-md-2">
                <span className="contrib-font-size-sm neutral-900">4. 選擇文章主題</span>
                <span className="contrib-font-size-sm text-highlight ms-1">*</span>
                <span className="contrib-font-size-xs text-highlight ms-auto">必填</span>
              </p>
              <div>
                <select
                  id="topicSelect"
                  className="form-select border-radius contrib-input-heigh px-4"
                  aria-label="Default select example"
                  required
                  defaultValue=""
                >
                  <option value="">請選擇</option>
                  <option value="Diet">貓咪飲食指南</option>
                  <option value="Health">健康與疾病</option>
                  <option value="Behavior">行為與心理</option>
                  <option value="Ownership">新手貓奴入門</option>
                  <option value="Others">其他</option>
                </select>
                <p className="invalid-feedback px-2 mt-2">請選擇文章主題</p>
              </div>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Record;
