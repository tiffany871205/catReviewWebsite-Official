import React from "react";
import food0 from "../assets/images/food/food0.png";
import food1 from "../assets/images/food/food1.png";
import food2 from "../assets/images/food/food2.png";
import food3 from "../assets/images/food/food3.png";
import food4 from "../assets/images/food/food4.png";
import food5 from "../assets/images/food/food5.png";
import food6 from "../assets/images/food/food6.png";
import food7 from "../assets/images/food/food7.png";
import food8 from "../assets/images/food/food8.png";
import FoodBanner from "../components/food/FoodBanner.jsx";
import FoodAside from "../components/food/FoodAside.jsx";
import FoodCard from "../components/food/FoodCard.jsx";

const foodCards = [
  {
    href: "/food/product",
    image: food0,
    alt: "card-img-1",
    title: "雞+南瓜主食罐",
    price: "600g 900NT$",
    tags: "雞肉 | 肉塊 | 腸胃敏感 | 成貓",
    buttonClass: "btn btn-outline-primary mt-2 mt-lg-9",
  },
  {
    href: "",
    image: food1,
    alt: "card-img-2",
    title: "鮭魚佐鮪魚貓罐頭",
    price: "480g 420NT$",
    tags: "海鮮 | 肉塊 | 無 | 全齡貓",
    buttonClass: "btn btn-outline-primary mt-2 mt-lg-9",
  },
  {
    href: "",
    image: food2,
    alt: "card-img-3",
    title: "羊肉莓果乾糧",
    price: "5kg 980NT$",
    tags: "羊肉 | 乾飼料 | 改善皮膚&毛髮 | 成貓",
  },
  {
    href: "",
    image: food3,
    alt: "card-img-4",
    title: "鮮蝦雞胸肉凍乾塊",
    price: "50g 280NT$",
    tags: "雞肉 | 乾飼料 | 強化免疫力 | 全齡貓",
  },
  {
    href: "",
    image: food4,
    alt: "card-img-5",
    title: "牛肉燉蔬菜貓餐包",
    price: "680g 560NT$",
    tags: "牛肉 | 膠狀 | 強化免疫力 | 幼貓",
    buttonClass: "btn btn-outline-primary mt-2 mt-lg-9",
  },
  {
    href: "",
    image: food5,
    alt: "card-img-6",
    title: "鮪魚雞肝肉泥條",
    price: "280g 350NT$",
    tags: "其他 | 泥狀 | 減重 | 全齡貓",
    buttonClass: "btn btn-outline-primary mt-2 mt-lg-9",
  },
  {
    href: "",
    image: food6,
    alt: "card-img-7",
    title: "白魚海藻無穀乾糧",
    price: "1kg 780NT$",
    tags: "海鮮 | 乾飼料 | 骨骼保養 | 成貓",
  },
  {
    href: "",
    image: food7,
    alt: "card-img-8",
    title: "鴨肉凍乾小粒",
    price: "80g 320NT$",
    tags: "鴨肉 | 乾飼料 | 全齡貓",
  },
  {
    href: "",
    image: food8,
    alt: "card-img-9",
    title: "鴨肉紅薯無穀乾糧",
    price: "2kg 1,050NT$",
    tags: "鴨肉 | 乾飼料 | 腸胃敏感 | 成貓",
  },
];

function Food() {
  return (
    <>
      {/*<h1>我是食品區</h1>*/}
      <div className="foodmain-body">
        <FoodBanner />

        <main className="container">
          <div className="row row-cols-2 align-items-stretch">
            <div className="col-lg-3 d-flex">
              <FoodAside />
            </div>
            <div className="col-lg-9 d-flex justify-content-center flex-wrap ">
              <div className="row row-cols-3">
                {foodCards.map((card) => (
                  <FoodCard
                    key={card.alt}
                    href={card.href}
                    image={card.image}
                    alt={card.alt}
                    title={card.title}
                    price={card.price}
                    tags={card.tags}
                    buttonClass={card.buttonClass}
                  />
                ))}

                <div className="d-xl-none d-none d-mg-flex">
                  <div className="card food-card mb-10">
                    <img src="" alt="" />
                    <div className="card-body">
                      <h5 className="card-title" />
                      <p className="card-text" />
                      <p className="card-text" />
                    </div>
                  </div>
                </div>

                <div className="m-auto mt-10 ">
                  <ul className="d-flex justify-content-center align-items-center">
                    <li className="page-item me-2">
                      <button type="button" className="btn knowledge-btn">
                        <i className="bi bi-chevron-left" />
                      </button>
                    </li>
                    <li className="page-item me-2">
                      <button
                        type="button"
                        className="btn knowledge-btn btn-primary-600 text-white active"
                      >
                        1
                      </button>
                    </li>
                    <li className="page-item me-2">
                      <button type="button" className="btn knowledge-btn">
                        2
                      </button>
                    </li>
                    <li className="page-item me-2">
                      <button type="button" className="btn knowledge-btn">
                        ...
                      </button>
                    </li>
                    <li className="page-item me-2">
                      <button type="button" className="btn knowledge-btn">
                        8
                      </button>
                    </li>
                    <li className="page-item">
                      <button type="button" className="btn knowledge-btn">
                        <i className="bi bi-chevron-right" />
                      </button>
                    </li>
                  </ul>
                </div>
                {/*</div>*/}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
export default Food;
// 改文件大小寫
