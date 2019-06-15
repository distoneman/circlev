import React, { Component } from 'react';
import Axios from 'axios';

import BeefPrices from './BeefPrices';
import PorkPrices from './PorkPrices';
import SheepPrices from './SheepPrices';

import './Settings.css'

export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            setting: null,
            beefPrices: {},
            porkPrices: {},
            sheepPrices: {}
        }
    }

    async componentDidMount() {

    }

    getPrices = async (key, value) => {
        await this.setState({
            [key]: value.target.value
        });
        if (this.state.setting === 'beefPrices') {
            const res = await Axios.get('/beef/prices');
            await this.setState({
                beefPrices: res.data[0]
            })
            console.log(this.state.beefPrices)
            console.log(this.state)
            console.log(this.state.beefPrices.slaughter)
        }
        if (this.state.setting === 'porkPrices') {
            const res = await Axios.get('/pork/prices');
            await this.setState({
                porkPrices: res.data
            })
            console.log(this.state.porkPrices)
        }
        if (this.state.setting === 'sheepPrices') {
            const res = await Axios.get('/sheep/prices');
            await this.setState({
                sheepPrices: res.data
            })
            console.log(this.state.sheepPrices)
        }

    }

    handleChange = async (key, value) => {
        await this.setState({
            [key]: value.target.value
        });
        console.log(`${key} is ${this.state[key]}`);
    }

    render() {
        return (
            <div className='settings-container'>
                <div className='settings-title'>
                    Settings
                </div>
                <hr />
                <div className='settings-selection'>
                    <label className='settings-label-right'>Select Setting:</label>
                    <select name="settings-select" id="settings-select"
                        className='settings-select'
                        onChange={(e) => this.getPrices("setting", e)} >
                        <option value=""></option>
                        <option value="beefPrices">Beef Prices</option>
                        <option value="porkPrices">Pork Prices</option>
                        <option value="sheepPrices">Sheep Prices</option>
                    </select>
                </div>
                <hr />
                {this.state.setting === 'beefPrices' ? (
                    <BeefPrices />
                ) : (null)}
                {this.state.setting === 'porkPrices' ? (
                    <PorkPrices />
                ) : (null)}
                {this.state.setting === 'sheepPrices' ? (
                    <SheepPrices />
                ) : (null)}

            </div>
        )
    }
}