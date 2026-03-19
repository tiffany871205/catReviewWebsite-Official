import React, { useEffect, useRef } from "react";
import { Popover } from "bootstrap";

const decoration1 = `${import.meta.env.BASE_URL}images/food/Decoration1.png`;

function FoodAside({ foodMeta, filters, onFilterChange }) {
  const popoverRef = useRef(null);

  useEffect(() => {
    if (!popoverRef.current) return undefined;

    const popover = new Popover(popoverRef.current, {
      customClass: "food-popover",
      placement: "top",
      trigger: "focus",
    });

    return () => {
      popover.dispose();
    };
  }, []);

  const renderDropdown = ({ label, items, filterKey, selectedId }) => (
    <div className="dropdown pb-7">
      <button
        className="btn-outline-primary rounded-pill food-dropdown dropdown-toggle ps-4"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        {items.find((item) => item.id === selectedId)?.name ?? label}
      </button>
      <ul className="dropdown-menu food-dropdown-menu">
        <li>
          <button
            type="button"
            className="dropdown-item"
            onClick={() => onFilterChange(filterKey, null)}
          >
            全部
          </button>
        </li>
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className="dropdown-item"
              onClick={() => onFilterChange(filterKey, item.id)}
            >
              {item.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <aside className="food-aside">
      <nav className="food-aside-nav">
        <img src={decoration1} alt="deco" />

        <div className="px-6 pt-60 pb-7">
          <div className="d-flex justify-content-between align-items-center ">
            <p className="ms-2">搜尋食品</p>

            <button
              ref={popoverRef}
              type="button"
              className="food-info-btn"
              id="myPopover"
              data-bs-toggle="popover"
              title="快速搜尋食品"
              data-bs-content="喵～你在找什麼？這裡是你的小幫手，只要輸入關鍵字，就能馬上找到你想知道 的貓咪食品。不管是「品牌名稱」還是「特定成分名稱」，輸入一下就幫你找到相關食品！"
            >
              <i className="bi bi-info-circle food-info-icon" />
            </button>
          </div>
          <div className="food_searchbg">
            <div className="navbar navbar-light">
              <div className="rounded-pill ">
                <form className="d-flex">
                  <input
                    className="form-control py-2 food-form"
                    type="search"
                    placeholder="#搜尋食品"
                    aria-label="Search"
                  />
                  <button className="btn food_searchbtn" type="submit">
                    <i className="bi bi-search" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6">
          <p className="ms-2 pb-2">口味種類</p>
          {renderDropdown({
            label: "口味種類",
            items: foodMeta.flavors ?? [],
            filterKey: "flavorId",
            selectedId: filters.flavorId,
          })}
        </div>

        <div className="px-6">
          <p className="ms-2 pb-2">內容物類別</p>
          {renderDropdown({
            label: "內容物類別",
            items: foodMeta.contentTypes ?? [],
            filterKey: "contentTypeId",
            selectedId: filters.contentTypeId,
          })}
        </div>

        <div className="px-6">
          <p className="ms-2 pb-2">特殊配方</p>
          {renderDropdown({
            label: "特殊配方",
            items: foodMeta.specialFormulas ?? [],
            filterKey: "specialFormulaId",
            selectedId: filters.specialFormulaId,
          })}
        </div>

        <div className="px-6">
          <p className="ms-2 pb-2">適合年齡</p>
          {renderDropdown({
            label: "適合年齡",
            items: foodMeta.targets ?? [],
            filterKey: "targetId",
            selectedId: filters.targetId,
          })}
        </div>
      </nav>
    </aside>
  );
}

export default FoodAside;
