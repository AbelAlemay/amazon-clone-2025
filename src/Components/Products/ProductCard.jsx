import React from "react";
import Rating from "@mui/material/Rating";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import classes from "./Products.module.css";
import { Link } from "react-router-dom";
import { useDataProvider } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utilities/action.type";

function ProductCard({ product, flex, renderDesc, renderAdd }) {
  const [{ basket }, dispatch] = useDataProvider();

  const addToBasket = () => {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: {
        id: product.id,
        title: product.title,
        image: product.image,
        price: product.price,
        rating: product.rating,
        description: product.description,
      },
    });
  };

  return (
    <div
      className={`${classes.card_container} ${
        flex ? classes.product__flexed : ""
      }`}
    >
      <Link to={`/Product/${product.id}`}>
        <img src={product.image} alt={product.title} />
      </Link>
      <div className={classes.card_content}>
        <h3 style={{ fontWeight: "bold" }}> {product.title}</h3>
        {renderDesc && (
          <div style={{ maxWidth: "750px" }}>{product.description}</div>
        )}
        <div className={classes.card_rating}>
          {/* Rating */}
          <Rating
            name="half-rating-read"
            defaultValue={product.rating?.rate}
            precision={0.5}
            readOnly
          />
          {/* count = */}
          <small>{product.rating?.count}</small>
        </div>
        <div className={classes.card_price}>
          {/* Price */}
          <p>
            <CurrencyFormat amount={product.price} />
          </p>
        </div>

        {renderAdd !== false && (
          <div className={classes.card_button}>
            <button onClick={addToBasket}>Add to Cart</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
