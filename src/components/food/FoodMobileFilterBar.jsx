function FoodMobileFilterBar({ foodMeta, filters, onFilterChange, onClear }) {
  const selectedLabel = (items, selectedId, fallback) =>
    items.find((item) => item.id === selectedId)?.name ?? fallback;

  return (
    <div className="col-12 pt-1 pb-1 mb-1 d-lg-none d-block bg-white food-mobile-filter">
      <div className="container pt-2 pb-2">
        <div className="position-relative d-flex justify-content-center align-items-center ps-2 pe-2">
          <p className="fs-8 pb-1 mb-0 text-center">篩選食品</p>

          <button
            type="button"
            className="btn p-0 border-0 bg-transparent text-neutral-600 position-absolute end-0"
            data-bs-toggle="modal"
            data-bs-target="#food-filter-modal"
            aria-label="開啟食品篩選"
          >
            <i className="bi bi-sliders fs-5" />
          </button>
        </div>
      </div>

      <div
        className="modal fade"
        id="food-filter-modal"
        tabIndex={-1}
        aria-labelledby="foodFilterModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="foodFilterModalLabel">
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
              <div className="pb-4">
                <p className="fs-8 pb-1 mb-2">口味種類</p>
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle border text-start text-neutral-500 w-100 py-2"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {selectedLabel(foodMeta.flavors ?? [], filters.flavorId, "全部口味")}
                  </button>
                  <ul className="dropdown-menu w-100 border-secondary-500 border-3 py-2">
                    <li>
                      <button
                        type="button"
                        className="dropdown-item border-bottom py-1"
                        onClick={() => onFilterChange("flavorId", null)}
                      >
                        全部口味
                      </button>
                    </li>
                    {(foodMeta.flavors ?? []).map((item) => (
                      <li key={`mobile-flavor-${item.id}`}>
                        <button
                          type="button"
                          className="dropdown-item border-bottom py-1"
                          onClick={() => onFilterChange("flavorId", item.id)}
                        >
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pb-4">
                <p className="fs-8 pb-1 mb-2">內容物類別</p>
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle border text-start text-neutral-500 w-100 py-2"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {selectedLabel(
                      foodMeta.contentTypes ?? [],
                      filters.contentTypeId,
                      "全部內容物"
                    )}
                  </button>
                  <ul className="dropdown-menu w-100 border-secondary-500 border-3 py-2">
                    <li>
                      <button
                        type="button"
                        className="dropdown-item border-bottom py-1"
                        onClick={() => onFilterChange("contentTypeId", null)}
                      >
                        全部內容物
                      </button>
                    </li>
                    {(foodMeta.contentTypes ?? []).map((item) => (
                      <li key={`mobile-content-${item.id}`}>
                        <button
                          type="button"
                          className="dropdown-item border-bottom py-1"
                          onClick={() => onFilterChange("contentTypeId", item.id)}
                        >
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pb-4">
                <p className="fs-8 pb-1 mb-2">特殊配方</p>
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle border text-start text-neutral-500 w-100 py-2"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {selectedLabel(
                      foodMeta.specialFormulas ?? [],
                      filters.specialFormulaId,
                      "全部配方"
                    )}
                  </button>
                  <ul className="dropdown-menu w-100 border-secondary-500 border-3 py-2">
                    <li>
                      <button
                        type="button"
                        className="dropdown-item border-bottom py-1"
                        onClick={() => onFilterChange("specialFormulaId", null)}
                      >
                        全部配方
                      </button>
                    </li>
                    {(foodMeta.specialFormulas ?? []).map((item) => (
                      <li key={`mobile-formula-${item.id}`}>
                        <button
                          type="button"
                          className="dropdown-item border-bottom py-1"
                          onClick={() => onFilterChange("specialFormulaId", item.id)}
                        >
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <p className="fs-8 pb-1 mb-2">適合年齡</p>
                <div className="dropdown">
                  <button
                    className="btn dropdown-toggle border text-start text-neutral-500 w-100 py-2"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {selectedLabel(foodMeta.targets ?? [], filters.targetId, "全部年齡")}
                  </button>
                  <ul className="dropdown-menu w-100 border-secondary-500 border-3 py-2">
                    <li>
                      <button
                        type="button"
                        className="dropdown-item border-bottom py-1"
                        onClick={() => onFilterChange("targetId", null)}
                      >
                        全部年齡
                      </button>
                    </li>
                    {(foodMeta.targets ?? []).map((item) => (
                      <li key={`mobile-target-${item.id}`}>
                        <button
                          type="button"
                          className="dropdown-item border-bottom py-1"
                          onClick={() => onFilterChange("targetId", item.id)}
                        >
                          {item.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn" data-bs-dismiss="modal" onClick={onClear}>
                清除重填
              </button>
              <button
                type="button"
                className="btn btn-primary-500 text-white"
                data-bs-dismiss="modal"
              >
                套用篩選
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodMobileFilterBar;
