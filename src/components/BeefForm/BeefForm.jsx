import React, { Component } from "react";
import axios from "axios";
import Moment from 'react-moment';
import moment from 'moment';
import InputMask from 'react-input-mask';

import './BeefForm.css'

export default class BeefForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      soldBy: "",
      // iDate: moment(new Date(), "MM/DD/YYYY"),
      iDate: new Date(),
      customer: "",
      email: "",
      phone: "",
      cellPhone: false,
      baskets: 0,
      row: "",
      slaughter: 0,
      cutWrap: 0,
      patties: 0,
      brand: 0,
      beefPrices: {},
      total: 0
    };
  }

  async componentDidMount() {
    let res = await axios.get("/beef/prices");
    await this.setState({ beefPrices: res.data[0] });
  }

  save = async () => {
    console.log("save");
    console.log(this.state.iDate)
    const res = await axios.post("/beef/save", {
      soldBy: this.state.soldBy,
      iDate: this.state.iDate,
      customer: this.state.customer,
      phone: this.state.phone,
      cell_phone: this.state.cellPhone,
      email: this.state.email,
      baskets: this.state.baskets,
      row: this.state.row,
      slaughter: this.state.slaughter,
      cutWrap: this.state.cutWrap,
      patties: this.state.patties,
      brand: this.state.brand
    });
  };

  async handleChange(key, value) {
    console.log(`${key} is ${this.state[key]}`);

    await this.setState({
      [key]: value.target.value
    });
    await this.calcTotal();
    console.log(`${key} is ${this.state[key]}`);
  }

  async toggleCell() {
    await this.setState({
      cellPhone: !this.state.cellPhone
    })
    console.log(this.state.cellPhone)
  }

  calcTotal = () => {
    let slaughterTotal = this.state.slaughter * this.state.beefPrices.slaughter;
    let cutWrapTotal = this.state.cutWrap * this.state.beefPrices.cut_wrap;
    let pattiesTotal = Number(this.state.patties) * Number(this.state.beefPrices.patties);
    let brandTotal = Number(this.state.brand) * Number(this.state.beefPrices.brand);
    let total = slaughterTotal + cutWrapTotal + pattiesTotal + brandTotal;
    this.setState({
      total: total
    })
  }

  render() {
    // let currentDay = 
    return (
      <div className='beef-container'>
        <div className='beef-form'>
        <span className="beef-title">Beef</span>
        <hr/>
          <div className='beef-header-container'>
            <label className='beef-label-right'>Date:</label>
            <InputMask mask="99/99/9999" maskChar={null}
              className="beef-text-input beef-input-short"
              onChange={e => this.handleChange("iDate", e)}
              defaultValue={moment(this.state.iDate).format('MM/DD/YYYY')} />
            <label className='beef-label-right'>Sold By:</label>
            <input type="text" className="beef-text-input"
              onChange={e => this.handleChange("soldBy", e)} />
            <label className='beef-label-right'>Customer:</label>
            <input type="text" className="beef-text-input"
              onChange={e => this.handleChange("customer", e)} />
            <label className='beef-label-right'>E-Mail:</label>
            <input type="text" className="beef-text-input"
              onChange={e => this.handleChange("email", e)} />
            <label className='beef-label-right'>Phone:</label>
            <div>
              <InputMask mask="999-999-9999" maskChar={null}
                className="beef-text-input beef-input-short"
                onChange={e => this.handleChange("phone", e)} />
              <label>Cell:</label>
              <input type="checkbox"
                onClick={e => this.toggleCell()} />
            </div>
            <label className='beef-label-right'>Baskets:</label>
            <input type="type" className="beef-text-input beef-input-short"
              onChange={e => this.handleChange("baskets", e)} />
            <label className='beef-label-right'>Row:</label>
            <input type="text" className="beef-text-input beef-input-short"
              onChange={e => this.handleChange("row", e)} />
          </div>
          <hr />
          <div className='beef-prices-container'>
            <input className='beef-price-input'
              type="text"
              onChange={e => this.handleChange("slaughter", e)}
            />
            <label>Beef Slaughter</label>
            <span>${this.state.beefPrices.slaughter}</span>
            <span>{(this.state.slaughter * this.state.beefPrices.slaughter).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
            <input type="text" className='beef-price-input'
              onChange={e => this.handleChange("cutWrap", e)}
            />
            <label>Cut & Wrap</label>
            <span>${this.state.beefPrices.cut_wrap}</span>
            <span>{(this.state.cutWrap * this.state.beefPrices.cut_wrap).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
            <input type="text" className='beef-price-input'
              onChange={e => this.handleChange("patties", e)}
            />
            <label>Patties</label>
            <span>${this.state.beefPrices.patties}</span>
            <span>{(this.state.patties * this.state.beefPrices.patties).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
            <input type="text" className='beef-price-input'
              onChange={e => this.handleChange("brand", e)}
            />
            <label>Brand Inspection</label>
            <span>${this.state.beefPrices.brand}</span>
            <span>{(this.state.beefPrices.brand * this.state.brand).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
            <div></div>
            <div></div>
            <span>TOTAL</span>
            <span>{this.state.total.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
            <button className='beef-save-btn'
              onClick={() => this.save()}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}
