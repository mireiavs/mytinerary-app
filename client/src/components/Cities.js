import React, { Component } from "react";
import axios from "axios"
import {Link} from "react-router-dom"

class Cities extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cities: []
        }
    }
    getCities() {
        axios.get("/cities/all")
            .then(res => {
                this.setState({
                    cities: res.data
                })
            })
    }
    componentDidMount() {
        this.getCities()
    }
    render() {
        const cities = this.state.cities
        const cityList = cities.map(city =>
            <Link to={`/cities/${city.name}`} key={city._id}><button type="button" className="btn btn-outline-dark btn-block">{city.name}</button></Link>
        )
        return (
            <div className="cities">
                <h1>Cities</h1>
                <div className="city-list">{cityList}</div>
            </div>
        )
    }
}

export default Cities