import React, { Component } from "react";
import { Link } from "react-router-dom";
import { slide as Menu } from 'react-burger-menu'

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuOpen: false
        }
    }
    closeMenu() {
        this.setState({ menuOpen: false })
    }
    render() {
        return (
            <div className="nav fixed-top">
                <div className="dropdown userpic">
                    <button className="btn btn-default dropdown-toggle userpic" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span><i className="far fa-user-circle fa-2x"></i></span>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <Link className="dropdown-item" to="/createaccount">Create account</Link>
                        <Link className="dropdown-item" to="/login">Login</Link>
                    </div>
                </div>
                <Menu right isOpen={this.state.menuOpen}>
                    <Link id="home" className="menu-item hamb-link" to="/" onClick={() => this.closeMenu()}>Home</Link>
                    <Link id="about" className="menu-item hamb-link" to="/cities" onClick={() => this.closeMenu()}>About</Link>
                    <Link id="contact" className="menu-item hamb-link" to="/" onClick={() => this.closeMenu()}>Contact</Link>
                </Menu>

            </div>
        )
    }
}

export default Header