import React, { Component } from "react";
import PropTypes from "prop-types";
import { debounce } from "lodash";

// Material UI imports
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";

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

  handleChange = e => {
    this.setState({
      cityFilter: e.target.value
    });
    // Debounced function
    this.updateFilter();
  };

  // Function to update the city filter (on parent component)
  updateFilter() {
    this.props.onChange(this.state.cityFilter);
  }

  render() {
    return (
      <div className="cities-filter">
        <p>Filter our current cities:</p>
        <FormControl>
          <Input
            placeholder="Search by city name"
            value={this.state.cityFilter}
            onChange={this.handleChange}
          />
        </FormControl>
      </div>
    );
  }
}

Cityfilter.propTypes = {
  onChange: PropTypes.func
};

export default Cityfilter;
