import React from "react";
import CategoryCard from "./CategoryCard";
import categoryInfo from "./categoriesData";
import classes from "./Categories.module.css";

function Categories() {
  return (
    <div className={classes.categories}>
      {categoryInfo.map((categoryItem) => {
        return (
          <CategoryCard
            key={categoryItem.name}
            Title={categoryItem.Title}
            image={categoryItem.image}
            name={categoryItem.name}
          />
        );
      })}
    </div>
  );
}

export default Categories;
