import React from "react";
import { Carousel } from "react-responsive-carousel";
import { img } from "../Carousel/IMG/data";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import classes from "./Carousel.module.css";
function CarouselEffect() {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showThumbs={false}
        interval={2500}
      >
{
    img.map((imageItem, index) => {
        return (
            <img key={index} src={imageItem} alt={`banner-${index}`} />
        )
    })
}

      </Carousel>
      <div className={classes.img_gradient}></div>
    </div>
  );
}

export default CarouselEffect;
