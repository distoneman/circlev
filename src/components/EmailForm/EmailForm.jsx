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
            message: null,
            email: null,
            invoiceFooter: null
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

    invoiceHeader = () =>{
        let invoiceHeader = 
        `<div>
            ${this.state.message}
        </div>
        <hr>
        <br/><br/>
        <div> 
            <b>Invoice Date:  </b> ${moment(this.state.invoice.invoice_date).format('MM/DD/YYYY')} 
        </div>
        <br/>
        <div>
            <b>Sold By:  </b> ${this.state.invoice.sold_by}
        </div>
        <br/>
        <div>
            <b>Customer Name:  </b> ${this.state.invoice.customer}
        </div>
        <br/>
        <div>
            <b>Net Weight:  </b> ${this.state.invoice.net_weight}
        </div>
        <br/>
        <div>
            <table border='1px' cellpadding='3px'>
                <tr>
                    <th width='75px'>Quantity</th>
                    <th width='300px'>Description</th>
                    <th width='75px'>Price</th>
                    <th width='150px'>Amount</th>
                </tr>`
        this.setState({
            message: invoiceHeader
        })
    }

    invoiceFooter = async () => {
        console.log(this.state.total)
        let invoiceFooter = 
            `<tr>
                <td colspan='3' align='right'><b>TOTAL</b></td>
                <td>$${this.state.invoice.total}</td>
            </tr>

            </table>
            </div>`
        await this.setState({
            invoiceFooter: invoiceFooter 
        })
    }

    beefInvoice = async () => {
        await this.invoiceHeader();
        let invoiceMessage = this.state.message +
            `<tr>
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
            </tr>`

        if(this.state.invoice.qty_other != null &
            this.state.invoice.qty_other === 0.00) {
            invoiceMessage = invoiceMessage +                
                `<tr>
                    <td>${this.state.invoice.qty_other}</td>
                    <td>${this.state.invoice.desc_other}</td>
                    <td>$${this.state.invoice.price_other}</td>
                    <td>$${this.state.invoice.total_other}</td>
                </tr>`
        }

        await this.invoiceFooter()
        invoiceMessage = invoiceMessage + this.state.invoiceFooter

        this.setState({
            message: invoiceMessage
        })
    }

    porkInvoice = async () => {
        await this.invoiceHeader()
        let invoiceMessage = this.state.message +
            `<tr>
                <td>${this.state.invoice.qty_slaughter}</td>
                <td>Pork Slaughter</td>
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
                <td>${this.state.invoice.qty_cure}</td>
                <td>Cure</td>
                <td>$${this.state.invoice.price_cure}</td>
                <td>$${this.state.invoice.total_cure}</td>
            </tr>
            <tr>
                <td>${this.state.invoice.qty_link}</td>
                <td>Links/Patties</td>
                <td>$${this.state.invoice.price_link}</td>
                <td>$${this.state.invoice.total_link}</td>
            </tr>
            <tr>
                <td>${this.state.invoice.qty_bulk}</td>
                <td>Bulk Sausage</td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td>${this.state.invoice.qty_fat}</td>
                <td>Fat Rendered</td>
                <td>$${this.state.invoice.price_fat}</td>
                <td>$${this.state.invoice.total_fat}</td>
            </tr>
            <tr>
                <td>${this.state.invoice.lard} lbs</td>
                <td>Lard</td>
                <td></td>
                <td></td>
            </tr>`

        if(this.state.invoice.qty_other != null &
            this.state.invoice.qty_other === 0.00) {
            invoiceMessage = invoiceMessage +                
                `<tr>
                    <td>${this.state.invoice.qty_other}</td>
                    <td>${this.state.invoice.desc_other}</td>
                    <td>$${this.state.invoice.price_other}</td>
                    <td>$${this.state.invoice.total_other}</td>
                </tr>`
        }
    
        await this.invoiceFooter()
        invoiceMessage = invoiceMessage + this.state.invoiceFooter

        this.setState({
            message: invoiceMessage
        })
    }

    async sendMail() {
        if (this.props.searchType === 'beef') {
            await this.beefInvoice();
        }
        else if (this.props.searchType === 'pork'){
            console.log('pork')
            await this.porkInvoice();
        }
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
