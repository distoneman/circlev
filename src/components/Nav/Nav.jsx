import React, { Component } from "react";
import { Link } from "react-router-dom";

import './Nav.css';

import imgBeef from './../../images/beef.png';
import imgPork from './../../images/pork.png';
import imgSheep from './../../images/sheep.png';
import imgOther from './../../images/other.png';
// import imgV from './../../images/v.png';
import imgSearch from './../../images/search2.png';
import imgSettings from './../../images/settings.png';

export default class Nav extends Component {


    render() {
        return (
            <div className='nav-bar'>
                <div>
                    <Link to="/beef">
                        <img src={imgBeef} alt="Beef Icon" className="nav-icon" />
                    </Link>
                </div>
                <div className="pork-icon-container">
                    <Link to="/pork">
                        <img src={imgPork} alt="Pork Icon" className="nav-icon" />
                    </Link>
                </div>
                <div className="sheep-icon-container">
                    <Link to="/sheep">
                        <img src={imgSheep} alt="Sheep Icon" className="nav-icon" />
                    </Link>
                </div>
                <div className="other-icon-container">
                    <Link to="/other">
                        <img src={imgOther} alt="Other Icon" className="nav-icon" />
                    </Link>
                </div>
                <div className="search-icon-container">
                    <Link to="/search">
                        <img src={imgSearch} alt="Search Icon" className="search-icon"/>
                    </Link>
                </div>
                <div className="settings-icon-container">
                    <img src={imgSettings} alt="" className="settings-icon"/>
                </div>
            </div>
        )
    }
}