import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import jsPDF from "jspdf";

import './Search.css';
import SearchDisplay from './SearchDisplay';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchType: "beef",
            // customer: "",
            searchField: "customer",
            searchCriteria: "",
            searchResults: [],
            invoice: []
        }
    }

    handleChange(key, value) {
        this.setState({
            [key]: value.target.value
        });
    }

    async search() {
        console.log("search")
        if (this.state.searchField === "customer") {
            const res = await axios.get(`/search/${this.state.searchType}Customer/${this.state.searchCriteria}`)
            console.log(res.data)
            this.setState({
                searchResults: res.data
            })
        }
        if (this.state.searchField === "soldBy") {
            const res = await axios.get(`/search/${this.state.searchType}SoldBy/${this.state.searchCriteria}`)
            console.log(res.data)
            this.setState({
                searchResults: res.data
            })
        }
    }

     searchOne = async (invoiceID) => {
        // console.log(invoiceID)
        const res = await axios.get(`/search/${this.state.searchType}ID/${invoiceID}`)
        // console.log(res.data)
        this.setState({
            invoice: res.data
        })
        console.log(this.state.invoice)

    }

     printInvoice = async (invoiceID) => {
        // console.log(invoiceID)
        await this.searchOne(invoiceID)
        const doc = new jsPDF({
          orientation: 'p',
          unit: 'mm',
          format: [396, 612]  //5.5in by 8.5in paper
        });
        doc.setFontSize(11);
        let slaughterTotal = (this.state.invoice[0].total_slaughter).toLocaleString('us-US', { style: 'currency', currency: 'USD' });
        console.log(slaughterTotal)
        // let cutWrapTotal = (this.state.cutWrap * this.state.beefPrices.cut_wrap).toLocaleString('us-US', { style: 'currency', currency: 'USD' });
        // let pattiesTotal = (this.state.patties * this.state.beefPrices.patties).toLocaleString('us-US', { style: 'currency', currency: 'USD' });
        // let brandTotal = (this.state.brand * this.state.beefPrices.brand).toLocaleString('us-US', { style: 'currency', currency: 'USD' });
        // let otherTotal = (this.state.qtyOther * this.state.priceOther).toLocaleString('us-US', { style: 'currency', currency: 'USD' });
        // let total = this.state.total.toLocaleString('us-US', { style: 'currency', currency: 'USD' });
        // doc.text(this.state.soldBy, 18, 39);
        // doc.text(moment(this.state.iDate).format('MM/DD/YYYY'), 112, 39);
        // doc.text(this.state.customer, 15, 45);
        // doc.text(this.state.phone, 15, 55);
        // doc.text(`${this.state.baskets} Basket - Row ${this.state.row}`, 20, 63);
        // if(this.state.slaughter !== 0) {
        //   doc.text(this.state.slaughter, 20, 85, {align: 'right'});
        //   doc.text('Beef Slaughter', 27, 85);
        //   doc.text(`$${this.state.beefPrices.slaughter}`, 102, 85, {align: 'right'});
        //   doc.text(slaughterTotal, 132, 85, {align: 'right'})
        // }  
        // if(this.state.cutWrap !== 0) {
        //   doc.text(this.state.cutWrap, 20, 95, {align: 'right'})
        //   doc.text('Cut & Wrap', 27, 95);
        //   doc.text(`$${this.state.beefPrices.cut_wrap}`, 102, 95, {align: 'right'});
        //   doc.text(cutWrapTotal, 132, 95, {align: 'right'});
        // }
        // if(this.state.patties !== 0){
        //   doc.text(this.state.patties, 20, 105, {align: 'right'})
        //   doc.text('Patties', 27, 105);
        //   doc.text(`$${this.state.beefPrices.patties}`, 102, 105, {align: 'right'});
        //   doc.text(pattiesTotal, 132, 105, {align: 'right'});
        // }
        // if(this.state.brand !== 0){
        //   doc.text(this.state.brand, 20, 115, {align: 'right'});
        //   doc.text('Brand Inspection', 27, 115);
        //   doc.text(`$${this.state.beefPrices.brand}`, 102, 115, {align: 'right'});
        //   doc.text(brandTotal, 132, 115, {align: 'right'});
        // }
        // if(this.state.qtyOther !== 0){
        //   doc.text(this.state.qtyOther, 20, 125, {align: 'right'});
        //   doc.text(this.state.descOther, 27, 125);
        //   doc.text(`$${this.state.priceOther}`, 102, 125, {align: 'right'});
        //   doc.text(otherTotal, 132, 125, {align: 'right'});
        // }
        // doc.text('Total', 100, 135);
        // doc.text(total, 132, 135, {align: 'right'});
        // doc.text(this.state.message, 27, 150, {maxWidth: '90'})
        // doc.text(`${this.state.netWeight} Net Weight Misc. Beef Cuts`, 27, 200)
        // doc.save('invoice.pdf')
        // doc.autoPrint({});
        // var iframe = document.getElementById('output');
        // iframe.src = doc.output('dataurlstring');
      }

    render() {
        let searchResults = this.state.searchResults.map(invoice => {
            return (

                <SearchDisplay
                    key={invoice.beef_id}
                    id={invoice.beef_id}
                    customer={invoice.customer}
                    printInvoice={this.printInvoice}
                />
            )
        })

        return (
            <div className='search-main'>Search
                <hr />
                <select name="search-type" id="search-type"
                    onChange={(e) => this.handleChange("searchType", e)}>
                    <option value="beef">Beef</option>
                    <option value="pork">Pork</option>
                    <option value="sheep">Sheep</option>
                    <option value="other">Other</option>
                </select>
                <select name="search-field" id="search-field"
                    onChange={e => this.handleChange("searchField", e)}>
                    <option value="customer">Customer</option>
                    <option value="soldBy">Sold By</option>
                </select>
                <input type="text" className="user-input"
                    onChange={e => this.handleChange("searchCriteria", e)} />
                <button className='search-btn'
                    onClick={() => this.search()}>Search</button>
                <div>
                    {searchResults}
                </div>
            </div>
        )
    }
}