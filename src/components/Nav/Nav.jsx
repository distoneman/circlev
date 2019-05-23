import React, { Component } from "react";
import { Link } from "react-router-dom";

import './Nav.css';

import imgBeef from './../../images/beef.png';
import imgPork from './../../images/pork.png';
import imgSheep from './../../images/sheep.png';
import imgCircleV from './../../images/iconCircleV.png';
// import imgV from './../../images/v.png';
import imgGenInvoice from './../../images/iconBacon.png';
import imgSearch from './../../images/iconSearch.png';
import imgSettings from './../../images/iconSettings.png';

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
                    <Link to="/circlev">
                        <img src={imgCircleV} alt="Other Icon" className="search-icon" />
                    </Link>
                </div>
                <div className="gen-invoice-icon-container">
                    <Link to="/invoice">
                        <img src={imgGenInvoice} alt="General Invoice Icon" className="search-icon" />
                    </Link>
                </div>
                <div className="search-icon-container">
                    <Link to="/search">
                        <img src={imgSearch} alt="Search Icon" className="search-icon" />
                    </Link>
                </div>
                <div className="settings-icon-container">
                    <Link to="/other">
                        <img src={imgSettings} alt="" className="search-icon" />
                    </Link>
                </div>
            </div>
        )
    }
}