import React, { Component } from "react";
import PropTypes from "prop-types";
import { getCities } from "../../actions/citiesActions";
import {
  deleteItinerary,
  getItineraries,
  updateItinerary,
  addItSuccess
} from "../../actions/itineraryActions";
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

class Edititinerary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      country: "",
      title: "",
      user: "",
      rating: "",
      duration: "",
      price: "",
      hashtag: "",
      cityName: "",
      itineraryId: "",
      openDeleteConfirmation: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClickAfterAdd = this.onClickAfterAdd.bind(this);
    this.handleChangeSelectCity = this.handleChangeSelectCity.bind(this);
    this.handleChangeSelectItinerary = this.handleChangeSelectItinerary.bind(
      this
    );
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.handleClickOpenDel = this.handleClickOpenDel.bind(this);
    this.handleCloseDel = this.handleCloseDel.bind(this);
  }

  /* When a city (handleChangeSelectCity) and an itinerary 
    (handleChangeSelectItinerary) are selected in the dropdown
    menus, the input fields are automatically populated
    so they can be edited */
  handleChangeSelectCity = event => {
    const { cities } = this.props.cities;
    const city = cities.find(city => city.name === event.target.value);
    this.setState({ name: event.target.value, country: city.country });
    this.props.getItineraries(city.name);
  };

  handleChangeSelectItinerary = event => {
    const { itineraries } = this.props.itineraries;
    const itinerary = itineraries.find(
      itinerary => itinerary.title === event.target.value
    );
    this.setState({
      title: event.target.value,
      /*          updatedTitle: event.target.value,
       */ user: itinerary.user,
      rating: itinerary.rating,
      duration: itinerary.duration,
      price: itinerary.price,
      hashtag: itinerary.hashtag,
      cityName: itinerary.cityName,
      itineraryId: itinerary._id
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const hashtags = this.state.hashtag.replace("#", "").split(", ");

    const updatedItinerary = {
      title: this.state.updatedTitle,
      user: this.state.user,
      rating: this.state.rating,
      duration: this.state.duration,
      price: this.state.price,
      hashtag: hashtags,
      cityName: this.state.cityName
    };
    this.props.updateItinerary(updatedItinerary, this.state.itineraryId);
  };

  onClickAfterAdd = () => {
    this.props.addItSuccess();
  };

  onDeleteClick = id => {
    this.props.deleteItinerary(id);
    this.setState({
      title: "",
      updatedTitle: "",
      user: "",
      rating: "",
      duration: "",
      price: "",
      hashtag: "",
      cityName: "",
      itineraryId: "",
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
  }

  /* If page is accessed from a specific itinerary, it will get the info
    from city and itinerary automatically, if not, it will get it from the 
    dropdown menus. Below we check if props have been updated (so the function 
    is only called when the props have been received)  and if there is a city ID 
    and an itinerary ID it sets the state with that info */
  componentDidUpdate(prevProps) {
    if (prevProps.cities.cities !== this.props.cities.cities) {
      if (this.props.match.params.cityId) {
        const cities = this.props.cities.cities;
        const city = cities.find(
          city => city.name === this.props.match.params.cityId
        );
        this.setState({ name: city.name, country: city.country });
        this.props.getItineraries(city.name);
      }
    }
    if (
      prevProps.itineraries.itineraries !== this.props.itineraries.itineraries
    ) {
      if (this.props.match.params.itineraryId) {
        const itineraries = this.props.itineraries.itineraries;
        const itinerary = itineraries.find(
          itinerary => itinerary._id === this.props.match.params.itineraryId
        );
        // Check if itinerary exists (for coming back to the form once the itinerary being deleted)
        if (itinerary) {
          this.setState({
            itineraryId: itinerary._id,
            title: itinerary.title,
            updatedTitle: itinerary.title,
            user: itinerary.user,
            rating: itinerary.rating,
            duration: itinerary.duration,
            price: itinerary.price,
            hashtag: itinerary.hashtag,
            cityName: itinerary.cityName
          });
        }
      }
    }
  }

  render() {
    const { cities } = this.props.cities;
    const { itineraries } = this.props.itineraries;
    const cityList = cities.map(city => (
      <MenuItem value={city.name} key={city._id}>
        {city.name}, {city.country}
      </MenuItem>
    ));
    const itineraryList = itineraries.map(itinerary => (
      <MenuItem value={itinerary.title} key={itinerary._id}>
        {itinerary.title}
      </MenuItem>
    ));
    const addItSuccess = this.props.itineraries.additsuccess;

    return (
      <div>
        <h1>Edit itinerary</h1>
        {!addItSuccess ? (
          <div>
            <form autoComplete="off" className="cms-form">
              <p>Select city:</p>
              <FormControl>
                <InputLabel htmlFor="name">City</InputLabel>
                <Select
                  value={this.state.name}
                  onChange={this.handleChangeSelectCity}
                  inputProps={{
                    name: "name",
                    id: "name"
                  }}
                >
                  {cityList}
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel htmlFor="title">Itinerary</InputLabel>
                <Select
                  value={this.state.title}
                  onChange={this.handleChangeSelectItinerary}
                  inputProps={{
                    name: "title",
                    id: "title"
                  }}
                >
                  {itineraryList}
                </Select>
              </FormControl>
            </form>

            <form
              id="itinerary-form"
              noValidate
              autoComplete="off"
              onSubmit={this.onSubmit}
              className="cms-form"
            >
              <TextField
                name="updatedTitle"
                id="updatedTitle"
                label="Title"
                value={this.state.updatedTitle}
                onChange={this.onChange}
                margin="normal"
                color="primary"
              />
              <TextField
                name="user"
                id="user"
                label="User"
                value={this.state.user}
                onChange={this.onChange}
                margin="normal"
                color="primary"
              />
              <TextField
                name="rating"
                id="rating"
                label="Rating"
                value={this.state.rating}
                onChange={this.onChange}
                margin="normal"
                color="primary"
              />
              <TextField
                name="duration"
                id="duration"
                label="Duration"
                value={this.state.duration}
                onChange={this.onChange}
                margin="normal"
                color="primary"
              />
              <div className="price-form">
                <InputLabel htmlFor="price">Price</InputLabel>
                <Select
                  value={this.state.price}
                  onChange={this.onChange}
                  inputProps={{
                    name: "price",
                    id: "price"
                  }}
                >
                  <MenuItem value="$">$</MenuItem>
                  <MenuItem value="$$">$$</MenuItem>
                  <MenuItem value="$$$">$$$</MenuItem>
                </Select>
              </div>
              <TextField
                name="hashtag"
                id="hashtag"
                label="Hashtags (e.g. Art, History)"
                value={this.state.hashtag}
                onChange={this.onChange}
                margin="normal"
                color="primary"
              />

              <Button
                variant="contained"
                size="medium"
                type="submit"
                form="itinerary-form"
              >
                Submit
              </Button>
            </form>
          </div>
        ) : (
          <div className="success-msg">
            <p>Itinerary updated successfully!</p>
            <Button
              variant="contained"
              size="medium"
              onClick={this.onClickAfterAdd}
            >
              Edit another itinerary
            </Button>
          </div>
        )}
        <div className="delete-btn">
          <Button
            variant="contained"
            size="medium"
            onClick={this.handleClickOpenDel}
          >
            Delete itinerary
          </Button>
        </div>
        <Dialog
          open={this.state.openDeleteConfirmation}
          onClose={this.handleCloseDel}
          aria-labelledby="alert-dialog-title"
          f
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <p>Are you sure you want to delete {this.state.title}? </p>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => this.onDeleteClick(this.state.itineraryId)}
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

Edititinerary.propTypes = {
  deleteItinerary: PropTypes.func,
  cities: PropTypes.object,
  itineraries: PropTypes.object,
  getCities: PropTypes.func,
  getItineraries: PropTypes.func,
  updateItinerary: PropTypes.func,
  addItSuccess: PropTypes.func,
  match: PropTypes.object
};

const mapStateToProps = state => ({
  cities: state.cities,
  itineraries: state.itineraries
});

export default connect(
  mapStateToProps,
  { deleteItinerary, getCities, getItineraries, updateItinerary, addItSuccess }
)(Edititinerary);
