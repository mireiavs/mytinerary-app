import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Activity from "./Activity";
import Comments from "./Comments";
import {
  getComments,
  addComment,
  deleteComment
} from "../actions/commentActions";
import { addFavourite, deleteFavourite } from "../actions/authActions";
import {
  setItineraryRating,
  setItineraryLikes
} from "../actions/itineraryActions";
import StarRatings from "react-star-ratings";

// Material UI imports
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import FavouriteIcon from "@material-ui/icons/Favorite";
import FavouriteBorderIcon from "@material-ui/icons/FavoriteBorder";

class Itinerary extends Component {
  constructor(props) {
    super(props);
    this.handleExpandClick = this.handleExpandClick.bind(this);
    this.onClickAdd = this.onClickAdd.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.changeRating = this.changeRating.bind(this);
    this.handleClickOpenDel = this.handleClickOpenDel.bind(this);
    this.handleCloseDel = this.handleCloseDel.bind(this);

    this.state = {
      notLoggedIn: false,
      openDeleteConfirmation: false
    };
  }

  /* Function to handle collapse of itinerary cards. isOpen variable is passed from parent component as it has a function to close all other cards when one is open */
  handleExpandClick = () => {
    this.props.toggle(this.props.itinerary._id);
    if (!this.props.isOpen) {
      const itineraryId = this.props.itinerary._id;
      this.props.getComments(itineraryId);
    }
  };

  onClickAdd() {
    const date = new Date();
    const newFavourite = {
      itineraryId: this.props.itinerary._id,
      timestamp: date
    };
    const newLikes = this.props.itinerary.likes + 1;

    var userId = this.props.user._id || this.props.user.id;

    this.props.addFavourite(newFavourite, userId);
    this.props.setItineraryLikes(newLikes, this.props.itinerary._id);
  }

  handleClickOpenDel = () => {
    this.setState({ openDeleteConfirmation: true });
  };

  handleCloseDel = () => {
    this.setState({ openDeleteConfirmation: false });
  };

  onClickDelete() {
    const newLikes = this.props.itinerary.likes - 1;

    var userId = this.props.user._id || this.props.user.id;

    this.props.deleteFavourite(this.props.itinerary._id, userId);
    this.props.setItineraryLikes(newLikes, this.props.itinerary._id);

    this.setState({ openDeleteConfirmation: false });
  }

  changeRating(newRating) {
    if (this.props.auth.isAuthenticated) {
      this.props.setItineraryRating(newRating, this.props.itinerary._id);
    } else {
      this.setState({
        notLoggedIn: true
      });
    }
  }

  render() {
    const itinerary = this.props.itinerary;
    var isFavourite = false;
    const hashtagList = this.props.itinerary.hashtag.map((hashtag, index) => (
      <div key={index}>
        <Link to={`/itineraries/${hashtag}`}>#{hashtag}</Link>
      </div>
    ));

    if (this.props.auth.favourites) {
      isFavourite = this.props.auth.favourites.find(
        favourite => favourite.itineraryId === itinerary._id
      );
    }

    return (
      <Card className="itinerary-card">
        <CardContent className="itinerary-card__visible-text">
          <div className="itinerary-user-img">
            <Avatar alt="User logo" src={itinerary.userImg} />
            <p>{itinerary.user}</p>
          </div>
          <div className="itinerary-title-details">
            <div className="itinerary-title-fav">
              <h4>{itinerary.title}</h4>
              <div>
                {this.props.auth.isAuthenticated ? (
                  <div>
                    {isFavourite ? (
                      <IconButton
                        aria-label="Favourite"
                        onClick={this.handleClickOpenDel}
                      >
                        <FavouriteIcon className="fav-icon" />
                      </IconButton>
                    ) : (
                      <IconButton
                        aria-label="Favourite"
                        onClick={this.onClickAdd}
                      >
                        <FavouriteBorderIcon />
                      </IconButton>
                    )}
                  </div>
                ) : null}
              </div>
            </div>
            <Dialog
              open={this.state.openDeleteConfirmation}
              onClose={this.handleCloseDel}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogContent>
                <p>
                  Are you sure you want to delete {itinerary.title} from your
                  favourites?
                </p>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.onClickDelete} color="primary">
                  Yes, delete
                </Button>
                <Button onClick={this.handleCloseDel} color="primary" autoFocus>
                  No, go back
                </Button>
              </DialogActions>
            </Dialog>
            <div className="itinerary-detail-preview">
              <div className="details">
                <div>Likes: {itinerary.likes}</div>
                <div>Price: {itinerary.price}</div>
                <div>Duration: {itinerary.duration} hrs</div>
              </div>
              <div className="hashtag-list">{hashtagList}</div>
            </div>
            <StarRatings
              rating={itinerary.rating}
              starRatedColor="rgb(109, 122, 130)"
              starHoverColor="yellow"
              changeRating={this.changeRating}
              numberOfStars={5}
              name="rating"
              starDimension="30px"
            />
          </div>
        </CardContent>
        <Collapse
          in={this.props.isOpen}
          timeout="auto"
          mountOnEnter
          unmountOnExit
        >
          <CardContent>
            <Activity activities={itinerary.activities} />
            <div>
              {this.props.auth.isAuthenticated ? (
                <Link
                  to={`/cities/${this.props.itinerary.cityName}/${
                    this.props.itinerary._id
                  }/addactivity`}
                >
                  Add an activity
                </Link>
              ) : null}
            </div>

            <Comments
              comments={this.props.comments}
              addComment={this.props.addComment}
              itinerary={this.props.itinerary}
              deleteComment={this.props.deleteComment}
              user={this.props.user}
            />

            <div>
              {this.props.auth.isAuthenticated ? (
                <Link
                  to={`/cities/${this.props.itinerary.cityName}/${
                    this.props.itinerary._id
                  }/edititinerary`}
                >
                  Edit itinerary
                </Link>
              ) : null}
            </div>
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
    );
  }
}

Itinerary.propTypes = {
  itinerary: PropTypes.object,
  loading: PropTypes.bool,
  isOpen: PropTypes.bool,
  toggle: PropTypes.func,
  getComments: PropTypes.func,
  comments: PropTypes.object,
  addComment: PropTypes.func,
  deleteComment: PropTypes.func,
  user: PropTypes.object,
  getFavourites: PropTypes.func,
  favourites: PropTypes.object,
  addFavourite: PropTypes.func,
  deleteFavourite: PropTypes.func,
  auth: PropTypes.object,
  setItineraryRating: PropTypes.func,
  setItineraryLikes: PropTypes.func
};

const mapStateToProps = state => ({
  /*   activities: state.activities,
   */ comments: state.comments,
  auth: state.auth,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  {
    getComments,
    addComment,
    deleteComment,
    addFavourite,
    deleteFavourite,
    setItineraryRating,
    setItineraryLikes
  }
)(Itinerary);
