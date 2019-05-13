import React, { Component } from "react";
import PropTypes from "prop-types";
import { getItineraries } from "../actions/itineraryActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Itinerary from "../components/Itinerary";
import Loader from "../components/Loader";

// Material UI imports
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

class City extends Component {
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
    // get itineraries for this city, city ID is taken from the route
    this.props.getItineraries(this.props.match.params.id);
  }

  render() {
    const { itineraries } = this.props.itineraries;
    const itineraryList = itineraries.map((itinerary, index) => (
      <Itinerary
        itinerary={itinerary}
        key={index}
        isOpen={this.state.collapse === itinerary._id}
        toggle={this.toggle}
      />
    ));

    const isLoading = this.props.itineraries.loading;

    return (
      <div className="city-itinerary-list">
        <h1>{this.props.match.params.id}</h1>
        <h4>Available MYtineraries:</h4>

        {isLoading ? (
          <Loader />
        ) : (
          <div>
            {itineraries.length !== 0 ? (
              <div>{itineraryList}</div>
            ) : (
              <p>Sorry, there are no itineraries for this city yet.</p>
            )}
          </div>
        )}

        {this.props.auth.isAuthenticated ? (
          <Button
            component={Link}
            variant="contained"
            to={`/cities/${this.props.match.params.id}/additinerary`}
          >
            <AddIcon /> Add itinerary
          </Button>
        ) : null}

        <Link to="/cities/all" className="other-city-link">
          Choose a different city
        </Link>
      </div>
    );
  }
}

City.propTypes = {
  match: PropTypes.object,
  loading: PropTypes.bool,
  getItineraries: PropTypes.func,
  itineraries: PropTypes.object,
  favourites: PropTypes.object,
  user: PropTypes.object,
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  itineraries: state.itineraries,
  loading: state.loading,
  auth: state.auth,
  user: state.auth.user,
  favourites: state.favourites
});

export default connect(
  mapStateToProps,
  { getItineraries }
)(City);
