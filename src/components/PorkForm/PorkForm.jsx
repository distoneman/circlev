import React, { Component } from "react";
import axios from "axios";
import moment from 'moment';
import InputMask from 'react-input-mask'

import './PorkForm.css'

export default class PorkForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            soldBy: '',
            date: '',
            customer: '',
            phone: '',
            baskets: 0,
            row: '',
            slaughter: 0,
            cutWrap: 0,
            cure: 0,
            links: 0,
            bulk: 0,
            fat: 0,
            qtyOther: 0,
            descOther: '',
            priceOther: 0,
            lard: 0,
            netWeight: 0,
            message: '',
            total: 0,
            porkPrices: {}
        };
    }
    async componentDidMount() {
        let res = await axios.get("/pork/prices");
        await this.setState({ porkPrices: res.data[0] });
        console.log(this.state.porkPrices);
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

    render() {
        return (
            <div className='pork-container'>
                <div className="pork-form">
                    <span className='pork-title'>Pork Form</span>
                    <hr />
                    <div className='pork-header-container'>
                        <label className='pork-label-right'>Date:</label>
                        <InputMask mask="99/99/9999" maskChar={null}
                            className="pork-text-input pork-input-short"
                            onChange={e => this.handleChange("iDate", e)}
                            value={moment(this.state.iDate).format('MM/DD/YYYY')} />
                        <label className='pork-label-right'>Sold By:</label>
                        <input type="text" className="pork-text-input"
                            onChange={e => this.handleChange("soldBy", e)}
                            value={this.state.soldBy} />
                        <label className='pork-label-right'>Customer:</label>
                        <input type="text" className="beef-text-input"
                            value={this.state.customer}
                            onChange={e => this.handleChange("customer", e)} />
                        <label className='pork-label-right'>E-Mail:</label>
                        <input type="text" className="beef-text-input"
                            value={this.state.email}
                            onChange={e => this.handleChange("email", e)} />
                        <label className='pork-label-right'>Phone:</label>
                        <div>
                            <InputMask mask="999-999-9999" maskChar={null}
                                className="pork-text-input pork-input-short"
                                value={this.state.phone}
                                onChange={e => this.handleChange("phone", e)} />
                            <label>Cell:</label>
                            <input type="checkbox"
                                checked={this.state.cellPhone}
                                onClick={e => this.toggleCell()} />
                        </div>
                        <label className='pork-label-right'>Baskets:</label>
                        <input type="type" className="beef-text-input beef-input-short"
                            value={this.state.baskets}
                            onChange={e => this.handleChange("baskets", e)} />
                        <label className='pork-label-right'>Row:</label>
                        <input type="text" className="beef-text-input beef-input-short"
                            value={this.state.row}
                            onChange={e => this.handleChange("row", e)} />
                        <label className='pork-label-right'>Net Weight:</label>
                        <input type="text" className="pork-text-input pork-input-short"
                            value={this.state.netWeight}
                            onChange={e => this.handleChange("netWeight", e)} />
                        <label className='pork-label-right'>Lard:</label>
                        <span>{this.state.lard}</span>
                    </div>
                    <hr />
                    <div className='pork-prices-container'>
                        <input className='beef-price-input'
                            type="text" value={this.state.slaughter}
                            onChange={e => this.handleChange("slaughter", e)}
                        />
                        <label>Pork Slaughter</label>
                        <span>${this.state.porkPrices.slaughter}</span>
                        <span>{(this.state.slaughter * this.state.porkPrices.slaughter).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
                        <input type="text" className='pork-price-input'
                            onChange={e => this.handleChange("cutWrap", e)}
                            value={this.state.cutWrap} />
                        <label>Cut & Wrap</label>
                        <span>${this.state.porkPrices.cut_wrap}</span>
                        <span>{(this.state.cutWrap * this.state.porkPrices.cut_wrap).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
                        <input type="text" className='pork-price-input'
                            onChange={e => this.handleChange("cure", e)}
                            value={this.state.cure} />
                        <label>Cure</label>
                        <span>${this.state.porkPrices.cure}</span>
                        <span>{(this.state.cure * this.state.porkPrices.cure).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
                        <input type="text" className='pork-price-input'
                            onChange={e => this.handleChange("links", e)}
                            value={this.state.links} />
                        <label>Links/Patties</label>
                        <span>${this.state.porkPrices.link}</span>
                        <span>{(this.state.links * this.state.porkPrices.link).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
                        <input type="text" className='pork-price-input'
                            onChange={e => this.handleChange("bulk", e)}
                            value={this.state.bulk} />
                        <label>Bulk Sausage</label>
                        <span></span>
                        <span></span>
                        <input type="text" className='pork-price-input'
                            onChange={e => this.handleChange("fat", e)}
                            value={this.state.fat} />
                        <label>Fat Rendered</label>
                        <span>${this.state.porkPrices.fat}</span>
                        <span>{(this.state.fat * this.state.porkPrices.fat).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
                        <input type="text" className='pork-price-input'
                            onChange={e => this.handleChange("qtyOther", e)}
                            value={this.state.qtyOther} />
                        <input type="text" className='pork-desc-other'
                            onChange={e => this.handleChange("descOther", e)}
                            value={this.state.descOther} />
                        <input type="text" className='pork-price-input'
                            onChange={e => this.handleChange("priceOther", e)}
                            value={this.state.priceOther} />
                        <span>{(this.state.qtyOther * this.state.priceOther).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
                        <div></div>
                        <div></div>
                        <span>TOTAL</span>
                        <span>{this.state.total.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
                        <textarea className='pork-message-input'
                            onChange={e => this.handleChange("message", e)}
                            cols="30" rows="5" value={this.state.message} />
                        <div></div>
                        <div></div>
                        {this.state.edit === false ? (
                            <button className='beef-save-btn'
                                onClick={() => this.save()}>Save</button>
                        ) : (
                                <button className='beef-save-btn'
                                    onClick={() => this.update()}>Update</button>
                            )}
                    </div>
                </div>
                <iframe title="pdf" id="output" className='beef-pdf-iframe'></iframe>
            </div>
        );
    }
}
