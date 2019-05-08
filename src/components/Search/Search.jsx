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
        console.log(this.state.searchCriteria)
        console.log(this.state.searchType)
        if (this.state.searchField === "customer") {
            const res = await axios.get(`/search/${this.state.searchType}Customer/${this.state.searchCriteria}`)
            // console.log(res.data)
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
        if(this.state.searchField === "invoiceDate") {
            console.log("search date")
            const res = await axios.get(`/search/${this.state.searchType}InvoiceDate/?invoiceDate=${this.state.searchCriteria}`)
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

    deleteInvoice = async(invoiceID) => {
        await axios.delete(`/${this.state.searchType}/delete/${invoiceID}`)
        this.search();
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
        let cutWrapTotal = (this.state.invoice[0].total_cut).toLocaleString('us-US', { style: 'currency', currency: 'USD' });
        let pattiesTotal = (this.state.invoice[0].total_patties).toLocaleString('us-US', { style: 'currency', currency: 'USD' });
        let brandTotal = (this.state.invoice[0].total_brand).toLocaleString('us-US', { style: 'currency', currency: 'USD' });
        let otherTotal = (this.state.invoice[0].total_other).toLocaleString('us-US', { style: 'currency', currency: 'USD' });
        let total = this.state.invoice[0].total.toLocaleString('us-US', { style: 'currency', currency: 'USD' });

        doc.text(this.state.invoice[0].sold_by, 18, 39);
        doc.text(moment(this.state.invoice[0].invoice_date).format('MM/DD/YYYY'), 112, 39);
        doc.text(this.state.invoice[0].customer, 15, 45);
        doc.text(this.state.invoice[0].phone, 15, 55);
        doc.text(`${this.state.invoice[0].baskets} Basket - Row ${this.state.invoice[0].row_num}`, 20, 63);
        if (this.state.invoice[0].slaughter !== 0) {
            doc.text(this.state.invoice[0].slaughter, 20, 85, { align: 'right' });
            doc.text('Beef Slaughter', 27, 85);
            doc.text(`$${this.state.invoice[0].price_slaughter}`, 102, 85, { align: 'right' });
            doc.text(slaughterTotal, 132, 85, { align: 'right' })
        }
        if (this.state.invoice[0].qtyCut !== 0) {
            doc.text(this.state.invoice[0].qty_cut, 20, 95, { align: 'right' })
            doc.text('Cut & Wrap', 27, 95);
            doc.text(`$${this.state.invoice[0].price_cut}`, 102, 95, { align: 'right' });
            doc.text(cutWrapTotal, 132, 95, { align: 'right' });
        }
        if (this.state.invoice[0].qty_patties !== 0) {
            doc.text(this.state.invoice[0].qty_patties, 20, 105, { align: 'right' })
            doc.text('Patties', 27, 105);
            doc.text(`$${this.state.invoice[0].price_patties}`, 102, 105, { align: 'right' });
            doc.text(pattiesTotal, 132, 105, { align: 'right' });
        }
        if (this.state.invoice[0].qty_brand !== 0) {
            doc.text(this.state.invoice[0].qty_brand, 20, 115, { align: 'right' });
            doc.text('Brand Inspection', 27, 115);
            doc.text(`$${this.state.invoice[0].price_brand}`, 102, 115, { align: 'right' });
            doc.text(brandTotal, 132, 115, { align: 'right' });
        }
        if (Number(this.state.invoice[0].qty_other) !== 0) {
            doc.text(this.state.invoice[0].qty_other, 20, 125, { align: 'right' });
            doc.text(this.state.invoice[0].desc_other, 27, 125);
            doc.text(`$${this.state.invoice[0].price_other}`, 102, 125, { align: 'right' });
            doc.text(otherTotal, 132, 125, { align: 'right' });
        }
        doc.text('Total', 100, 135);
        doc.text(total, 132, 135, { align: 'right' });
        if (this.state.invoice[0].message != null) {
            doc.text(this.state.invoice[0].message, 27, 150, { maxWidth: '90' })
        }
        doc.text(`${this.state.invoice[0].net_weight} Net Weight Misc. Beef Cuts`, 27, 200)
        // doc.save('invoice.pdf')
        doc.autoPrint({});
        var iframe = document.getElementById('output');
        iframe.src = doc.output('dataurlstring');
    }

    render() {
        let searchResults = this.state.searchResults.map(invoice => {
            let iDate = moment(invoice.invoice_date).format('MM/DD/YYYY')
            let editURL = `/beef/${invoice.beef_id}`
            return (

                <SearchDisplay
                    key={invoice.beef_id}
                    id={invoice.beef_id}
                    searchType={this.state.searchType}
                    iDate={iDate}
                    customer={invoice.customer}
                    soldBy={invoice.sold_by}
                    phone={invoice.phone}
                    total={invoice.total}
                    weight={invoice.net_weight}
                    printInvoice={this.printInvoice}
                    deleteInvoice={this.deleteInvoice}
                    editURL={editURL}
                />
            )
        })

        return (
            <div className='search-main'>
                <div className='search-container'>
                    <span className='search-title'>Search</span>
                    <hr />
                    <div className='search-form'>
                        <label className='search-label'>Search Type:</label>
                        <select name="search-type" id="search-type"
                            className='search-select'
                            onChange={(e) => this.handleChange("searchType", e)}>
                            <option value="beef">Beef</option>
                            <option value="pork">Pork</option>
                            <option value="sheep">Sheep</option>
                            <option value="other">Other</option>
                        </select>
                        <label className='search-label'>Search Field:</label>
                        <select name="search-field" id="search-field"
                            className='search-select'
                            onChange={e => this.handleChange("searchField", e)}>
                            <option value="customer">Customer</option>
                            <option value="soldBy">Sold By</option>
                            <option value="invoiceDate">Invoice Date</option>
                        </select>
                        <label className='search-label'>Search Criteria:</label>
                        <input type="text" className="search-user-input"
                            onChange={e => this.handleChange("searchCriteria", e)} />
                        <div></div>
                        <button className='search-button'
                            onClick={() => this.search()}>Search</button>
                    </div>
                </div>
                <div className='search-results-title'>
                    <div className='search-results-item-title'>Invoice Date</div>
                    <div className='search-results-item-title'>Customer Name</div>
                    <div className='search-results-item-title'>Sold By</div>
                    <div className='search-results-item-title'>Phone</div>
                    <div className='search-results-item-title'>Total</div>
                    <div className='search-results-item-title'>Weight</div>
                    <div className='search-results-item-title'></div>
                </div>
                    {searchResults}
                    <iframe title="pdf" id="output" className='beef-pdf-iframe'></iframe>
            </div>
        )
    }
}