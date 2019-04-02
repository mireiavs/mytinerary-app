import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Activity from "./Activity"
import Comments from "./Comments"
import { connect } from "react-redux"
import { getActivities } from "../actions/activityActions"


const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
});

class Itinerary extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
  }
  handleExpandClick = () => {
    if(!this.state.expanded) {
      const itineraryId = this.props.itinerary._id
      this.props.getActivities(itineraryId)
    }
    this.setState(state => ({ expanded: !state.expanded }));
  };
  render() {
    const { classes } = this.props;
    const itinerary = this.props.itinerary
    const hashtags = itinerary.hashtag.map((hashtag, index) => <span key={index}>&#35;{hashtag} </span>)
    return (
      <div className="itinerary-card">
        <Card className={classes.card}>
          <CardContent className="card-summary">

            <div className="profile-pic-container">
              <Avatar alt="User logo" src={require("../images/" + itinerary.user + ".png")} className={classes.bigAvatar} />
              <p>{itinerary.user}</p>

            </div>

            <div className="itinerary-title-details">
              <h4>{itinerary.title}</h4>
              <div className="itinerary-detail-preview">
                <span>Likes: {itinerary.rating} </span>
                <span>{itinerary.duration} hours</span>
                <span>{itinerary.price}</span>
                <p>{hashtags}</p>
              </div>
            </div>


          </CardContent>
          <Collapse in={this.state.expanded} timeout="auto" mountOnEnter unmountOnExit>
            <CardContent>

              <Activity activities={this.props.activities} />
              <Comments />

            </CardContent>
          </Collapse>
          <CardActions className="card-actions" disableActionSpacing>

            <IconButton
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              {this.state.expanded ? <p> Close </p> : <p> View all </p>}
            </IconButton>
          </CardActions>

        </Card>
      </div>
    );
  }
}

Itinerary.propTypes = {
  classes: PropTypes.object.isRequired,
  itinerary: PropTypes.object,
  loading: PropTypes.bool,
  getActivities: PropTypes.func,
  activities: PropTypes.object
};

const mapStateToProps = (state) => ({
  activities: state.activities,
  loading: state.loading
})


export default connect(mapStateToProps, { getActivities })(withStyles(styles)(Itinerary))
