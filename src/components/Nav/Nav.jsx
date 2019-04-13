import React, { Component } from "react";
import { Link } from "react-router-dom";

import './Nav.css';

import imgBeef from './../../images/beef.png';
import imgPork from './../../images/pork.png';
import imgSheep from './../../images/sheep.png';
import imgOther from './../../images/other.png';

export default class Nav extends Component {


    render() {
        return (
            <div className='nav-bar'>
                <div>
                    <Link to="/beef">
                        <img src={imgBeef} alt="Beef Icon" className="beef-icon" />
                    </Link>
                </div>
                <div className="pork-icon-container">
                    <Link to="/pork">
                        <img src={imgPork} alt="Pork Icon" className="beef-icon" />
                    </Link>
                </div>
                <div className="sheep-icon-container">
                    <Link to="/sheep">
                        <img src={imgSheep} alt="Sheep Icon" className="beef-icon" />
                    </Link>
                </div>
                <div className="other-icon-container">
                    <Link to="/other">
                        <img src={imgOther} alt="Other Icon" className="beef-icon" />
                    </Link>
                </div>
            </div>
        )
    }
}