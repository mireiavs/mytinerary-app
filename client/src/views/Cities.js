import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCities } from "../actions/citiesActions";
import PropTypes from "prop-types";
import Loader from "../components/Loader";
import Cityfilter from "../components/Cityfilter";
import Button from "@material-ui/core/Button";

export class Cities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredCities: [],
      noResults: false
    };
  }

  componentDidMount() {
    this.props.getCities();
  }

  /* Filter the list of cities according to the text entered in the cityFilter component, also update noResults variable in case of no results */
  filterCities = cityFilter => {
    let filteredCities = this.props.cities.cities.filter(
      city =>
        city.name.toLowerCase().startsWith(cityFilter.toLowerCase()) ||
        cityFilter === ""
    );

    if (filteredCities.length) {
      this.setState({
        filteredCities,
        noResults: false
      });
    } else {
      this.setState({
        noResults: true
      });
    }
  };

  render() {
    const { cities } = this.props.cities;
    var cityList = "";

    if (this.state.filteredCities.length) {
      if (!this.state.noResults) {
        cityList = this.state.filteredCities.map(city => (
          <div className="city-button" key={city._id}>
            <Button
              component={Link}
              size="large"
              variant="outlined"
              to={`/cities/${city.name}`}
            >
              {city.name}
            </Button>
          </div>
        ));
      } else {
        cityList = "We don't have that city yet.";
      }
    } else {
      cityList = cities.map(city => (
        <div className="city-button" key={city._id}>
          <Button
            component={Link}
            size="large"
            variant="outlined"
            to={`/cities/${city.name}`}
          >
            {city.name}
          </Button>
        </div>
      ));
    }

    const isLoading = this.props.cities.loading;
    return (
      <div className="cities">
        <h1>Cities</h1>
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            <Cityfilter onChange={this.filterCities} />
            <div className="city-list">{cityList}</div>

            {this.props.auth.isAuthenticated ? (
              <Link to="/cities/all/addcity">Add a city</Link>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}

Cities.propTypes = {
  getCities: PropTypes.func,
  cities: PropTypes.object,
  loading: PropTypes.bool,
  auth: PropTypes.object
};

const mapStateToProps = state => ({
  cities: state.cities,
  loading: state.loading,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCities }
)(Cities);
