import React from "react";
import classes from "./Categories.module.css";
import { Link } from "react-router-dom";
function CategoryCard({ Title, image, name }) {
  return (
    <div className={classes.category_card}>
      <Link to={`/CategoryName/${name}`}>
        <span>
          <h3>{Title}</h3>
        </span>

        <img src={image} alt={Title} />

        <p>Shop Now</p>
      </Link>
    </div>
  );
}

export default CategoryCard;
