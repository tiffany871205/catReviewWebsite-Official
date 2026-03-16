import React, { useEffect, useRef } from "react";
import { Popover } from "bootstrap";
import decoration1 from "../../assets/images/food/Decoration1.png";

function FoodAside() {
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
          <div className="dropdown pb-7  ">
            <button
              className="btn-outline-primary rounded-pill food-dropdown dropdown-toggle "
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              口味種類
            </button>
            <ul className="dropdown-menu food-dropdown-menu">
              <li><a className="dropdown-item" href="#">雞肉</a></li>
              <li><a className="dropdown-item" href="#">牛肉</a></li>
              <li><a className="dropdown-item" href="#">鴨肉</a></li>
              <li><a className="dropdown-item" href="#">羊肉</a></li>
              <li><a className="dropdown-item" href="#">海鮮</a></li>
              <li><a className="dropdown-item" href="#">火雞肉</a></li>
              <li><a className="dropdown-item" href="#">鹿肉</a></li>
              <li><a className="dropdown-item" href="#">其他</a></li>
            </ul>
          </div>
        </div>

        <div className="px-6">
          <p className="ms-2 pb-2">內容物類別</p>
          <div className="dropdown pb-7">
            <button
              className="btn-outline-primary rounded-pill food-dropdown dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              內容物類別
            </button>
            <ul className="dropdown-menu food-dropdown-menu">
              <li><a className="dropdown-item" href="#">泥狀</a></li>
              <li><a className="dropdown-item" href="#">肉塊</a></li>
              <li><a className="dropdown-item" href="#">膠狀</a></li>
              <li><a className="dropdown-item" href="#">湯罐</a></li>
              <li><a className="dropdown-item" href="#">乾飼料</a></li>
            </ul>
          </div>
        </div>

        <div className="px-6">
          <p className="ms-2 pb-2">特殊配方</p>
          <div className="dropdown pb-7">
            <button
              className="btn-outline-primary rounded-pill food-dropdown dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              特殊配方
            </button>
            <ul className="dropdown-menu food-dropdown-menu">
              <li><a className="dropdown-item" href="#">無</a></li>
              <li><a className="dropdown-item" href="#">減重</a></li>
              <li><a className="dropdown-item" href="#">腸胃敏感</a></li>
              <li><a className="dropdown-item" href="#">泌尿道保健</a></li>
              <li><a className="dropdown-item" href="#">強化免疫力</a></li>
              <li><a className="dropdown-item" href="#">改善皮膚&amp;毛髮</a></li>
              <li><a className="dropdown-item" href="#">骨骼保養</a></li>
            </ul>
          </div>
        </div>

        <div className="px-6">
          <p className="ms-2 pb-2">適合年齡</p>
          <div className="dropdown pb-7">
            <button
              className="btn-outline-primary rounded-pill food-dropdown dropdown-toggle"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              適合年齡
            </button>
            <ul className="dropdown-menu food-dropdown-menu">
              <li><a className="dropdown-item" href="#">幼貓</a></li>
              <li><a className="dropdown-item" href="#">成貓</a></li>
              <li><a className="dropdown-item" href="#">熟齡貓</a></li>
              <li><a className="dropdown-item" href="#">全齡貓</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </aside>
  );
}

export default FoodAside;
