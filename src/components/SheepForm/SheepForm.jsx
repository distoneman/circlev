import React, { Component } from "react";
import axios from "axios";
import moment from 'moment';
import InputMask from 'react-input-mask';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';

import './SheepForm.css'

export default class SheepForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            invoiceID: 0,
            soldBy: '',
            iDate: new Date(),
            customer: '',
            phone: '',
            cellPhone: false,
            email: '',
            baskets: 0,
            row: '',
            slaughter: 0,
            cutWrap: 0,
            boneRoll: 0,
            qtyOther: 0,
            descOther: '',
            priceOther: 0,
            netWeight: 0,
            total: 0,
            sheepPrices: {},
            slaughterTotal: 0,
            cutWrapTotal: 0,
            boneTotal: 0
        };
    }
    async componentDidMount() {
        let res = await axios.get("/sheep/prices");
        await this.setState({ sheepPrices: res.data[0] });
        console.log(this.state.sheepPrices);
    }

    save = async () => {
        console.log("save");
        // const res = await axios.post("/beef/save", {
        //   soldBy: this.state.soldBy,
        //   date: this.state.date,
        //   customer: this.state.customer,
        //   phone: this.state.phone,
        //   baskets: this.state.baskets,
        //   row: this.state.row,
        //   slaughter: this.state.slaughter,
        //   cutWrap: this.state.cutWrap,
        //   patties: this.state.patties,
        //   brand: this.state.brand
        // });
    };

    handleChange(key, value) {
        this.setState({
            [key]: value.target.value
        });
        console.log(`${key} is ${this.state[key]}`);
    }

    async toggleCell() {
        await this.setState({
            cellPhone: !this.state.cellPhone
        })
        // console.log(this.state.cellPhone)
    }


    render() {
        return (
            <div className='sheep-container'>
                <div className="sheep-form">
                    <span className='sheep-title'>Sheep Form</span>
                    <hr />
                    <div className='sheep-header-container'>
                        <label className='sheep-label-right'>Date:</label>
                        <InputMask mask="99/99/9999" maskChar={null}
                            className='sheep-text-input sheep-input-short'
                            onChange={e => this.handleChange('iDate', e)}
                            value={moment(this.state.iDate).format('MM/DD/YYYY')} />
                        <label className='sheep-label-right'>Sold By:</label>
                        <input type="text" className='sheep-text-input'
                            onChange={e => this.handleChange('soldBy', e)} />
                        <label className='sheep-label-right'>Customer:</label>
                        <input type="text" className='sheep-text-input'
                            value={this.state.customer}
                            onChange={e => this.handleChange('customer', e)} />
                        <label className='sheep-label-right'>E-Mail:</label>
                        <input type="text" className='sheep-text-input'
                            value={this.state.email}
                            onChange={e => this.handleChange('email', e)} />
                        <label className='sheep-label-right'>Phone:</label>
                        <div>
                            <InputMask mask='999-999-9999' maskChar={null}
                                className='sheep-text-input sheep-input-short'
                                value={this.state.phone}
                                onChange={e => this.handleChange('phone', e)} />
                            <label>Cell:</label>
                            <input type="checkbox"
                                checked={this.state.cellPhone}
                                onClick={e => this.toggleCell()} />
                        </div>
                        <label className='sheep-label-right'>Baskets:</label>
                        <input type="text" className='sheep-text-input sheep-input-short'
                            value={this.state.baskets}
                            onChange={e => this.handleChange('baskets', e)} />
                        <label className='sheep-label-right'>Row:</label>
                        <input type="text" className='sheep-text-input sheep-input-short' 
                            value={this.state.row}
                            onChange={e => this.handleChange('row', e)} />
                        <label className='pork-label-right'>Net Weight:</label>
                        <input type="text" className='pork-text-input pork-input-short'
                            value={this.state.netWeight}
                            onChange={e => this.handleChange('netWeight', e)} />
                    </div>
                    <hr/>
                    <div className='sheep-prices-container'>
                        <input type="text" className='sheep-price-input' 
                            value={this.state.slaughter}
                            onChange={e => this.handleChange('slaughter', e)} />
                        <label>Sheep Slaughter</label>
                        <span>${this.state.sheepPrices.slaughter}</span>
                        <span>{(this.state.slaughter * this.state.sheepPrices.slaughter).toLocaleString('us-US', {style: 'currency', currency: 'USD'})}</span>
                        <input type="text" className='sheep-price-input'
                            value={this.state.cutWrap}
                            onChange={e => this.handleChange('cutWrap', e)} />
                        <label>Cut & Wrap</label>
                        <span>${this.state.sheepPrices.cut_wrap}</span>
                        <span>{(this.state.cutWrap * this.state.sheepPrices.cut_wrap).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
                        <input type="text" className='sheep-price-input'
                            value={this.state.boneRoll}
                            onChange={e => this.handleChange('boneRoll', e)} />
                        <label>Bone & Roll</label>
                        <span>${this.state.sheepPrices.bone_roll}</span>
                        <span>{(this.state.boneRoll * this.state.sheepPrices.bone_roll).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
                        <input type="text" className='sheep-price-input'
                            onChange={e => this.handleChange("qtyOther", e)}
                            value={this.state.qtyOther} />
                        <input type="text" className='sheep-desc-other'
                            onChange={e => this.handleChange("descOther", e)}
                            value={this.state.descOther} />
                        <input type="text" className='sheep-price-input'
                            onChange={e => this.handleChange("priceOther", e)}
                            value={this.state.priceOther} />
                        <span>{(this.state.qtyOther * this.state.priceOther).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
                        <div></div>
                        <div></div>
                        <span>TOTAL</span>
                        <span>{this.state.total.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
                        <textarea className='sheep-message-input'
                            onChange={e => this.handleChange("message", e)}
                            cols="30" rows="5" value={this.state.message} />
                        <div></div>
                        <div></div>
                        {this.state.edit === false ? (
                            <button className='sheep-save-btn'
                                onClick={() => this.save()}>Save</button>
                        ) : (
                                <button className='sheep-save-btn'
                                    onClick={() => this.update()}>Update</button>
                            )}

                    </div>
                </div>
            </div>
        );
    }
}
