import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CitiesIcon from "@material-ui/icons/LocationCity";
import LogInIcon from "@material-ui/icons/ExitToApp";
import CreateAccIcon from "@material-ui/icons/PersonAdd";


const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
};

class Header extends Component {
    state = {
        right: false,
        anchorEl: null,
    };
    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const sideList = (
            <div className={classes.list}>
                <List>
                    <ListItem button>
                        <ListItemIcon><CitiesIcon /></ListItemIcon>
                        <ListItemText>Cities</ListItemText>
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon><LogInIcon /></ListItemIcon>
                        <ListItemText>Log In</ListItemText>
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon><CreateAccIcon /></ListItemIcon>
                        <ListItemText>Create account</ListItemText>
                    </ListItem>

                </List>
            </div>
        );
        return (
            <div className={classes.root}>
                <AppBar position="fixed" color="default">
                    <Toolbar className="toolbar-main">
                        <div>
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleMenu}
                                color="inherit"

                            >
                                <AccountCircle fontSize="large" />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={this.handleClose}
                            >
                                <Link to="/login"> <MenuItem onClick={this.handleClose}>Log In</MenuItem></Link>
                                <Link to="/createaccount"><MenuItem onClick={this.handleClose}>Create account</MenuItem></Link>
                            </Menu>
                        </div>


                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.toggleDrawer('right', true)}>
                            <MenuIcon fontSize="large" />
                        </IconButton>

                        <SwipeableDrawer
                            anchor="right"
                            open={this.state.right}
                            onClose={this.toggleDrawer('right', false)}
                            onOpen={this.toggleDrawer('right', true)}
                        >
                            <div
                                tabIndex={0}
                                role="button"
                                onClick={this.toggleDrawer('right', false)}
                                onKeyDown={this.toggleDrawer('right', false)}
                            >
                                {sideList}
                            </div>
                        </SwipeableDrawer>



                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);