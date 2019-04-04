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
import { getComments, addComment, deleteComment } from "../actions/commentActions"


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
 
  handleExpandClick = () => {
    this.props.toggle(this.props.itinerary._id);
    if(!this.props.isOpen) {
      const itineraryId = this.props.itinerary._id
      this.props.getActivities(itineraryId);
      this.props.getComments(itineraryId)
    }
/*     this.setState(state => ({ expanded: !state.expanded }));
 */    
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
          <Collapse in={this.props.isOpen} timeout="auto" mountOnEnter unmountOnExit>
            <CardContent>

              <Activity activities={this.props.activities} />
              <Comments comments={this.props.comments} addComment={this.props.addComment} itinerary={this.props.itinerary} deleteComment={this.props.deleteComment} />

            </CardContent>
          </Collapse>
          <CardActions className="card-actions" disableActionSpacing>

            <IconButton
              onClick={this.handleExpandClick}
              aria-expanded={this.props.isOpen}
              aria-label="Show more"
            >
              {this.props.isOpen ? <p> Close </p> : <p> View all </p>}
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
  activities: PropTypes.object,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  getComments: PropTypes.func,
  comments: PropTypes.object,
  addComment: PropTypes.func,
  deleteComment: PropTypes.func
};

const mapStateToProps = (state) => ({
  activities: state.activities,
  comments: state.comments
})


export default connect(mapStateToProps, { getActivities, getComments, addComment, deleteComment })(withStyles(styles)(Itinerary))
