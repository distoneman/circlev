import React, { Component } from 'react';

import './Settings.css'

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }

    }
    async componentDidMount() {

    }

    render() {
        return (
            <div className='settings-container'>
                <div className='settings-title'>
                    Settings
                </div>
                <hr/>
                <div className='settings-selection'>
                    <label className='settings-label-right'>Select Setting:</label>
                    <select name="settings-select" id="settings-select"
                        className='settings-select'
                        onChange={(e) => this.handleChange("settings", e)} >
                        <option value=""></option>
                        <option value="beefPrices">Beef Prices</option>
                        <option value="porkPrices">Pork Prices</option>
                        <option value="sheepPrices">Sheep Prices</option>
                    </select>
                </div>
                <hr/>
            </div>
        )
    }
}