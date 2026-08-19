import React from "react";

const section02Decoration = `${import.meta.env.BASE_URL}images/food/section02_decoration.png`;

function FoodBanner() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section className="food-banner mb-12">
      <div className="container">
        <div className="row justify-content-lg-end justify-content-center">
          <div className="col-lg-5 col-12">
            <div className="food-banner-content d-flex flex-column align-items-center">
              <img
                src={section02Decoration}
                alt="food-deco1"
                className="food-banner-deco mb-lg-10 mb-6"
              />
              <h1 className="food-banner-title mb-3 text-center">膳 食 探 索</h1>
              <h4 className="food-banner-subtitle mb-lg-10 mb-6 text-center">
                讓你找到最適合喵皇的膳食
              </h4>

              <div className="foodmain-searchbar w-100">
                <form onSubmit={handleSubmit} className="position-relative w-100">
                  <input
                    className="form-control rounded-pill py-2 ps-3 pe-5 foodmain-form"
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
