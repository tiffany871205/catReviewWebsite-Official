import React, { useEffect, useState } from "react";
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
import FoodPagination from "../components/food/FoodPagination.jsx";
import { getFoodMeta, getFoods } from "../api/food";

const foodImageMap = {
  1: food0,
  2: food1,
  3: food2,
  4: food3,
  5: food4,
  6: food5,
  7: food6,
  8: food7,
  9: food8,
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
    if (filters.specialFormulaId && item.specialFormulaId !== filters.specialFormulaId) return false;
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
      <div className="foodmain-body">
        <FoodBanner />

        <main className="container">
          <div className="row row-cols-2 align-items-stretch">
            <div className="col-lg-3 d-flex">
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
