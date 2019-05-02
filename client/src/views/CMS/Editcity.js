import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  deleteCity,
  getCities,
  updateCity,
  addSuccess
} from "../../actions/citiesActions";
import { connect } from "react-redux";

// Material UI imports
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

class Editcity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      country: "",
      updatedName: "",
      openDeleteConfirmation: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClickAfterAdd = this.onClickAfterAdd.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.handleClickOpenDel = this.handleClickOpenDel.bind(this);
    this.handleCloseDel = this.handleCloseDel.bind(this);
  }

  /* When a city is selected in the dropdown menu, the input fields
    are automatically populated so they can be edited */
  handleChangeSelect = event => {
    const { cities } = this.props.cities;
    const city = cities.find(city => city.name === event.target.value);
    this.setState({
      name: event.target.value,
      updatedName: event.target.value,
      country: city.country
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const updatedCity = {
      name: this.state.updatedName,
      country: this.state.country
    };
    this.props.updateCity(updatedCity, this.state.name);
  };

  onClickAfterAdd = () => {
    this.props.addSuccess();
  };

  onDeleteClick = id => {
    this.props.deleteCity(id);
    this.setState({
      name: "",
      updatedName: "",
      country: "",
      openDeleteConfirmation: false
    });
  };

  handleClickOpenDel = () => {
    this.setState({ openDeleteConfirmation: true });
  };

  handleCloseDel = () => {
    this.setState({ openDeleteConfirmation: false });
  };

  componentDidMount() {
    this.props.getCities();
    if (this.props.cities.addsuccess) {
      this.props.addSuccess();
    }
  }

  /* If page is accessed from a specific city, it will get the info from 
    the city automatically, if not, it will get it from the dropdown menu. 
    Below we check if props have been updated (so the function is only called
    when the props have been received) and if there is a city ID it sets the 
    state with that info */
  componentDidUpdate(prevProps) {
    if (prevProps.cities.cities !== this.props.cities.cities) {
      if (this.props.match.params.cityId) {
        const cities = this.props.cities.cities;
        const city = cities.find(
          city => city.name === this.props.match.params.cityId
        );

        // Check if city exists (for coming back to the form once the city being deleted)
        if (city) {
          this.setState({
            name: city.name,
            updatedName: city.name,
            country: city.country
          });
        }
      }
    }
  }
  render() {
    const { cities } = this.props.cities;
    const cityList = cities.map(city => (
      <MenuItem value={city.name} key={city._id}>
        {city.name}, {city.country}
      </MenuItem>
    ));
    const addSuccess = this.props.cities.addsuccess;

    return (
      <div>
        <h1>Edit city</h1>

        {!addSuccess ? (
          <div>
            <form className="cms-form" autoComplete="off">
              <FormControl>
                <InputLabel htmlFor="name">Select city</InputLabel>

                <Select
                  value={this.state.name}
                  onChange={this.handleChangeSelect}
                  inputProps={{
                    name: "name",
                    id: "name"
                  }}
                >
                  {cityList}
                </Select>
              </FormControl>
            </form>

            <form
              id="city-form"
              noValidate
              autoComplete="off"
              onSubmit={this.onSubmit}
              className="cms-form"
            >
              <TextField
                name="updatedName"
                id="updatedName"
                label="Name"
                value={this.state.updatedName}
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
              <Button
                variant="contained"
                size="medium"
                type="submit"
                form="city-form"
              >
                Submit
              </Button>
            </form>
          </div>
        ) : (
          <div className="success-msg">
            <p>City updated successfully!</p>
            <Button
              variant="contained"
              size="medium"
              onClick={this.onClickAfterAdd}
            >
              Edit another city
            </Button>
          </div>
        )}
        <div className="delete-btn">
          <Button
            variant="contained"
            size="medium"
            onClick={this.handleClickOpenDel}
          >
            Delete city
          </Button>
        </div>

        <Dialog
          open={this.state.openDeleteConfirmation}
          onClose={this.handleCloseDel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <p>Are you sure you want to delete {this.state.name}? </p>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.onDeleteClick(this.state.name)}
              color="primary"
            >
              Yes, delete
            </Button>
            <Button onClick={this.handleCloseDel} color="primary" autoFocus>
              No, go back
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Editcity.propTypes = {
  deleteCity: PropTypes.func,
  cities: PropTypes.object,
  getCities: PropTypes.func,
  updateCity: PropTypes.func,
  addSuccess: PropTypes.func,
  match: PropTypes.object
};

const mapStateToProps = state => ({
  cities: state.cities
});

export default connect(
  mapStateToProps,
  { deleteCity, getCities, updateCity, addSuccess }
)(Editcity);
