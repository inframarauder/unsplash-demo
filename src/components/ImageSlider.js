import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

const ImageSlider = ({ startIndex, photos }) => {
  const [index, setIndex] = useState(startIndex);
  console.log(photos);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      className="slider"
      indicators={false}
      nextIcon={<img src="/assets/right-arrow.svg" alt="right" />}
      prevIcon={<img src="/assets/left-arrow.svg" alt="left" />}
    >
      {photos.map((photo) => (
        <Carousel.Item key={photo.id}>
          <div className="center-content">
            <img
              src={photo.urls?.regular}
              alt="img"
              width={photo.width / 10}
              height={585}
            />
          </div>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ImageSlider;
