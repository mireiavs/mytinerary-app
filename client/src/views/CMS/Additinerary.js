import React, { Component } from "react";
import PropTypes from "prop-types";
import { addItinerary, addItSuccess } from "../../actions/itineraryActions";
import { addActivity } from "../../actions/activityActions";
import { connect } from "react-redux";
import Addactivity from "./Addactivity";

// Material UI imports
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
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
      activities: [{ activityImage: "", caption: "" }]
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onChange = e => {
    /*     let activities = [...this.state.activities];
    if (e.target.name.includes("caption")) {
      activities[e.target.dataset.id]["caption"] = e.target.value;
      this.setState({ activities });
    } else if (e.target.name.includes("img")) {
      activities[e.target.dataset.id]["img"] = e.target.files[0];
      this.setState({ activities });
    } else { */
    this.setState({ [e.target.name]: e.target.value });
    /* } */
  };

  addActivityForm = e => {
    this.setState(prevState => ({
      activities: [...prevState.activities, { activityImage: "", caption: "" }]
    }));
  };

  onActivityChange = (activityImage, caption, index) => {
    let { activities } = this.state;

    const newActivity = {
      activityImage,
      caption
    };

    activities[index] = newActivity;

    this.setState(activities);
  };
  onSubmit = e => {
    e.preventDefault();
    const { title, duration, price, activities } = this.state;
    const cityName = this.props.match.params.cityId;
    const hashtag = this.state.hashtag.replace("#", "").split(", ");
    const { username, userImage } = this.props.user;

    const newItinerary = {
      title,
      duration,
      price,
      hashtag,
      user: username,
      userImg: userImage,
      cityName
    };

    this.props.addItinerary(newItinerary, cityName);

    activities.forEach(activity => {
      let formData = new FormData();

      formData.append("caption", activity.caption);
      formData.append("itineraryId", title);
      formData.append("activityImage", activity.activityImage);

      this.props.addActivity(formData, activity.itineraryId);
    });
  };

  render() {
    return (
      <div>
        <h1>Build an itinerary</h1>

        <div>
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
            {this.state.activities.map((activity, index) => {
              return (
                <Addactivity
                  key={index}
                  actIndex={index}
                  activity={activity}
                  onChange={this.onActivityChange}
                />
              );
            })}

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
  addItinerary: PropTypes.func,
  match: PropTypes.object,
  user: PropTypes.object,
  addActivity: PropTypes.func
};

const mapStateToProps = state => ({
  activities: state.activities,
  addItSuccess: state.addSuccess,
  cities: state.cities,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { addItinerary, addItSuccess, addActivity }
)(AddItinerary);
