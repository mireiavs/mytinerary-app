import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { logout } from "../actions/authActions";
import { connect } from "react-redux";

// Material UI imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import CitiesIcon from "@material-ui/icons/LocationCity";
import FavouritesIcon from "@material-ui/icons/Favorite";

class Header extends Component {
  state = {
    right: false,
    anchorEl: null,
    userImage: null
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    const user = this.props.user;

    const homeLink = props => <Link to="/" {...props} />;
    const citiesLink = props => <Link to="/cities/all" {...props} />;
    const logInLink = props => <Link to="/login" {...props} />;
    const createAccLink = props => <Link to="/createaccount" {...props} />;
    const dashboardLink = props => <Link to="/dashboard" {...props} />;
    /*         const addCityLink = props => <Link to="/cities/all/addcity" {...props} />
                const editCityLink = props => <Link to="/editcity" {...props} />
                const addItinLink = props => <Link to="/additinerary" {...props} />
                const editItinink = props => <Link to="/edititinerary" {...props} />
                const addActLink = props => <Link to="/addactivity" {...props} /> */

    const sideList = (
      <div className="side-list">
        <ListItem button component={homeLink}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>
        <ListItem button component={citiesLink}>
          <ListItemIcon>
            <CitiesIcon />
          </ListItemIcon>
          <ListItemText>Cities</ListItemText>
        </ListItem>
      </div>
    );

    const sideListAuth = (
      <div className="side-list">
        <ListItem button component={dashboardLink}>
          <ListItemIcon>
            <FavouritesIcon />
          </ListItemIcon>
          <ListItemText>Favourites</ListItemText>
        </ListItem>

        {/* <ListItem button component={addCityLink}>
                    <ListItemIcon><CitiesIcon /></ListItemIcon>
                    <ListItemText>Add a city</ListItemText>
                </ListItem>

                <ListItem button component={editCityLink}>
                    <ListItemIcon><CitiesIcon /></ListItemIcon>
                    <ListItemText>Edit a city</ListItemText>
                </ListItem>

                <ListItem button component={addItinLink}>
                    <ListItemIcon><CitiesIcon /></ListItemIcon>
                    <ListItemText>Add an itinerary</ListItemText>
                </ListItem>

                <ListItem button component={editItinink}>
                    <ListItemIcon><CitiesIcon /></ListItemIcon>
                    <ListItemText>Edit an itinerary</ListItemText>
                </ListItem>

                <ListItem button component={addActLink}>
                    <ListItemIcon><CitiesIcon /></ListItemIcon>
                    <ListItemText>Add an activity</ListItemText>
                </ListItem> */}
      </div>
    );

    return (
      <div>
        <AppBar position="fixed" color="default">
          <Toolbar className="header-toolbar">
            <div>
              <IconButton
                aria-owns={open ? "menu-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleMenu}
                color="inherit"
              >
                {this.props.isAuthenticated ? (
                  <div className="userimg">
                    <img src={user.userImage} alt="Userpic" />
                  </div>
                ) : (
                  <AccountCircle fontSize="large" />
                )}
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right"
                }}
                open={open}
                onClose={this.handleClose}
              >
                {this.props.isAuthenticated ? (
                  <div>
                    <MenuItem onClick={this.props.logout}>Log Out</MenuItem>
                  </div>
                ) : (
                  <div>
                    <MenuItem component={logInLink} onClick={this.handleClose}>
                      Log In
                    </MenuItem>
                    <MenuItem
                      component={createAccLink}
                      onClick={this.handleClose}
                    >
                      Create account
                    </MenuItem>
                  </div>
                )}
              </Menu>
            </div>

            <IconButton
              color="inherit"
              aria-label="Menu"
              onClick={this.toggleDrawer("right", true)}
            >
              <MenuIcon fontSize="large" />
            </IconButton>

            <SwipeableDrawer
              anchor="right"
              open={this.state.right}
              onClose={this.toggleDrawer("right", false)}
              onOpen={this.toggleDrawer("right", true)}
            >
              <div
                tabIndex={0}
                role="button"
                onClick={this.toggleDrawer("right", false)}
                onKeyDown={this.toggleDrawer("right", false)}
              >
                <List>
                  {sideList}
                  {this.props.isAuthenticated ? (
                    <div>{sideListAuth}</div>
                  ) : null}
                </List>
              </div>
            </SwipeableDrawer>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { logout }
)(Header);
