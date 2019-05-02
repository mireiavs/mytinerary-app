import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";

// Material UI imports
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import BackIcon from "@material-ui/icons/ArrowBackIos";
/* import ForwardIcon from '@material-ui/icons/ArrowForwardIos';
 */

class Footer extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <Fragment>
        <CssBaseline />
        <AppBar position="fixed" color="default" className="footer-bar">
          <div className="footer-icon">
            {this.props.location.pathname !== "/" ? (
              <IconButton color="inherit" onClick={this.goBack}>
                <BackIcon fontSize="large" className="footer-link" />
              </IconButton>
            ) : null}
          </div>

          <div className="footer-icon home-icon">
            <IconButton color="inherit">
              <Link to="/" className="footer-link">
                <HomeIcon fontSize="large" />
              </Link>
            </IconButton>
          </div>

          <div className="footer-icon">
            {/* <IconButton color="inherit" onClick={this.goForward}>
                <ForwardIcon fontSize="large" className="footer-link" />
                </IconButton> */}
          </div>
        </AppBar>
      </Fragment>
    );
  }
}

Footer.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object
};

export default withRouter(Footer);
