import React from "react";

const section02Decoration = `${import.meta.env.BASE_URL}images/food/section02_decoration.png`;

function FoodBanner() {
  return (
    <section>
      <div className="index-header mb-12">
        <div className="food-box">
          <img className="pb-10" src={section02Decoration} alt="food-deco1" />
          <h2 className="text-center pb-5">膳 食 探 索</h2>
          <h4 className="text-center">讓你找到最適合喵皇的膳食</h4>
          <div className="foodmain-searchbar pt-10">
            <div className="navbar navbar-light">
              <div className="container-fluid rounded-pill">
                <form className="d-flex">
                  <input
                    className="form-control py-2 foodmain-form"
                    type="search"
                    placeholder="#搜尋食品"
                    aria-label="Search"
                  />
                  <button className="btn btn-primary-500 foodmain-search-btn" type="submit">
                    <i className="bi bi-search" style={{ color: "#eeded9" }} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FoodBanner;
