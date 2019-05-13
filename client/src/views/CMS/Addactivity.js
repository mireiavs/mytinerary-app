import React, { Component } from "react";
import PropTypes from "prop-types";
import { addActivity, addAcSuccess } from "../../actions/activityActions";
import { connect } from "react-redux";

// Material UI imports
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

class Addactivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: "",
      activityImage: null
    };
    this.onChange = this.onChange.bind(this);
    /*     this.onSubmit = this.onSubmit.bind(this);
     */
  }

  onChange = e => {
    switch (e.target.name) {
      case "activityImage":
        this.setState({
          activityImage: e.target.files[0]
        });
        break;
      default:
        this.setState({ [e.target.name]: e.target.value });
    }
    this.props.onChange(
      this.state.activityImage,
      this.state.caption,
      this.props.actIndex
    );
  };

  /*   onSubmit = e => {
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
  }; */

  /*   clearImg = () => {
    this.setState({
      activityImage: null,
      imgPreview: null
    });
  }; */

  render() {
    const index = this.props.actIndex;

    let captionId = `caption-${index}`,
      imgId = `img-${index}`;

    return (
      <Card className="add-activity" key={index}>
        <CardContent>
          <label htmlFor="caption">{`Activity #${index + 1}`}</label>
          <input
            type="text"
            name="caption"
            data-id={index}
            id={captionId}
            value={this.state.caption}
            onChange={this.onChange}
          />
        </CardContent>

        <CardActions>
          <label htmlFor="activityImage">Select image</label>
          <input
            type="file"
            name="activityImage"
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
  }
}

Addactivity.propTypes = {
  addActivity: PropTypes.func,
  match: PropTypes.object,
  actIndex: PropTypes.number,
  activity: PropTypes.object,
  onChange: PropTypes.func
};

export default connect(
  null,
  { addActivity, addAcSuccess }
)(Addactivity);
