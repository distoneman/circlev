import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

import './Settings.css';

export default class PorkPrices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slaughter: 0,
            cutWrap: 0,
            cure: 0,
            links: 0,
            fat: 0
        }
    }

    async componentDidMount() {
        const res = await axios.get('/pork/prices');
        await this.setState({
            slaughter: res.data[0].slaughter,
            cutWrap: res.data[0].cut_wrap,
            cure: res.data[0].cure,
            links: res.data[0].links,
            fat: res.data[0].fat
        })
        console.log(this.state)
    }

    handleChange = async (key, value) => {
        console.log('change')
        await this.setState({
            [key]: value.target.value
        });
    }

    update = async () => {
        console.log('update')
        await axios.put(`/pork/update_prices`, {
            slaughter: this.state.slaughter,
            cutWrap: this.state.cutWrap,
            cure: this.state.cure,
            links: this.state.links,
            fat: this.state.fat
        })
        Swal.fire({
            title: 'Pork Prices Updated',
            showCancelButton: false,
            confirmButtonColor: '#ff69b4',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oink'
        })

    }

    render() {
        return (
            <div>
                <div className='settings-update-form'>
                    <label className='settings-label-right'>Pork Slaughter:</label>
                    <input type="text" className='settings-text-input'
                        value={this.state.slaughter}
                        onChange={e => this.handleChange('slaughter', e)} />
                    <label className='settings-label-right'>Cut & Wrap:</label>
                    <input type="text" className='settings-text-input'
                        value={this.state.cutWrap}
                        onChange={e => this.handleChange('cutWrap', e)} />
                    <label className='settings-label-right'>Cure:</label>
                    <input type="text" className='settings-text-input'
                        value={this.state.cure}
                        onChange={e => this.handleChange('cure', e)} />
                    <label className='settings-label-right'>Links/Patties:</label>
                    <input type="text" className='settings-text-input'
                        value={this.state.links}
                        onChange={e => this.handleChange('links', e)} />
                    <label className='settings-label-right'>Fat Rendered:</label>
                    <input type="text" className='settings-text-input'
                        value={this.state.fat}
                        onChange={e => this.handleChange('fat', e)} />
                    <div />
                    <button className='settings-update-btn'
                        onClick={() => this.update()}>Update</button>

                </div>

            </div>
        )
    }
}
