import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import decoration2 from "../../assets/images/food/Decoration2.png";
import decorationLt from "../../assets/images/food/Decoration-LT.png";
import decorationRt from "../../assets/images/food/Decoration-RT.png";
import { getFoodDetailById, getFoodMeta } from "../../api/food";
import BackToTopButton from "../common/BackToTopButton";

function resolveFoodImagePath(imagePath) {
  if (!imagePath || typeof imagePath !== "string") {
    return null;
  }

  if (imagePath.startsWith("/images/food/")) {
    return `${import.meta.env.BASE_URL}${imagePath.slice(1)}`;
  }

  const fileName = imagePath.split("/").pop();
  if (!fileName) {
    return null;
  }

  return `${import.meta.env.BASE_URL}images/food/${encodeURIComponent(fileName)}`;
}

function buildLookupMap(items = []) {
  return new Map(items.map((item) => [item.id, item.name]));
}

function toPriceLabel(price) {
  return `NT$ ${Number(price ?? 0).toLocaleString("zh-TW")}`;
}

function buildSections(detail, meta) {
  const ingredientMaps = {
    flavors: buildLookupMap(meta?.flavors),
    contentTypes: buildLookupMap(meta?.contentTypes),
    specialFormulas: buildLookupMap(meta?.specialFormulas),
    targets: buildLookupMap(meta?.targets),
  };

  const nutrition = detail?.nutrition ?? {};
  const ingredients = detail?.ingredients ?? {};
  const extraNutrition = detail?.extraNutrition ?? [];

  return [
    {
      title: "1. 基本資訊",
      items: [
        { label: "品牌", value: detail?.basicInfo?.brand ?? "-" },
        { label: "參考價格", value: toPriceLabel(detail?.price) },
        { label: "產地", value: detail?.basicInfo?.origin ?? "-" },
        { label: "重量", value: detail?.weight ?? "-" },
      ],
    },
    {
      title: "2. 成分描述",
      items: [
        { label: "口味類別", value: ingredientMaps.flavors.get(ingredients.flavorId) ?? "-" },
        {
          label: "內容物類別",
          value: ingredientMaps.contentTypes.get(ingredients.contentTypeId) ?? "-",
        },
        {
          label: "特殊配方",
          value: ingredientMaps.specialFormulas.get(ingredients.specialFormulaId) ?? "-",
        },
        { label: "適合年齡", value: ingredientMaps.targets.get(ingredients.targetId) ?? "-" },
      ],
    },
    {
      title: "3. 營養資訊",
      items: [
        { label: "水分比例", value: nutrition.moisture ?? "-" },
        { label: "熱量", value: nutrition.calories ?? "-" },
        { label: "脂肪比例", value: nutrition.fat ?? "-" },
        { label: "含膠與否", value: nutrition.containsGum ? "是" : "否" },
        { label: "蛋白質比例", value: nutrition.protein ?? "-" },
      ],
    },
    {
      title: "4. 額外成分",
      items: extraNutrition.map((item, index) => ({
        label: `額外成分${index + 1}`,
        value: `${item.name} ${item.value}`,
      })),
    },
  ];
}

function Section({ title, items, sectionIndex }) {
  const rows = [];
  for (let i = 0; i < items.length; i += 2) {
    rows.push(items.slice(i, i + 2));
  }

  return (
    <>
      <div className={`foodproduct-content pb-7 ${sectionIndex > 0 ? "pt-md-72" : ""}`}>
        <h3>{title}</h3>
        <p className="product-border" />
      </div>

      {rows.map((row, rowIndex) => (
        <div className="d-md-flex" key={`${title}-${rowIndex}`}>
          {row.map((item, itemIndex) => (
            <div
              className={`col-md-6 d-flex pb-3 col-12 ${itemIndex === 0 ? "pe-48" : ""}`}
              key={`${item.label}-${item.value}`}
            >
              <img src={decoration2} alt="Decoration2" className="pe-3" />
              <div className="foodproduct-info ps-6 pt-2 pb-2">
                <p>{item.label}</p>
                <p className="p2">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </>
  );
}

export default function FoodProductPage() {
  const { id } = useParams();
  const productId = Number(id);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [product, setProduct] = useState(null);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [detail, meta] = await Promise.all([getFoodDetailById(productId), getFoodMeta()]);

        const carouselImages = (detail?.images ?? [])
          .map((image) => resolveFoodImagePath(image))
          .filter(Boolean);

        setProduct({
          name: detail?.name ?? "未命名食品",
          author: detail?.meta?.author ?? "Cool Meow",
          publishDate: detail?.meta?.publishDate ?? "",
          carouselImages,
        });
        setSections(buildSections(detail, meta));
        setError("");
      } catch (error) {
        console.error("取得食品詳細資料失敗:", error);
        setProduct(null);
        setSections([]);
        setError(
          error.response?.status === 404
            ? "找不到這筆食品詳細資料。"
            : "食品詳細資料載入失敗，請確認 API 服務是否正常。"
        );
      } finally {
        setLoading(false);
      }
    }

    if (!Number.isFinite(productId)) {
      setLoading(false);
      setError("食品 id 無效。");
      return;
    }

    fetchData();
  }, [productId]);

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return <div className="container py-5">載入中...</div>;
  }

  if (error) {
    return <div className="container py-5 text-danger">{error}</div>;
  }

  if (!product) {
    return <div className="container py-5">找不到食品資料</div>;
  }

  return (
    <>
      <div className="section-1" id="top">
        <div className="container">
          <div className="row">
            <nav
              aria-label="breadcrumb"
              style={{ "--bs-breadcrumb-divider": "'>'" }}
              className="pt-3"
            >
              <ol className="breadcrumb">
                <li className="breadcrumb-item food-breadcrumb-item">
                  <Link to="/">首頁</Link>
                </li>
                <li className="breadcrumb-item food-breadcrumb-item">
                  <Link to="/food">膳食探索</Link>
                </li>
                <li className="breadcrumb-item food-breadcrumb-item active" aria-current="page">
                  {product.name}
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div className="section-2 pb-144 pt-md-12">
        <div className="container container-style px-96">
          <img src={decorationLt} alt="Decoration-LT" className="decoration-LT" />
          <img src={decorationRt} alt="Decoration-RT" className="decoration-RT" />
          <div className="col-12 head-content">
            <div className="row food-prod-header">
              <div className="food-text">
                <h1>{product.name}</h1>
                <p>
                  {product.author}
                  {product.publishDate ? `・發佈時間 ${product.publishDate}` : ""}
                </p>
              </div>

              <div className="food-pic">
                <div
                  id="carouselExampleControls"
                  className="carousel slide"
                  data-bs-ride="carousel"
                >
                  <div className="carousel-inner">
                    {product.carouselImages.length > 0 ? (
                      product.carouselImages.map((image, index) => (
                        <div
                          className={`carousel-item ${index === 0 ? "active" : ""}`}
                          key={`carousel-${index + 1}`}
                        >
                          <div
                            className="d-flex justify-content-center align-items-center overflow-hidden bg-white rounded-3"
                            style={{ height: "640px" }}
                          >
                            <img
                              src={image}
                              alt={`food-img-${index + 1}`}
                              className="d-block w-100 h-100"
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="carousel-item active">
                        <div
                          className="d-flex justify-content-center align-items-center bg-white rounded-3"
                          style={{ height: "640px" }}
                        >
                          目前沒有圖片
                        </div>
                      </div>
                    )}
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="prev"
                  >
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExampleControls"
                    data-bs-slide="next"
                  >
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="container px-96 food-detail-sections"
          style={{ backgroundColor: "#F4F1E9" }}
        >
          <div className="row">
            {sections.map((section, index) => (
              <Section
                key={section.title}
                title={section.title}
                items={section.items}
                sectionIndex={index}
              />
            ))}
          </div>
        </div>
      </div>

      <BackToTopButton onClick={handleBackToTop} />
    </>
  );
}
