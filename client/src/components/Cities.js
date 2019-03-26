import React, { Component } from "react";
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import { getCities } from "../actions/citiesActions"
import PropTypes from "prop-types"
import Loader from "./Loader"

class Cities extends Component {
    componentDidMount() {
        this.props.getCities()
    }
    render() {
        const { cities } = this.props.cities
        const cityList = cities.map(city =>
            <Link to={`/cities/${city.name}`} key={city._id}><button type="button" className="btn btn-outline-dark btn-block">{city.name}</button></Link>
        )
        const isLoading = this.props.cities.loading
        return (
            <div className="cities">
                <h1>Cities</h1>
                {isLoading ? (<Loader />) : (<div className="city-list">{cityList}</div>)}
            </div>
        )
    }
}

Cities.propTypes = {
    getCities: PropTypes.func.isRequired,
    cities: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
    cities: state.cities,
    loading: state.loading
})

export default connect(mapStateToProps, { getCities })(Cities)