import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import './EmailForm.css';

export default class EmailForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice: [],
            mail: null,
            subject: null,
            message: null
        }

    }

    async componentDidMount() {
        console.log(this.props)
        // console.log(this.props.id)
        let res = await axios.get(`/search/${this.props.searchType}ID/${this.props.id}`)
        this.setState({
            invoice: res.data[0],
            email: res.data[0].email
        })
        // console.log(this.state)
    }

    handleChange(key, value) {
        // console.log(key)
        // console.log(value.target.value)
        this.setState({
            [key]: value.target.value
        })
        // console.log(this.state)
    }

    beefInvoice = () => {
        // console.log('beef invoice')
        const invoiceMessage = 
            `<div>
                ${this.state.message}
            </div>
            <hr>
            <div> 
                <b>Invoice Date:  </b> ${moment(this.state.invoice.invoice_date).format('MM/DD/YYYY')} 
            </div>
            <div>
                <b>Sold By:  </b> ${this.state.invoice.sold_by}
            </div>
            <div>
                <b>Customer Name:  </b> ${this.state.invoice.customer}
            </div>
            <div>
                <b>Net Weight:  </b> ${this.state.invoice.net_weight}
            </div>
            <div>
                <table border='1px' cellpadding='3px'>
                    <tr>
                        <td width='75px'>Quantity</td>
                        <td width='300px'>Description</td>
                        <td width='75px'>Price</td>
                        <td width='150px'>Amount</td>
                    </tr>
                    <tr>
                        <td>${this.state.invoice.slaughter}</td>
                        <td>Beef Slaughter</td>
                        <td>$${this.state.invoice.price_slaughter}</td>
                        <td>$${this.state.invoice.total_slaughter}</td>
                    </tr>
                    <tr>
                        <td>${this.state.invoice.qty_cut}</td>
                        <td>Cut & Wrap</td>
                        <td>$${this.state.invoice.price_cut}</td>
                        <td>$${this.state.invoice.total_cut}</td>
                    </tr>
                    <tr>
                        <td>${this.state.invoice.qty_patties}</td>
                        <td>Patties</td>
                        <td>$${this.state.invoice.price_patties}</td>
                        <td>$${this.state.invoice.total_patties}</td>
                    </tr>
                    <tr>
                        <td>${this.state.invoice.qty_brand}</td>
                        <td>Brand Inspection</td>
                        <td>$${this.state.invoice.price_brand}</td>
                        <td>$${this.state.invoice.total_brand}</td>
                    </tr>
                    <tr>
                        <td>${this.state.invoice.qty_other}</td>
                        <td>${this.state.invoice.desc_other}</td>
                        <td>$${this.state.invoice.price_other}</td>
                        <td>$${this.state.invoice.total_other}</td>
                    </tr>
                    <tr>
                        <td colspan='3' align='right'><b>TOTAL</b></td>
                        <td>$${this.state.invoice.total}</td>
                    </tr>

                </table>
            </div>`
        this.setState({
            message: invoiceMessage
        })
        // console.log(this.state.message)
    }

    async sendMail() {
        // console.log('send mail')
        await this.beefInvoice();
        // console.log(this.state.message)
        // console.log(this.state.invoice.invoice_date)
        axios.post('/mail/send', {
            email: this.state.email,
            subject: this.state.subject,
            html_message: this.state.message
        })
        this.props.toggleEmailModal()
    }

    render() {
        return (
            <div>
                <label className='email-form-title'>New Message</label>
                <hr />
                <div className='email-form-container'>
                    <label className='email-label-right'>To:</label>
                    <input type='text' className='email-input'
                        defaultValue={this.state.invoice.email}
                        onChange={e => this.handleChange("email", e)}
                    />
                    <label className='email-label-right'>Subject:</label>
                    <input type="text" className='email-input'
                        onChange={e => this.handleChange("subject", e)}
                    />
                    <label className='email-label-right'>Message:</label>
                    <br />
                    <textarea className='email-message'
                        onChange={e=>this.handleChange("message", e)}
                        cols='50' rows='15' >
                    </textarea>
                    <button className='email-send-btn' 
                        onClick={() => this.sendMail()}>
                        Send
                    </button>

                </div>
            </div>
        )
    }
}
