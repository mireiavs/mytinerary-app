import React, { Component } from "react";
import PropTypes from "prop-types";
import { addItinerary, addItSuccess } from "../../actions/itineraryActions";
import { getCities } from "../../actions/citiesActions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

// Material UI imports
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

class AddItinerary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      country: "",
      title: "",
      user: "",
      userImg: "",
      duration: "",
      price: "",
      hashtag: [],
      cityName: "",
      activities: [{ img: null, caption: "" }]
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClickAfterAdd = this.onClickAfterAdd.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
  }

  handleChangeSelect = event => {
    const { cities } = this.props.cities;
    const { activities } = this.state;
    const city = cities.find(city => city.name === event.target.value);
    this.setState({ name: event.target.value, country: city.country });
  };
  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  onSubmit = e => {
    e.preventDefault();

    const hashtags = this.state.hashtag.replace("#", "").split(", ");

    const newItinerary = {
      title: this.state.title,
      user: this.props.user.username,
      userImg: this.props.user.userImage,
      duration: this.state.duration,
      price: this.state.price,
      hashtag: hashtags,
      cityName: this.state.name,
      activities: this.state.activities
    };
    this.props.addItinerary(newItinerary, this.props.match.params.cityId);
  };
  onClickAfterAdd = () => {
    this.props.addItSuccess();
  };
  componentDidMount() {
    this.props.getCities();
  }

  /* If page is accessed from a specific city, it will get the info from 
    the city automatically, if not, it will get it from the dropdown menu.
    Below we check if props have been updated (so the function is only called
    when the props have been received) and if there is a city ID it sets 
    the state with that info */
  componentDidUpdate(prevProps) {
    if (prevProps.cities.cities !== this.props.cities.cities) {
      if (this.props.match.params.cityId) {
        const cities = this.props.cities.cities;
        const city = cities.find(
          city => city.name === this.props.match.params.cityId
        );
        this.setState({ name: city.name, country: city.country });
      }
    }
  }
  render() {
    const addItSuccess = this.props.itineraries.additsuccess;
    const { activities } = this.state;
    const { cities } = this.props.cities;
    const cityList = cities.map(city => (
      <MenuItem value={city.name} key={city._id}>
        {city.name}, {city.country}
      </MenuItem>
    ));

    var newItineraryId = "";

    if (addItSuccess) {
      newItineraryId = this.props.itineraries.itineraries.find(
        itinerary => itinerary.title === this.state.title
      )._id;
    }

    return (
      <div>
        <h1>Build an itinerary</h1>

        {!addItSuccess ? (
          <div>
            <div className="cms-form">
              <p>Select city:</p>
              <form autoComplete="off">
                <FormControl>
                  <InputLabel htmlFor="name">City</InputLabel>
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
            </div>

            <form
              id="itinerary-form"
              noValidate
              autoComplete="off"
              onSubmit={this.onSubmit}
              className="cms-form"
            >
              <TextField
                name="title"
                id="title"
                label="Title"
                value={this.state.title}
                onChange={this.onChange}
                margin="normal"
                color="primary"
                className="big-form"
              />
              <div className="duration-price">
                <InputLabel htmlFor="duration">Duration:</InputLabel>
                <Select
                  value={this.state.duration}
                  onChange={this.onChange}
                  inputProps={{
                    name: "duration",
                    id: "duration"
                  }}
                  className="select"
                >
                  <MenuItem value="4 hours">4 hours</MenuItem>
                  <MenuItem value="12 hours">12 hours</MenuItem>
                  <MenuItem value="3 days">3 days</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>

                <InputLabel htmlFor="price">Price:</InputLabel>
                <Select
                  value={this.state.price}
                  onChange={this.onChange}
                  inputProps={{
                    name: "price",
                    id: "price"
                  }}
                  className="select"
                >
                  <MenuItem value="$">$</MenuItem>
                  <MenuItem value="$$">$$</MenuItem>
                  <MenuItem value="$$$">$$$</MenuItem>
                  <MenuItem value="$$$$">$$$$</MenuItem>
                </Select>
              </div>

              <TextField
                name="hashtag"
                id="hashtag"
                label="Hashtags (e.g. Art, History)"
                value={this.state.hashtag}
                onChange={this.onChange}
                margin="normal"
                className="big-form"
              />

              {activities.map((activity, index) => {
                let captionId = `caption-${index}`,
                  imgId = `img-${index}`;

                return (
                  <Card className="add-activity" key={index}>
                    <CardContent>
                      <label htmlFor={captionId}>{`Activity #${index +
                        1}`}</label>
                      <input
                        type="text"
                        name={captionId}
                        data-id={index}
                        id={captionId}
                        value={activities[index].caption}
                        className="caption"
                      />
                    </CardContent>

                    <CardActions>
                      <label htmlFor={imgId}>Select image</label>
                      <input
                        type="file"
                        name={imgId}
                        data-id={index}
                        id={imgId}
                        className="img"
                        value={activities[index].img}
                      />

                      {/* <span>Upload image:</span>
                      <input
                        type="file"
                        name={imgId}
                        onChange={this.onChange}
                      />
                      <IconButton
                        aria-label="Delete"
                        className="comment-delete"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton> */}
                    </CardActions>
                  </Card>
                );
              })}

              <Button
                variant="contained"
                size="medium"
                type="submit"
                form="itinerary-form"
              >
                Save
              </Button>
            </form>
          </div>
        ) : (
          <div className="success-msg">
            <p>Itinerary added successfully!</p>
            <Link
              to={`/cities/${this.state.name}/${newItineraryId}/addactivity`}
            >
              Start adding activities to it
            </Link>
            <Button
              variant="contained"
              size="medium"
              onClick={this.onClickAfterAdd}
            >
              Add another itinerary
            </Button>
          </div>
        )}
      </div>
    );
  }
}

AddItinerary.propTypes = {
  itineraries: PropTypes.object,
  addItinerary: PropTypes.func,
  additsuccess: PropTypes.bool,
  addItSuccess: PropTypes.func,
  match: PropTypes.object,
  user: PropTypes.object,
  getCities: PropTypes.func,
  cities: PropTypes.object
};

const mapStateToProps = state => ({
  itineraries: state.itineraries,
  additsuccess: state.addsuccess,
  addItSuccess: state.addSuccess,
  cities: state.cities,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { addItinerary, addItSuccess, getCities }
)(AddItinerary);
