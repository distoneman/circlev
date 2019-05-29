import React, { Component } from "react";
import axios from "axios";
import moment from 'moment';
import InputMask from 'react-input-mask';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';

import './CircleVForm.css'

export default class CircleVForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            invoiceID: 0,
            soldBy: 'Circle V Meat',
            iDate: new Date(),
            customer: '',
            phone: '',
            cellPhone: false,
            email: '',
            baskets: 0,
            row: '',
            qtyLine1: 0,
            descLine1: '',
            priceLine1: 0,
            totalLine1: 0,
            qtyLine2: 0,
            descLine2: '',
            priceLine2: 0,
            totalLine2: 0,
            subTotal: 0,
            taxAmt: 0,
            taxRate: .03,
            total: 0,
            amtPaid: 0,
            balance: 0,
            netWeight: 0,
            message: ''
        };
    }
    async componentDidMount() {
        if(this.props.match.params.ID !== undefined) {
            console.log('edit')
            this.setState({edit: true});
            let res = await axios.get(`/search/circleVID/${this.props.match.params.ID}`)
            console.log(res.data)
            await this.setState({
                invoiceID: res.data[0].circlev_id,
                soldBy: res.data[0].sold_by,
                iDate: res.data[0].invoice_date,
                customer: res.data[0].customer,
                phone: res.data[0].phone,
                cellPhone: res.data[0].cell_phone,
                email: res.data[0].email,
                baskets: res.data[0].baskets,
                row: res.data[0].row_num,
                qtyLine1: res.data[0].qty_line1,
                descLine1: res.data[0].desc_line1,
                priceLine1: res.data[0].price_line1,
                totalLine1: res.data[0].total_line1,
                qtyLine2: res.data[0].qty_line2,
                descLine2: res.data[0].desc_line2,
                priceLine2: res.data[0].price_line2,
                totalLine2: res.data[0].total_line2,
                subTotal: res.data[0].sub_total,
                taxAmt: res.data[0].tax_amt,
                total: res.data[0].total,
                amtPaid: res.data[0].amt_paid,
                balance: res.data[0].balance,
                netWeight: res.data[0].net_weight,
                message: res.data[0].message
            })
        }
    }

    save = async () => {
        console.log("save");
        const res = await axios.post("/circlev/save", {
            soldBy: this.state.soldBy,
            iDate: moment(this.state.iDate).format('l'),
            customer: this.state.customer,
            phone: this.state.phone,
            cellPhone: this.state.cellPhone,
            email: this.state.email,
            baskets: this.state.baskets,
            row: this.state.row,
            qtyLine1: this.state.qtyLine1,
            descLine1: this.state.descLine1,
            priceLine1: this.state.priceLine1,
            totalLine1: this.state.totalLine1,
            qtyLine2: this.state.qtyLine2,
            descLine2: this.state.descLine2,
            priceLine2: this.state.priceLine2,
            totalLine2: this.state.totalLine2,
            subTotal: this.state.subTotal,
            taxAmt: this.state.taxAmt,
            total: this.state.total,
            amtPaid: this.state.amtPaid,
            balance: this.state.balance,
            netWeight: this.state.netWeight,
            message: this.state.message
        });
        await this.printInvoice();
        await this.resetState();
    };

    calcTotal = async () => {
        let totalLine1 = this.state.qtyLine1 * this.state.priceLine1;
        let totalLine2 = this.state.qtyLine2 * this.state.priceLine2;
        let subTotal = totalLine1 + totalLine2;
        let taxAmt = subTotal * this.state.taxRate;
        let total = subTotal + taxAmt;
        let balance = total - this.state.amtPaid;
        this.setState({
            totalLine1: totalLine1,
            totalLine2: totalLine2,
            subTotal: subTotal,
            taxAmt: taxAmt,
            total: total,
            balance: balance
        });
    }

    resetState = async () => {
        await this.setState({
            edit: false,
            invoiceID: 0,
            soldBy: 'Circle V Meat',
            date: new Date(),
            customer: '',
            phone: '',
            cellPhone: false,
            email: '',
            baskets: 0,
            row: '',
            qtyLine1: 0,
            descLine1: '',
            priceLine1: 0,
            totalLine1: 0,
            qtyLine2: 0,
            descLine2: '',
            priceLine2: 0,
            totalLine2: 0,
            subTotal: 0,
            taxAmt: 0,
            taxRate: .03,
            total: 0,
            amtPaid: 0,
            balance: 0,
            netWeight: 0,
            message: ''

        })
    }

    async handleChange(key, value) {
        await this.setState({
            [key]: value.target.value
        });
        // console.log(`${key} is ${this.state[key]}`);
        await this.calcTotal();
    }

    async toggleCell() {
        await this.setState({
            cellPhone: !this.state.cellPhone
        })
        // console.log(this.state.cellPhone)
    }

    printInvoice = () => {
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: [396, 612]  //5.5in by 8.5in paper
        });
        doc.setFontSize(11);
        doc.text(this.state.soldBy, 18, 39);
        doc.text(moment(this.state.iDate).format('MM/DD/YYYY'), 112, 39);
        doc.text(this.state.customer, 15, 45);
        doc.text(this.state.phone, 15, 55);
        doc.text(`${this.state.baskets} Basket - Row ${this.state.row}`, 20, 63);

        doc.text(this.state.qtyLine1.toString()
            , 20, 77, { align: 'right' });
        doc.text(this.state.descLine1, 27, 77);
        doc.text(`$${this.state.priceLine1}`, 102, 77, { align: 'right' });
        doc.text(this.state.totalLine1.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 77, { align: 'right' })

        doc.text(this.state.qtyLine2.toString()
            , 20, 85, { align: 'right' });
        doc.text(this.state.descLine2, 27, 85);
        doc.text(`$${this.state.priceLine2}`, 102, 85, { align: 'right' });
        doc.text(this.state.totalLine2.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 85, { align: 'right' })

        doc.text('Sub Total', 100, 93, { align: 'right' });
        doc.text(this.state.subTotal.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 93, { align: 'right' })

        doc.text('Tax', 100, 101, { align: 'right' });
        doc.text(this.state.taxAmt.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 101, { align: 'right' })

        doc.text('Total', 100, 109, { align: 'right' });
        doc.text(this.state.total.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 109, { align: 'right' });

        if (Number(this.state.amtPaid) !== 0) {
            doc.text('Pre-Paid', 100, 117, { align: 'right' });
            doc.text('$' + this.state.amtPaid.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
                132, 117, { align: 'right' });

            doc.text('Balance', 100, 125, { align: 'right' });
            doc.text(this.state.balance.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
                132, 125, { align: 'right' });
        }

        doc.text(this.state.message, 27, 135, { maxWidth: '90' })
        doc.text(`${this.state.netWeight} Net Weight Misc. Cuts`, 60, 165)
        doc.save('invoice.pdf')
        doc.autoPrint({});
        var iframe = document.getElementById('output');
        iframe.src = doc.output('dataurlstring');
    }

    update = async () => {
        await axios.put(`/circlev/update`, {
            circleVId: this.state.invoiceID,
            soldBy: this.state.soldBy,
            iDate: moment(this.state.iDate).format('l'),
            customer: this.state.customer,
            phone: this.state.phone,
            cellPhone: this.state.cellPhone,
            email: this.state.email,
            baskets: this.state.baskets,
            row: this.state.row,
            qtyLine1: this.state.qtyLine1,
            descLine1: this.state.descLine1,
            priceLine1: this.state.priceLine1,
            totalLine1: this.state.totalLine1,
            qtyLine2: this.state.qtyLine2,
            descLine2: this.state.descLine2,
            priceLine2: this.state.priceLine2,
            totalLine2: this.state.totalLine2,
            subTotal: this.state.subTotal,
            taxAmt: this.state.taxAmt,
            total: this.state.total,
            amtPaid: this.state.amtPaid,
            balance: this.state.balance,
            netWeight: this.state.netWeight,
            message: this.state.message
        })
        Swal.fire({
            title: 'Invoice Updated',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Print Invoice'
        }).then((result) => {
            if (result.value) {
                this.printInvoice();
            }
            this.resetState()
        })
    }

    render() {
        return (
            <div className='circleV-container'>
                <div className="circleV-form">
                    <span className='circleV-title'>Circle V</span>
                    <hr />
                    <div className='circleV-header-container'>
                        <label className='circleV-label-right'>Date:</label>
                        <InputMask mask="99/99/9999" maskChar={null}
                            className='circleV-text-input circleV-input-short'
                            onChange={e => this.handleChange('iDate', e)}
                            value={moment(this.state.iDate).format('MM/DD/YYYY')} />
                        <label className='circleV-label-right'>Sold By:</label>
                        <input type="text" className='circleV-text-input'
                            value={this.state.soldBy}
                            onChange={e => this.handleChange('soldBy', e)} />
                        <label className='circleV-label-right'>Customer:</label>
                        <input type="text" className='circleV-text-input'
                            value={this.state.customer}
                            onChange={e => this.handleChange('customer', e)} />
                        <label className='circleV-label-right'>E-Mail:</label>
                        <input type="text" className='circleV-text-input'
                            value={this.state.email}
                            onChange={e => this.handleChange('email', e)} />
                        <label className='circleV-label-right'>Phone:</label>
                        <div>
                            <InputMask mask='999-999-9999' maskChar={null}
                                className='circleV-text-input circleV-input-short'
                                value={this.state.phone}
                                onChange={e => this.handleChange('phone', e)} />
                            <label>Cell:</label>
                            <input type="checkbox"
                                checked={this.state.cellPhone}
                                onClick={e => this.toggleCell()} />
                        </div>
                        <label className='circleV-label-right'>Baskets:</label>
                        <input type="text" className='circleV-text-input circleV-input-short'
                            value={this.state.baskets}
                            onChange={e => this.handleChange('baskets', e)} />
                        <label className='circleV-label-right'>Row:</label>
                        <input type="text" className='circleV-text-input circleV-input-short'
                            value={this.state.row}
                            onChange={e => this.handleChange('row', e)} />
                        <label className='circleV-label-right'>Net Weight:</label>
                        <input type="text" className='circleV-text-input circleV-input-short'
                            value={this.state.netWeight}
                            onChange={e => this.handleChange('netWeight', e)} />
                    </div>
                    <hr />
                    <div className='circleV-prices-container'>
                        <input type="text" className='circleV-price-input'
                            onChange={e => this.handleChange("qtyLine1", e)}
                            value={this.state.qtyLine1} />
                        <input type="text" className='circleV-desc-other'
                            onChange={e => this.handleChange("descLine1", e)}
                            value={this.state.descLine1} />
                        <input type="text" className='circleV-price-input'
                            onChange={e => this.handleChange("priceLine1", e)}
                            value={this.state.priceLine1} />
                        <span>{(this.state.qtyLine1 * this.state.priceLine1).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>

                        <input type="text" className='circleV-price-input'
                            onChange={e => this.handleChange("qtyLine2", e)}
                            value={this.state.qtyLine2} />
                        <input type="text" className='circleV-desc-other'
                            onChange={e => this.handleChange("descLine2", e)}
                            value={this.state.descLine2} />
                        <input type="text" className='circleV-price-input'
                            onChange={e => this.handleChange("priceLine2", e)}
                            value={this.state.priceLine2} />
                        <span>{(this.state.qtyLine2 * this.state.priceLine2).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
                        <div></div>
                        <div></div>
                        <span>Sub Total</span>
                        <span>{this.state.subTotal.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
                        <div></div>
                        <div></div>
                        <span>TOTAL</span>
                        <span>{this.state.total.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
                        <div></div>
                        <div></div>
                        <span>Amount Paid</span>
                        <input type="text" className='circleV-price-input'
                            onChange={e => this.handleChange("amtPaid", e)}
                            value={this.state.amtPaid} />
                        <div></div>
                        <div></div>
                        <span>Balance</span>
                        <span>{this.state.balance.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
                        <textarea className='circleV-message-input'
                            onChange={e => this.handleChange("message", e)}
                            cols="30" rows="5" value={this.state.message} />
                        <div></div>
                        <div></div>
                        {this.state.edit === false ? (
                            <button className='circleV-save-btn'
                                onClick={() => this.save()}>Save</button>
                        ) : (
                                <button className='circleV-save-btn'
                                    onClick={() => this.update()}>Update</button>
                            )}
                    </div>
                </div>
                <iframe title="pdf" id="output" className='circleV-pdf-iframe'></iframe>
            </div>
        );
    }
}
