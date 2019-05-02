import React, { Component } from "react";
import PropTypes from "prop-types";
import { addCity, addSuccess } from "../../actions/citiesActions";
import { connect } from "react-redux";

// Material UI imports
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class Addcity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      country: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClickAfterAdd = this.onClickAfterAdd.bind(this);
  }
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const newCity = {
      name: this.state.name,
      country: this.state.country
    };
    this.props.addCity(newCity);
  };
  onClickAfterAdd = () => {
    this.props.addSuccess();
  };
  render() {
    const addSuccess = this.props.cities.addsuccess;
    return (
      <div>
        <h1>Add a city</h1>

        {!addSuccess ? (
          <form
            id="city-form"
            className="cms-form"
            noValidate
            autoComplete="off"
            onSubmit={this.onSubmit}
          >
            <TextField
              name="name"
              id="name"
              label="Name"
              value={this.state.name}
              onChange={this.onChange}
              margin="normal"
              color="primary"
            />
            <TextField
              name="country"
              id="country"
              label="Country"
              value={this.state.country}
              onChange={this.onChange}
              margin="normal"
            />
            <div>
              <Button
                variant="contained"
                size="medium"
                type="submit"
                form="city-form"
              >
                Submit
              </Button>
            </div>
          </form>
        ) : (
          <div className="success-msg">
            <p>City added successfully!</p>
            <Button
              variant="contained"
              size="medium"
              onClick={this.onClickAfterAdd}
            >
              Add another city
            </Button>
          </div>
        )}
      </div>
    );
  }
}

Addcity.propTypes = {
  cities: PropTypes.object,
  addCity: PropTypes.func,
  addsuccess: PropTypes.bool,
  addSuccess: PropTypes.func
};

const mapStateToProps = state => ({
  cities: state.cities,
  addsuccess: state.addsuccess,
  addSuccess: state.addSuccess
});

export default connect(
  mapStateToProps,
  { addCity, addSuccess }
)(Addcity);
