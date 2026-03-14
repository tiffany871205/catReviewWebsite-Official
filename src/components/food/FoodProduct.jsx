import React from "react";
import foodImg1 from "../../assets/images/food/food-img1.png";
import foodImg2 from "../../assets/images/food/food-img2.png";
import decoration2 from "../../assets/images/food/Decoration2.png";
import decorationLt from "../../assets/images/food/Decoration-LT.png";
import decorationRt from "../../assets/images/food/Decoration-RT.png";

const productData = {
    name: "雞+南瓜主食罐",
    author: "Cool Meow",
    publishDate: "2025-07-30",
    carouselImages: [
        foodImg1,
        foodImg2,
    ],
    sections: [
        {
            title: "1. 基本資訊",
            items: [
                { label: "品牌", value: "NUTRIPE 紐萃寶" },
                { label: "參考價格", value: "NT$ 1,000" },
                { label: "產地", value: "紐西蘭" },
                { label: "重量", value: "400 g" },
            ],
        },
        {
            title: "2. 成分描述",
            items: [
                { label: "口味類別", value: "雞肉" },
                { label: "內容物類別", value: "腸胃敏感" },
                { label: "特殊配方", value: "紐西蘭" },
                { label: "適合年齡", value: "成貓" },
            ],
        },
        {
            title: "3. 營養資訊",
            items: [
                { label: "水分比例", value: "低於10%以下↓" },
                { label: "熱量", value: "3,760 cal/kg" },
                { label: "脂肪比例", value: "高於16%以上↑" },
                { label: "含膠與否", value: "否" },
                { label: "蛋白質比例", value: "高於34%以上↑" },
            ],
        },
        {
            title: "4. 額外成分",
            items: [
                { label: "額外成分一", value: "鈣 1.8%" },
                { label: "額外成分二", value: "磷 1.2%" },
                { label: "額外成分三", value: "牛磺酸 0.1%" },
                { label: "額外成分四", value: "Omega-6 2%" },
                { label: "額外成分五", value: "Omega-3 0.5%" },
            ],
        },
    ],
};

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
    const handleBackToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <>
            <div className="section-1" id="top">
                <div className="container">
                    <div className="row">
                        <nav aria-label="breadcrumb" style={{ "--bs-breadcrumb-divider": "'>'" }} className="pt-3">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item food-breadcrumb-item">
                                    <a href="index.html">首頁</a>
                                </li>
                                <li className="breadcrumb-item food-breadcrumb-item">
                                    <a href="foodmain.html">膳食探索</a>
                                </li>
                                <li className="breadcrumb-item food-breadcrumb-item active" aria-current="page">
                                    {productData.name}
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
                                <h1>{productData.name}</h1>
                                <p>
                                    {productData.author}・發佈時間 {productData.publishDate}
                                </p>
                            </div>

                            <div className="food-pic">
                                <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel">
                                    <div className="carousel-inner">
                                        {productData.carouselImages.map((image, index) => (
                                            <div
                                                className={`carousel-item ${index === 0 ? "active" : ""}`}
                                                key={`carousel-${image}`}
                                            >
                                                <img src={image} alt={`food-img-${index + 1}`} className="d-block w-100" />
                                            </div>
                                        ))}
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

                <div className="container px-96 py-md-72" style={{ backgroundColor: "#F4F1E9" }}>
                    <div className="row">
                        {productData.sections.map((section, index) => (
                            <Section key={section.title} title={section.title} items={section.items} sectionIndex={index} />
                        ))}
                    </div>
                </div>
            </div>

            <button type="button" className="btn btn-primary food-back-btn" onClick={handleBackToTop}>
                <i className="bi bi-arrow-up-circle" /> 回到頂端
            </button>
        </>
    );
}
