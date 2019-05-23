import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getAllItineraries } from "../actions/itineraryActions";
import PropTypes from "prop-types";

export class Cities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noResults: false
    };
  }

  componentDidMount() {
    this.props.getAllItineraries();
  }

  /* Filter the list of cities according to the text entered in the cityFilter component, also update noResults variable in case of no results */

  render() {
    const { itineraries } = this.props.itineraries;

    let hashtagArr = [];
    itineraries.forEach(itinerary => {
      itinerary.hashtag.forEach(singleHashtag => {
        if (!hashtagArr.includes(singleHashtag)) {
          hashtagArr.push(singleHashtag);
        }
      });
    });

    let hashtagList = hashtagArr.map((hashtag, index) => (
      <div key={index}>
        <Link to={`/itineraries/${hashtag}`}>#{hashtag}</Link>
      </div>
    ));

    return (
      <div className="cities">
        <h4>Browse by hashtag</h4>
        <div className="browse-hashtag">{hashtagList}</div>
      </div>
    );
  }
}

Cities.propTypes = {
  getAllItineraries: PropTypes.func,
  itineraries: PropTypes.object,
  loading: PropTypes.bool,
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  itineraries: state.itineraries,
  loading: state.loading,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAllItineraries }
)(Cities);
