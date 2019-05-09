import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  addActivity,
  addAcSuccess,
  getActivities
} from "../../actions/activityActions";
import { getCities } from "../../actions/citiesActions";
import { getItineraries } from "../../actions/itineraryActions";
import { connect } from "react-redux";

// Material UI imports
import MenuItem from "@material-ui/core/MenuItem";
/* import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
 */
class Addactivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      country: "",
      title: "",
      itineraryId: "",
      caption: "",
      activityImage: null,
      imgPreview: null
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onClickAfterAdd = this.onClickAfterAdd.bind(this);
    this.handleChangeSelectCity = this.handleChangeSelectCity.bind(this);
    this.handleChangeSelectItinerary = this.handleChangeSelectItinerary.bind(
      this
    );
  }

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
      itineraryId: itinerary._id,
      title: itinerary.title
    });
  };

  onChange = e => {
    switch (e.target.name) {
      case "activityImage":
        this.setState({
          activityImage: e.target.files[0],
          imgPreview: URL.createObjectURL(e.target.files[0])
        });
        break;
      default:
        this.setState({ [e.target.name]: e.target.value });
    }
  };

  onSubmit = e => {
    e.preventDefault();
    const { caption, activityImage, itineraryId } = this.state;

    let formData = new FormData();

    formData.append("caption", caption);
    formData.append("itineraryId", itineraryId);
    formData.append("activityImage", activityImage);

    this.props.addActivity(formData, itineraryId);

    this.setState({
      caption: ""
    });
  };

  onClickAfterAdd = () => {
    this.props.addAcSuccess();
  };

  componentDidMount() {
    this.props.getCities();
  }

  clearImg = () => {
    this.setState({
      activityImage: null,
      imgPreview: null
    });
  };

  /* If page is accessed from a specific itinerary, it will get the info from city
    and itinerary automatically, if not, it will get it from the dropdown menus. 
    Below we check if props have been updated (so the function is only called when
    the props have been received) and if there is a city ID and an itinerary ID 
    it sets the state with that info */
  componentDidUpdate(prevProps) {
    if (prevProps.cities.cities !== this.props.cities.cities) {
      if (this.props.match.params.cityId) {
        const cities = this.props.cities.cities;
        const city = cities.find(
          city => city.name === this.props.match.params.cityId
        );
        this.setState({
          name: city.name,
          country: city.country
        });
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
        this.setState({
          itineraryId: itinerary._id,
          title: itinerary.title
        });
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

    return {
      /* <Card className="add-activity" key={index}>
        <CardContent>
          <label htmlFor={captionId}>{`Activity #${index + 1}`}</label>
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
      </Card> */
    };
  }
}

Addactivity.propTypes = {
  activities: PropTypes.object,
  addActivity: PropTypes.func,
  addacsuccess: PropTypes.bool,
  addAcSuccess: PropTypes.func,
  match: PropTypes.object,
  cities: PropTypes.object,
  itineraries: PropTypes.object,
  getItineraries: PropTypes.func,
  getCities: PropTypes.func
};

const mapStateToProps = state => ({
  activities: state.activities,
  addacsuccess: state.addacsuccess,
  cities: state.cities,
  itineraries: state.itineraries
});

export default connect(
  mapStateToProps,
  { addActivity, addAcSuccess, getCities, getItineraries, getActivities }
)(Addactivity);
