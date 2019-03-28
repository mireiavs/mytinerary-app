import React, { Component } from "react";
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { getCities } from "../actions/citiesActions"
import PropTypes from "prop-types"
import Loader from "./Loader"
import Cityfilter from "./Cityfilter";


class Cities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filteredCities: [],
            noResults: false
        }
    }
    componentDidMount() {
        this.props.getCities()
    }
    filterCities = (cityFilter) => {
        let filteredCities = this.props.cities.cities.filter(city => city.name.toLowerCase().includes(cityFilter.toLowerCase()) || cityFilter === "")

        if (filteredCities.length) {
            this.setState({
                filteredCities,
                noResults: false
            })
        } else {
            this.setState({
                noResults: true
            })
        }
    }
    render() {
        const { cities } = this.props.cities
        var cityList = "";

        if (this.state.filteredCities.length) {
            if (!this.state.noResults) {
                cityList = this.state.filteredCities.map(city =>
                    <Link to={`/cities/${city.name}`} key={city._id}><button type="button" className="btn btn-outline-dark btn-block city-link">{city.name}</button>
                    </Link>
                )
            } else {
                cityList = "No cities found"
            }
        } else {
            cityList = cities.map(city =>
                <Link to={`/cities/${city.name}`} key={city._id}><button type="button" className="btn btn-outline-dark btn-block">{city.name}</button>
                </Link>
            )
        }

        const isLoading = this.props.cities.loading
        return (
            <div className="cities">
                <h1>Cities</h1>
                {isLoading ? (<Loader />) : (
                    <div>
                        <Cityfilter onChange={this.filterCities} />
                        <div className="city-list">{cityList}</div>
                    </div>
                )}
            </div>
        )
    }
}

Cities.propTypes = {
    getCities: PropTypes.func,
    cities: PropTypes.object,
    loading: PropTypes.bool
}

const mapStateToProps = (state) => ({
    cities: state.cities,
    loading: state.loading
})

export default connect(mapStateToProps, { getCities })(Cities)