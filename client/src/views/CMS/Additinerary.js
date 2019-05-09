import React, { Component } from "react";
import PropTypes from "prop-types";
import { addItinerary, addItSuccess } from "../../actions/itineraryActions";
import { getCities } from "../../actions/citiesActions";
import { connect } from "react-redux";
import Addactivity from "./Addactivity";

// Material UI imports
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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
      activities: [{ img: "", caption: "" }]
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
  }

  handleChangeSelect = event => {
    const { cities } = this.props.cities;
    const city = cities.find(city => city.name === event.target.value);
    this.setState({ name: event.target.value, country: city.country });
  };
  onChange = e => {
    let activities = [...this.state.activities];
    if (e.target.name.includes("caption")) {
      activities[e.target.dataset.id]["caption"] = e.target.value;
      this.setState({ activities });
    } else if (e.target.name.includes("img")) {
      activities[e.target.dataset.id]["img"] = e.target.files[0];
      this.setState({ activities });
    } else {
      this.setState({ [e.target.name]: e.target.value });
    }
  };

  addActivityForm = e => {
    this.setState(prevState => ({
      activities: [...prevState.activities, { img: "", caption: "" }]
    }));
  };

  onSubmit = e => {
    e.preventDefault();
    const { title, duration, price, activities, name } = this.state;
    const hashtags = this.state.hashtag.replace("#", "").split(", ");
    const { username, userImg } = this.props.user;

    let formData = new FormData();

    formData.append("title", title);
    formData.append("duration", duration);
    formData.append("activities", activities);
    formData.append("price", price);
    formData.append("hashtag", hashtags);
    formData.append("cityName", name);
    formData.append("user", username);
    formData.append("userImg", userImg);

    this.props.addItinerary(formData, name);
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
    const { activities } = this.state;
    const { cities } = this.props.cities;
    const cityList = cities.map(city => (
      <MenuItem value={city.name} key={city._id}>
        {city.name}, {city.country}
      </MenuItem>
    ));

    return (
      <div>
        <h1>Build an itinerary</h1>

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
            encType="multipart/form-data"
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
            <Addactivity />
            {/*  {activities.map((activity, index) => {
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
                      onChange={this.onChange}
                    />
                  </CardContent>

                  <CardActions>
                    <label htmlFor={imgId}>Select image</label>
                    <input
                      type="file"
                      name={imgId}
                      data-id={index}
                      id={imgId}
                      onChange={this.onChange}
                    />
                    <IconButton aria-label="Delete" className="comment-delete">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </CardActions>
                </Card>
              );
            })} */}

            <div onClick={this.addActivityForm}>Add New Activity</div>

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
      </div>
    );
  }
}

AddItinerary.propTypes = {
  itineraries: PropTypes.object,
  addItinerary: PropTypes.func,
  match: PropTypes.object,
  user: PropTypes.object,
  getCities: PropTypes.func,
  cities: PropTypes.object
};

const mapStateToProps = state => ({
  itineraries: state.itineraries,
  addItSuccess: state.addSuccess,
  cities: state.cities,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { addItinerary, addItSuccess, getCities }
)(AddItinerary);
