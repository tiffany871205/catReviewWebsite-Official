import React from "react";
import { Link } from "react-router";
import decoration1 from "../../assets/images/food/Decoration1.png";

function FoodCard({ href, image, alt, title, price, tags, buttonClass = "btn btn-outline-primary mt-2" }) {
  return (
    // <div className="col-lg-6 col-12 col-xl-4 d-flex justify-content-center">
      <Link to={href}>
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
      </Link>

  );
}

export default FoodCard;
