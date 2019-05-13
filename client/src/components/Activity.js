import React, { Component } from "react";
import Slider from "react-slick";
import PropTypes from "prop-types";

class Activity extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 3
    };

    const activities = this.props.activities.activities;

    const activityList = activities.map((activity, index) => (
      <div className="slider-image" key={index}>
        <img className="activity-img" src={activity.img} alt="activity" />
        <div className="activity-caption">
          <p>{activity.caption}</p>
        </div>
      </div>
    ));

    return (
      <div className="activity-container">
        <h4> Activities </h4>
        <div className="slider">
          <Slider {...settings}>{activityList}</Slider>
        </div>
      </div>
    );
  }
}

Activity.propTypes = {
  activities: PropTypes.object
};

export default Activity;
