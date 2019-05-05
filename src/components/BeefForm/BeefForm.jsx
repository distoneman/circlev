import React, { Component } from "react";
import axios from "axios";
import moment from 'moment';
import InputMask from 'react-input-mask';
import jsPDF from "jspdf";
import './BeefForm.css';
// import BeefInvoice from './BeefInvoice';

export default class BeefForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit: false,
      invoiceID: 0,
      soldBy: "",
      iDate: new Date(),
      customer: "",
      email: "",
      phone: "",
      cellPhone: false,
      baskets: '',
      row: "",
      netWeight: '',
      slaughter: '',
      cutWrap: '',
      patties: '',
      brand: '',
      qtyOther: '',
      descOther: "",
      priceOther: '',
      beefPrices: {},
      total: '',
      message: ""
    };
  }

  async componentDidMount() {
    if(this.props.match.params.ID === undefined){
      console.log("null")
      let res = await axios.get("/beef/prices");
      await this.setState({ beefPrices: res.data[0] });
      console.log(this.state.beefPrices)
    } else {
      this.setState({edit: true})
      console.log('parameter')
      let res = await axios.get(`/search/beefID/${this.props.match.params.ID}`);
      console.log(res.data)
      let invoicePrices = {
        slaughter: res.data[0].price_slaughter,
        cut_wrap: res.data[0].price_cut,
        patties: res.data[0].price_patties,
        brand: res.data[0].price_brand
      }
      // this.setState({beefPrices: invoicePrices});
      await this.setState({
        invoiceID: res.data[0].beef_id,
        beefPrices: invoicePrices,
        soldBy: res.data[0].sold_by,
        iDate: res.data[0].invoice_date,
        customer: res.data[0].customer,
        email: res.data[0].email,
        phone: res.data[0].phone,
        cellPhone: res.data[0].cell_phone,
        baskets: res.data[0].baskets,
        row: res.data[0].row_num,
        netWeight: res.data[0].net_weight,
        slaughter: res.data[0].slaughter,
        cutWrap: res.data[0].qty_cut,
        patties: res.data[0].qty_patties,
        brand: res.data[0].qty_brand,
        qtyOther: res.data[0].qty_other,
        descOther: res.data[0].desc_other,
        priceOther: res.data[0].price_other,
        total: res.data[0].total,
        message: res.data[0].message
      })
    }
  }

  save = async () => {
    await axios.post("/beef/save", {
      soldBy: this.state.soldBy,
      iDate: moment(this.state.iDate).format('l'),
      customer: this.state.customer,
      phone: this.state.phone,
      cell_phone: this.state.cellPhone,
      email: this.state.email,
      baskets: this.state.baskets,
      row: this.state.row,
      slaughter: this.state.slaughter,
      cutWrap: this.state.cutWrap,
      patties: this.state.patties,
      brand: this.state.brand,
      qty_other: this.state.qtyOther,
      desc_other: this.state.descOther,
      price_other: this.state.priceOther,
      total: this.state.total,
      net_weight: this.state.netWeight,
      message: this.state.message
    });
    this.printInvoice();
  };

  update = async () => {
    console.log('update')
    console.log(this.state.invoiceID)
  }

  printInvoice = () => {
    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: [396, 612]  //5.5in by 8.5in paper
    });
    doc.setFontSize(11);
    let slaughterTotal = (this.state.slaughter * this.state.beefPrices.slaughter).toLocaleString('us-US', { style: 'currency', currency: 'USD' });
    // console.log(slaughterTotal)
    let cutWrapTotal = (this.state.cutWrap * this.state.beefPrices.cut_wrap).toLocaleString('us-US', { style: 'currency', currency: 'USD' });
    let pattiesTotal = (this.state.patties * this.state.beefPrices.patties).toLocaleString('us-US', { style: 'currency', currency: 'USD' });
    let brandTotal = (this.state.brand * this.state.beefPrices.brand).toLocaleString('us-US', { style: 'currency', currency: 'USD' });
    let otherTotal = (this.state.qtyOther * this.state.priceOther).toLocaleString('us-US', { style: 'currency', currency: 'USD' });
    let total = this.state.total.toLocaleString('us-US', { style: 'currency', currency: 'USD' });
    doc.text(this.state.soldBy, 18, 39);
    doc.text(moment(this.state.iDate).format('MM/DD/YYYY'), 112, 39);
    doc.text(this.state.customer, 15, 45);
    doc.text(this.state.phone, 15, 55);
    doc.text(`${this.state.baskets} Basket - Row ${this.state.row}`, 20, 63);
    if(this.state.slaughter !== 0) {
      doc.text(this.state.slaughter, 20, 85, {align: 'right'});
      doc.text('Beef Slaughter', 27, 85);
      doc.text(`$${this.state.beefPrices.slaughter}`, 102, 85, {align: 'right'});
      doc.text(slaughterTotal, 132, 85, {align: 'right'})
    }  
    if(this.state.cutWrap !== 0) {
      doc.text(this.state.cutWrap, 20, 95, {align: 'right'})
      doc.text('Cut & Wrap', 27, 95);
      doc.text(`$${this.state.beefPrices.cut_wrap}`, 102, 95, {align: 'right'});
      doc.text(cutWrapTotal, 132, 95, {align: 'right'});
    }
    if(this.state.patties !== 0){
      doc.text(this.state.patties, 20, 105, {align: 'right'})
      doc.text('Patties', 27, 105);
      doc.text(`$${this.state.beefPrices.patties}`, 102, 105, {align: 'right'});
      doc.text(pattiesTotal, 132, 105, {align: 'right'});
    }
    if(this.state.brand !== 0){
      doc.text(this.state.brand, 20, 115, {align: 'right'});
      doc.text('Brand Inspection', 27, 115);
      doc.text(`$${this.state.beefPrices.brand}`, 102, 115, {align: 'right'});
      doc.text(brandTotal, 132, 115, {align: 'right'});
    }
    if(this.state.qtyOther !== 0){
      doc.text(this.state.qtyOther, 20, 125, {align: 'right'});
      doc.text(this.state.descOther, 27, 125);
      doc.text(`$${this.state.priceOther}`, 102, 125, {align: 'right'});
      doc.text(otherTotal, 132, 125, {align: 'right'});
    }
    doc.text('Total', 100, 135);
    doc.text(total, 132, 135, {align: 'right'});
    doc.text(this.state.message, 27, 150, {maxWidth: '90'})
    doc.text(`${this.state.netWeight} Net Weight Misc. Beef Cuts`, 27, 200)
    doc.save('invoice.pdf')
    doc.autoPrint({});
    var iframe = document.getElementById('output');
    iframe.src = doc.output('dataurlstring');
  }

  async handleChange(key, value) {
    // console.log(`${key} is ${this.state[key]}`);

    await this.setState({
      [key]: value.target.value
    });
    await this.calcTotal();
    // console.log(`${key} is ${this.state[key]}`);
  }

  async toggleCell() {
    await this.setState({
      cellPhone: !this.state.cellPhone
    })
    // console.log(this.state.cellPhone)
  }

  calcTotal = () => {
    let slaughterTotal = this.state.slaughter * this.state.beefPrices.slaughter;
    let cutWrapTotal = this.state.cutWrap * this.state.beefPrices.cut_wrap;
    let pattiesTotal = Number(this.state.patties) * Number(this.state.beefPrices.patties);
    let brandTotal = Number(this.state.brand) * Number(this.state.beefPrices.brand);
    let otherTotal = this.state.qtyOther * this.state.priceOther;
    let total = slaughterTotal + cutWrapTotal + pattiesTotal + brandTotal + otherTotal;
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
              value={moment(this.state.iDate).format('MM/DD/YYYY')} />
              {/* value={moment(this.state.iDate).format('MM/DD/YYYY')} /> */}
            <label className='beef-label-right'>Sold By:</label>
            <input type="text" className="beef-text-input"
              onChange={e => this.handleChange("soldBy", e)}
              value={this.state.soldBy} />
            <label className='beef-label-right'>Customer:</label>
            <input type="text" className="beef-text-input"
              value={this.state.customer}
              onChange={e => this.handleChange("customer", e)} />
            <label className='beef-label-right'>E-Mail:</label>
            <input type="text" className="beef-text-input"
              value={this.state.email}
              onChange={e => this.handleChange("email", e)} />
            <label className='beef-label-right'>Phone:</label>
            <div>
              <InputMask mask="999-999-9999" maskChar={null}
                className="beef-text-input beef-input-short"
                value={this.state.phone}
                onChange={e => this.handleChange("phone", e)} />
              <label>Cell:</label>
              <input type="checkbox"
                checked={this.state.cellPhone}
                onClick={e => this.toggleCell()} />
            </div>
            <label className='beef-label-right'>Baskets:</label>
            <input type="type" className="beef-text-input beef-input-short"
              value={this.state.baskets}
              onChange={e => this.handleChange("baskets", e)} />
            <label className='beef-label-right'>Row:</label>
            <input type="text" className="beef-text-input beef-input-short"
              value={this.state.row}
              onChange={e => this.handleChange("row", e)} />
            <label className='beef-label-right'>Net Weight:</label>
            <input type="text" className="beef-text-input beef-input-short"
              value={this.state.netWeight}
              onChange={e => this.handleChange("netWeight", e)}/>
          </div>
          <hr />
          <div className='beef-prices-container'>
            <input className='beef-price-input'
              type="text" value={this.state.slaughter}
              onChange={e => this.handleChange("slaughter", e)}
            />
            <label>Beef Slaughter</label>
            <span>${this.state.beefPrices.slaughter}</span>
            <span>{(this.state.slaughter * this.state.beefPrices.slaughter).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
            <input type="text" className='beef-price-input'
              onChange={e => this.handleChange("cutWrap", e)}
              value={this.state.cutWrap} />
            <label>Cut & Wrap</label>
            <span>${this.state.beefPrices.cut_wrap}</span>
            <span>{(this.state.cutWrap * this.state.beefPrices.cut_wrap).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
            <input type="text" className='beef-price-input'
              onChange={e => this.handleChange("patties", e)}
              value={this.state.patties} />
            <label>Patties</label>
            <span>${this.state.beefPrices.patties}</span>
            <span>{(this.state.patties * this.state.beefPrices.patties).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
            <input type="text" className='beef-price-input'
              onChange={e => this.handleChange("brand", e)}
              value={this.state.brand} />
            <label>Brand Inspection</label>
            <span>${this.state.beefPrices.brand}</span>
            <span>{(this.state.beefPrices.brand * this.state.brand).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
            <input type="text" className='beef-price-input'
              onChange={e => this.handleChange("qtyOther", e)}
              value={this.state.qty_other} />
            <input type="text" className='beef-desc-other'
              onChange={e => this.handleChange("descOther", e)}
              value={this.state.descOther} />
            <input type="text" className='beef-price-input'
              onChange={e => this.handleChange("priceOther", e)}
              value={this.state.priceOther} />
            <span>{(this.state.qtyOther * this.state.priceOther).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
            <div></div>
            <div></div>
            <span>TOTAL</span>
            <span>{this.state.total.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
            <textarea className='beef-message-input' 
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
