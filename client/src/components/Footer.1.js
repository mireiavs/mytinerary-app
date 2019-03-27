import React from 'react';
import homeIcon from "../images/homeIcon.png"
import {Link} from "react-router-dom"

const Footer = () => {
    return (
        <div className="bottom-nav fixed-bottom">
            <Link to="/">
                <img src={homeIcon} alt="home icon" className="home-icon"></img>
            </Link>
        </div>
    )
}


export default Footer