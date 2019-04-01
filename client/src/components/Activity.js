import React, { Component } from "react";
import Slider from "react-slick";

class Activity extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3
    };
    return (
      <div className="slider">
        <h4> Activities </h4>
        <Slider {...settings}>

          <div className="slider-image">
            <h3>1</h3>
          </div>
          
          <div className="slider-image">
            <h3>2</h3>
          </div>

          <div className="slider-image">
            <h3>3</h3>
          </div>

          <div className="slider-image">
            <h3>4</h3>
          </div>
          
          <div className="slider-image">
            <h3>5</h3>
          </div>

          <div className="slider-image">
            <h3>6</h3>
          </div>

        </Slider>
      </div>
    );
  }
}

export default Activity