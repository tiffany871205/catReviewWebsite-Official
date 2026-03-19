<<<<<<< HEAD
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
=======
import React, { useEffect, useState } from "react";
import FoodBanner from "../components/food/FoodBanner.jsx";
import FoodAside from "../components/food/FoodAside.jsx";
import FoodCard from "../components/food/FoodCard.jsx";
import FoodPagination from "../components/food/FoodPagination.jsx";
import { getFoodMeta, getFoods } from "../api/food";

const foodPublicImageBase = `${import.meta.env.BASE_URL}images/food/`;

const foodImageMap = {
  1: `${foodPublicImageBase}food0.png`,
  2: `${foodPublicImageBase}food1.png`,
  3: `${foodPublicImageBase}food2.png`,
  4: `${foodPublicImageBase}food3.png`,
  5: `${foodPublicImageBase}food4.png`,
  6: `${foodPublicImageBase}food5.png`,
  7: `${foodPublicImageBase}food6.png`,
  8: `${foodPublicImageBase}food7.png`,
  9: `${foodPublicImageBase}food8.png`,
};

const tallButtonCardIds = new Set([1, 2, 5, 6]);
const PAGE_SIZE = 9;

function buildLookupMap(items = []) {
  return new Map(items.map((item) => [item.id, item.name]));
}

function buildFoodCards(foods = [], foodMeta = {}) {
  const taxonomyMaps = {
    flavors: buildLookupMap(foodMeta.flavors),
    contentTypes: buildLookupMap(foodMeta.contentTypes),
    specialFormulas: buildLookupMap(foodMeta.specialFormulas),
    targets: buildLookupMap(foodMeta.targets),
  };

  return foods.map((item) => ({
    id: item.id,
    href: `/food/product/${item.id}`,
    image: foodImageMap[item.id] ?? item.coverImage,
    alt: `${item.name}-${item.id}`,
    title: item.name,
    price: `${item.weight} ${Number(item.price).toLocaleString("zh-TW")}NT$`,
    tags: [
      taxonomyMaps.flavors.get(item.flavorId),
      taxonomyMaps.contentTypes.get(item.contentTypeId),
      taxonomyMaps.specialFormulas.get(item.specialFormulaId),
      taxonomyMaps.targets.get(item.targetId),
    ]
      .filter(Boolean)
      .join(" | "),
    buttonClass: tallButtonCardIds.has(item.id)
      ? "btn btn-outline-primary mt-2 mt-lg-9"
      : "btn btn-outline-primary mt-2",
  }));
}

function applyFoodFilters(foods = [], filters = {}) {
  return foods.filter((item) => {
    if (filters.flavorId && item.flavorId !== filters.flavorId) return false;
    if (filters.contentTypeId && item.contentTypeId !== filters.contentTypeId) return false;
    if (filters.specialFormulaId && item.specialFormulaId !== filters.specialFormulaId)
      return false;
    if (filters.targetId && item.targetId !== filters.targetId) return false;
    return true;
  });
}

function Food() {
  const [loading, setLoading] = useState(true);
  const [foods, setFoods] = useState([]);
  const [foodMeta, setFoodMeta] = useState({
    flavors: [],
    contentTypes: [],
    specialFormulas: [],
    targets: [],
  });
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({
    flavorId: null,
    contentTypeId: null,
    specialFormulaId: null,
    targetId: null,
  });
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const [foodList, meta] = await Promise.all([getFoods(), getFoodMeta()]);
        setFoods(Array.isArray(foodList) ? foodList : []);
        setFoodMeta({
          flavors: meta?.flavors ?? [],
          contentTypes: meta?.contentTypes ?? [],
          specialFormulas: meta?.specialFormulas ?? [],
          targets: meta?.targets ?? [],
        });
        setError("");
      } catch (error) {
        console.error("取得食品資料失敗:", error);
        console.error("status:", error.response?.status);
        console.error("data:", error.response?.data);
        console.error("url:", error.config?.url);
        setFoods([]);
        setError("食品資料載入失敗，請確認 API 服務是否正常。");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const filteredFoods = applyFoodFilters(foods, filters);
  const foodCards = buildFoodCards(filteredFoods, foodMeta);
  const totalPages = Math.max(1, Math.ceil(foodCards.length / PAGE_SIZE));
  const pagedFoodCards = foodCards.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [filters]);

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  if (loading) {
    return <div className="container py-5">載入中...</div>;
  }

  if (error) {
    return <div className="container py-5 text-danger">{error}</div>;
  }

  return (
    <>
>>>>>>> origin/dev
      <div className="foodmain-body">
        <FoodBanner />

        <main className="container">
          <div className="row row-cols-2 align-items-stretch">
            <div className="col-lg-3 d-flex">
<<<<<<< HEAD
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
=======
              <FoodAside
                foodMeta={foodMeta}
                filters={filters}
                onFilterChange={(key, value) =>
                  setFilters((prev) => ({
                    ...prev,
                    [key]: value,
                  }))
                }
              />
            </div>
            <div className="col-lg-9 d-flex">
              <div className="w-100 d-flex flex-column">
                <div className="row row-cols-3">
                  {pagedFoodCards.map((card) => (
                    <FoodCard
                      key={card.id}
                      href={card.href}
                      image={card.image}
                      alt={card.alt}
                      title={card.title}
                      price={card.price}
                      tags={card.tags}
                      buttonClass={card.buttonClass}
                    />
                  ))}

                  {foodCards.length === 0 ? (
                    <div className="col-12 text-center py-5 text-neutral-600">
                      找不到符合條件的食品
                    </div>
                  ) : null}
                </div>

                <FoodPagination page={page} totalPages={totalPages} setPage={setPage} />
>>>>>>> origin/dev
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
<<<<<<< HEAD
=======

>>>>>>> origin/dev
export default Food;
// 改文件大小寫
