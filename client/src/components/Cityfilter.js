import React, { Component } from "react";
import PropTypes from "prop-types"
import { debounce } from "lodash"

class Cityfilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cityFilter: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        // Debounce
        this.updateFilter = debounce(this.updateFilter, 500);
    }
    handleChange = (e) => {
        this.setState({
            cityFilter: e.target.value
        })
        // Debounced function
        this.updateFilter()
    }
    updateFilter() {
        this.props.onChange(this.state.cityFilter)
    }
    render() {
        return (
            <div className="cities-filter">
                <p>Filter our current cities:</p>
                <input type="text" placeholder="Search by city name" className="form-control" value={this.state.cityFilter} onChange={this.handleChange} />
            </div>
        )
    }
}

Cityfilter.propTypes = {
    onChange: PropTypes.func
}

export default Cityfilter