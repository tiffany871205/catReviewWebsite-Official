import React from "react";
import { Link } from "react-router";
import decoration1 from "../../assets/images/food/Decoration1.png";

function FoodCard({ href, image, alt, title, price, tags, buttonClass = "btn btn-outline-primary mt-2" }) {
  const cardContent = (
    <div className="card food-card">
      <img src={image} alt={alt} />
      <img src={decoration1} className="card-deco" alt="card-decoration" />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{price}</p>
        <p className="card-text">{tags}</p>
        <p className={buttonClass}>查看食品內容</p>
      </div>
    </div>
  );

  if (!href) {
    return cardContent;
  }

  return (
    <Link to={href}>
      {cardContent}
    </Link>
  );
}

export default FoodCard;
