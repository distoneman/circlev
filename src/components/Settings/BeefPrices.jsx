import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

import './Settings.css';

export default class BeefPrices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slaughter: 0,
            cutWrap: 0,
            patties: 0,
            brand: 0
        }
    }

    async componentDidMount() {
        const res = await axios.get('/beef/prices');
        await this.setState({
            slaughter: res.data[0].slaughter,
            cutWrap: res.data[0].cut_wrap,
            patties: res.data[0].patties,
            brand: res.data[0].brand
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
        await axios.put(`/beef/update_prices`, {
            slaughter: this.state.slaughter,
            cutWrap: this.state.cutWrap,
            patties: this.state.patties,
            brand: this.state.brand
        })
        Swal.fire({
            title: 'Beef Prices Updated',
            showCancelButton: false,
            confirmButtonColor: '#d3d3d3',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Moo'
        })

    }

    render() {
        return (
            <div>
                <div className='settings-update-form'>
                    <label className='settings-label-right'>Beef Slaughter:</label>
                    <input type="text" className='settings-text-input'
                        value={this.state.slaughter}
                        onChange={e => this.handleChange('slaughter', e)} />
                    <label className='settings-label-right'>Cut & Wrap:</label>
                    <input type="text" className='settings-text-input'
                        value={this.state.cutWrap}
                        onChange={e => this.handleChange('cutWrap', e)} />
                    <label className='settings-label-right'>Patties:</label>
                    <input type="text" className='settings-text-input'
                        value={this.state.patties}
                        onChange={e => this.handleChange('patties', e)} />
                    <label className='settings-label-right'>Brand:</label>
                    <input type="text" className='settings-text-input'
                        value={this.state.brand}
                        onChange={e => this.handleChange('brand', e)} />
                    <div />
                    <button className='settings-update-btn'
                        onClick={() => this.update()}>Update</button>

                </div>

            </div>
        )
    }
}
