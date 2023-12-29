import React, { useState } from 'react';
import Slider from 'react-slick';

const Catalog = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    className: 'center',
    infinite: true,
    centerPadding: '60px',
    slidesToShow: 5,
    swipeToSlide: true,
    afterChange: (index) => {
      setCurrentSlide(index);
    },
  };

  return (
    <div>
      <h2>Swipe To Slide</h2>
      <Slider {...settings}>
        {[...Array(9)].map((_, index) => (
          <div key={index}>
            <h3>{index + 1}</h3>
          </div>
        ))}
      </Slider>
      <p>Current Slide: {currentSlide + 1}</p>
    </div>
  );
};

export default Catalog;
