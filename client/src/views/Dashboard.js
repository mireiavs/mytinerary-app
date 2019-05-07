import React, { Component } from "react";
import { connect } from "react-redux";
import Itinerary from "../components/Itinerary";
import { getAllItineraries } from "../actions/itineraryActions";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {};
  }

  // function to collapse all other cards when a specific one is open
  toggle(id) {
    this.setState({ collapse: this.state.collapse === id ? null : id });
  }

  componentDidMount() {
    this.props.getAllItineraries();
  }

  render() {
    const { itineraries } = this.props.itineraries;
    var favourites = [];
    var itineraryList = [];

    if (this.props.auth.isAuthenticated && this.props.auth.favourites) {
      favourites = this.props.auth.favourites;
      itineraryList = favourites.map((favourite, index) => {
        for (var i = 0; i < itineraries.length; i++) {
          if (favourite.itineraryId === itineraries[i]._id) {
            return (
              <Itinerary
                itinerary={itineraries[i]}
                key={index}
                isOpen={this.state.collapse === itineraries[i]._id}
                toggle={this.toggle}
              />
            );
          }
        }
      });
    }
    return (
      <div className="dashboard">
        <div>
          <h2>{this.props.user.first_name}&apos;s Dashboard</h2>
        </div>
        <h4>Favourite itineraries</h4>

        {favourites.length !== 0 ? (
          <div className="city-itinerary-list">{itineraryList}</div>
        ) : (
          <div className="no-favs">
            <p>You haven&apos;t added any favourites yet.</p>
            <Link to="/cities/all">Start browsing</Link>
          </div>
        )}
      </div>
    );
  }
}

Dashboard.propTypes = {
  itineraries: PropTypes.object,
  loading: PropTypes.object,
  auth: PropTypes.object,
  favourites: PropTypes.object,
  getAllItineraries: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  itineraries: state.itineraries,
  loading: state.loading,
  auth: state.auth,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { getAllItineraries }
)(Dashboard);
