import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

import './Settings.css';

export default class SheepPrices extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slaughter: 0,
            cutWrap: 0,
            boneRoll: 0
        }
    }

    async componentDidMount() {
        const res = await axios.get('/sheep/prices');
        console.log(res.data)
        await this.setState({
            slaughter: res.data[0].slaughter,
            cutWrap: res.data[0].cut_wrap,
            boneRoll: res.data[0].bone_roll
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
        await axios.put(`/sheep/update_prices`, {
            slaughter: this.state.slaughter,
            cutWrap: this.state.cutWrap,
            boneRoll: this.state.boneRoll
        })
        Swal.fire({
            title: 'Sheep Prices Updated',
            showCancelButton: false,
            confirmButtonColor: '#d3d3d3',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Baa'
        })

    }

    render() {
        return (
            <div>
                <div className='settings-update-form'>
                    <label className='settings-label-right'>Sheep Slaughter:</label>
                    <input type="text" className='settings-text-input'
                        value={this.state.slaughter}
                        onChange={e => this.handleChange('slaughter', e)} />
                    <label className='settings-label-right'>Cut & Wrap:</label>
                    <input type="text" className='settings-text-input'
                        value={this.state.cutWrap}
                        onChange={e => this.handleChange('cutWrap', e)} />
                    <label className='settings-label-right'>Bone & Roll:</label>
                    <input type="text" className='settings-text-input'
                        value={this.state.boneRoll}
                        onChange={e => this.handleChange('boneRoll', e)} />
                    <div />
                    <button className='settings-update-btn'
                        onClick={() => this.update()}>Update</button>
                </div>
            </div>
        )
    }
}
