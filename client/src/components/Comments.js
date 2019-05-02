import React, { Component } from "react";
import PropTypes from "prop-types";
import Loader from "./Loader";
import { Link } from "react-router-dom";

// Material UI imports
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Input from "@material-ui/core/Input";

class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      error: false
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    const date = new Date();

    if (this.props.user) {
      const newComment = {
        itineraryId: this.props.itinerary._id,
        user: this.props.user.username,
        message: this.state.message,
        timestamp: date
      };
      this.props.addComment(newComment, this.props.itinerary._id);
      this.setState({
        message: ""
      });
    } else {
      this.setState({
        error: true
      });
    }
  };

  // Function to delete the message when the corresponding icon is clicked
  onDeleteClick = id => {
    this.props.deleteComment(id);
  };

  render() {
    const comments = this.props.comments.comments;
    const isLoading = this.props.comments.loading;

    const commentList = comments.map(comment => {
      let className = "comment-card";
      if (this.props.user && comment.user === this.props.user.username) {
        className += " sameuser";
      }
      return (
        <div key={comment._id}>
          <Card className={className}>
            <CardContent>
              <div className="comment-header">
                <p className="comment-user">{comment.user}</p>

                {this.props.user &&
                comment.user === this.props.user.username ? (
                  <IconButton
                    aria-label="Delete"
                    className="comment-delete"
                    onClick={this.onDeleteClick.bind(this, comment._id)}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                ) : null}
              </div>
              <p>{comment.message}</p>
            </CardContent>
          </Card>
        </div>
      );
    });

    return (
      <div>
        <h4>Comments</h4>
        <form onSubmit={this.onSubmit} id="comment-form">
          {this.props.user ? (
            <div className="add-comment">
              <Input
                placeholder="Your Comment"
                value={this.state.message}
                name="message"
                onChange={this.onChange}
              />
              <Button
                variant="contained"
                size="small"
                type="submit"
                form="comment-form"
              >
                Send
              </Button>
            </div>
          ) : (
            <div>
              <p>
                Please <Link to="/login">log in</Link> to post comments
              </p>
            </div>
          )}
        </form>
        <div>
          {isLoading ? (
            <Loader />
          ) : (
            <div>
              {comments.length === 0 ? (
                <p>No comments yet.</p>
              ) : (
                <div>{commentList}</div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.object,
  addComment: PropTypes.func,
  match: PropTypes.object,
  itinerary: PropTypes.object,
  deleteComment: PropTypes.func,
  user: PropTypes.object
};

export default Comments;
