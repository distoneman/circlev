import React, { Component } from "react";
import axios from "axios";
import moment from 'moment';
import InputMask from 'react-input-mask';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';

import './InvoiceForm.css'

export default class InvoiceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            invoiceID: 0,
            soldBy: 'Circle V Meat',
            iDate: new Date(),
            customer: '',
            memo: '',
            phone: '',
            cellPhone: false,
            taxExempt: false,
            taxIdNum: '',
            poNum: '',
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
            qtyLine3: 0,
            descLine3: '',
            priceLine3: 0,
            totalLine3: 0,
            qtyLine4: 0,
            descLine4: '',
            priceLine4: 0,
            totalLine4: 0,
            qtyLine5: 0,
            descLine5: '',
            priceLine5: 0,
            totalLine5: 0,
            qtyLine6: 0,
            descLine6: '',
            priceLine6: 0,
            totalLine6: 0,
            qtyLine7: 0,
            descLine7: '',
            priceLine7: 0,
            totalLine7: 0,
            qtyLine8: 0,
            descLine8: '',
            priceLine8: 0,
            totalLine8: 0,
            subTotal: 0,
            taxAmt: 0,
            taxRate: .03,
            total: 0
        };
    }
    async componentDidMount() {
    }

    save = async () => {
        // console.log("save");
        await axios.post("/invoice/save", {
            iDate: this.state.iDate,
            soldBy: this.state.soldBy,
            customer: this.state.customer,
            memo: this.state.memo,
            taxExempt: this.state.taxExempt,
            taxIdNum: this.state.taxIdNum,
            poNum: this.state.poNum,
            phone: this.state.phone,
            cellPhone: this.state.cellPhone,
            email: this.state.email,
            location: this.state.location,
            qtyLine1: this.state.qtyLine1,
            descLine1: this.state.descLine1,
            priceLine1: this.state.priceLine1,
            totalLine1: this.state.totalLine1,
            qtyLine2: this.state.qtyLine2,
            descLine2: this.state.descLine2,
            priceLine2: this.state.priceLine2,
            totalLine2: this.state.totalLine2,
            qtyLine3: this.state.qtyLine3,
            descLine3: this.state.descLine3,
            priceLine3: this.state.priceLine3,
            totalLine3: this.state.totalLine3,
            qtyLine4: this.state.qtyLine4,
            descLine4: this.state.descLine4,
            priceLine4: this.state.priceLine4,
            totalLine4: this.state.totalLine4,
            qtyLine5: this.state.qtyLine5,
            descLine5: this.state.descLine5,
            priceLine5: this.state.priceLine5,
            totalLine5: this.state.totalLine5,
            qtyLine6: this.state.qtyLine6,
            descLine6: this.state.descLine6,
            priceLine6: this.state.priceLine6,
            totalLine6: this.state.totalLine6,
            qtyLine7: this.state.qtyLine7,
            descLine7: this.state.descLine7,
            priceLine7: this.state.priceLine7,
            totalLine7: this.state.totalLine7,
            qtyLine8: this.state.qtyLine8,
            descLine8: this.state.descLine8,
            priceLine8: this.state.priceLine8,
            totalLine8: this.state.totalLine8,
            subTotal: this.state.subTotal,
            taxAmt: this.state.taxAmt,
            total: this.state.total
        });
        await this.printInvoice();
        await this.resetState();
    };

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
        doc.text(`${this.state.location}`, 20, 63);

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

        doc.text(this.state.qtyLine3.toString()
            , 20, 93, { align: 'right' });
        doc.text(this.state.descLine3, 27, 93);
        doc.text(`$${this.state.priceLine3}`, 102, 93, { align: 'right' });
        doc.text(this.state.totalLine3.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 93, { align: 'right' })

        doc.text(this.state.qtyLine4.toString()
            , 20, 101, { align: 'right' });
        doc.text(this.state.descLine4, 27, 101);
        doc.text(`$${this.state.priceLine4}`, 102, 101, { align: 'right' });
        doc.text(this.state.totalLine4.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 101, { align: 'right' })

        doc.text(this.state.qtyLine5.toString()
            , 20, 108, { align: 'right' });
        doc.text(this.state.descLine5, 27, 108);
        doc.text(`$${this.state.priceLine5}`, 102, 108, { align: 'right' });
        doc.text(this.state.totalLine5.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 108, { align: 'right' })

        doc.text(this.state.qtyLine6.toString()
            , 20, 116, { align: 'right' });
        doc.text(this.state.descLine6, 27, 116);
        doc.text(`$${this.state.priceLine6}`, 102, 116, { align: 'right' });
        doc.text(this.state.totalLine6.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 116, { align: 'right' })

        doc.text(this.state.qtyLine7.toString()
            , 20, 124, { align: 'right' });
        doc.text(this.state.descLine7, 27, 124);
        doc.text(`$${this.state.priceLine7}`, 102, 124, { align: 'right' });
        doc.text(this.state.totalLine7.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 124, { align: 'right' })

        doc.text(this.state.qtyLine8.toString()
            , 20, 132, { align: 'right' });
        doc.text(this.state.descLine8, 27, 132);
        doc.text(`$${this.state.priceLine8}`, 102, 132, { align: 'right' });
        doc.text(this.state.totalLine8.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 132, { align: 'right' })

        doc.text('Sub Total', 100, 140, { align: 'right' });
        doc.text(this.state.subTotal.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 140, { align: 'right' })

        doc.text('Tax', 100, 148, { align: 'right' });
        doc.text(this.state.taxAmt.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 148, { align: 'right' })

        doc.text('Total', 100, 156, { align: 'right' });
        doc.text(this.state.total.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 156, { align: 'right' });

        doc.save('invoice.pdf')
        doc.autoPrint({});
        var iframe = document.getElementById('output');
        iframe.src = doc.output('dataurlstring');
    }

    resetState = async () => {
        await this.setState({
            edit: false,
            invoiceID: 0,
            soldBy: 'Circle V Meat',
            iDate: new Date(),
            customer: '',
            memo: '',
            phone: '',
            cellPhone: false,
            taxExempt: false,
            taxIdNum: '',
            poNum: '',
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
            qtyLine3: 0,
            descLine3: '',
            priceLine3: 0,
            totalLine3: 0,
            qtyLine4: 0,
            descLine4: '',
            priceLine4: 0,
            totalLine4: 0,
            qtyLine5: 0,
            descLine5: '',
            priceLine5: 0,
            totalLine5: 0,
            qtyLine6: 0,
            descLine6: '',
            priceLine6: 0,
            totalLine6: 0,
            qtyLine7: 0,
            descLine7: '',
            priceLine7: 0,
            totalLine7: 0,
            qtyLine8: 0,
            descLine8: '',
            priceLine8: 0,
            totalLine8: 0,
            subTotal: 0,
            taxAmt: 0,
            taxRate: .03,
            total: 0
        })
    }

    calcTotal = async () => {
        let totalLine1 = this.state.qtyLine1 * this.state.priceLine1;
        let totalLine2 = this.state.qtyLine2 * this.state.priceLine2;
        let totalLine3 = this.state.qtyLine3 * this.state.priceLine3;
        let totalLine4 = this.state.qtyLine4 * this.state.priceLine4;
        let totalLine5 = this.state.qtyLine5 * this.state.priceLine5;
        let totalLine6 = this.state.qtyLine6 * this.state.priceLine6;
        let totalLine7 = this.state.qtyLine7 * this.state.priceLine7;
        let totalLine8 = this.state.qtyLine8 * this.state.priceLine8;

        let subTotal = totalLine1 + totalLine2 + totalLine3 + totalLine4 +
            totalLine5 + totalLine6 + totalLine7 + totalLine8;
        if (this.state.taxExempt === false) {
            var taxAmt = subTotal * this.state.taxRate;
        } else {
            var taxAmt = 0;
        }
        let total = subTotal + taxAmt;
        // console.log(subTotal)
        this.setState({
            totalLine1: totalLine1,
            totalLine2: totalLine2,
            totalLine3: totalLine3,
            totalLine4: totalLine4,
            totalLine5: totalLine5,
            totalLine6: totalLine6,
            totalLine7: totalLine7,
            totalLine8: totalLine8,
            subTotal: subTotal,
            taxAmt: taxAmt,
            total: total,
        });
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

    async toggleTaxExempt() {
        await this.setState({
            taxExempt: !this.state.taxExempt
        })
        this.calcTotal();
    }

    render() {
        return (
            <div className='invoice-container'>
                <div className="invoice-form">
                    <span className='invoice-title'>General Invoice Form</span>
                    <hr />
                    <div className='invoice-header-container'>
                        <label className='invoice-label-right'>Date:</label>
                        <InputMask mask="99/99/9999" maskChar={null}
                            className='invoice-text-input invoice-input-short'
                            onChange={e => this.handleChange('iDate', e)}
                            value={moment(this.state.iDate).format('MM/DD/YYYY')} />
                        <label className='invoice-label-right'>Sold By:</label>
                        <input type="text" className='invoice-text-input'
                            value={this.state.soldBy}
                            onChange={e => this.handleChange('soldBy', e)} />
                        <label className='invoice-label-right'>Customer:</label>
                        <input type="text" className='invoice-text-input'
                            value={this.state.customer}
                            onChange={e => this.handleChange('customer', e)} />
                        <label className='invoice-label-right'>Memo:</label>
                        <input type="text" className='invoice-text-input'
                            value={this.state.memo}
                            onChange={e => this.handleChange('memo', e)} />
                        <label className='invoice-label-right'>E-Mail:</label>
                        <input type="text" className='invoice-text-input'
                            value={this.state.email}
                            onChange={e => this.handleChange('email', e)} />
                        <label className='invoice-label-right'>Phone:</label>
                        <div>
                            <InputMask mask='999-999-9999' maskChar={null}
                                className='invoice-text-input invoice-input-short'
                                value={this.state.phone}
                                onChange={e => this.handleChange('phone', e)} />
                            <label>Cell:</label>
                            <input type="checkbox" className='invoice-checkbox'
                                checked={this.state.cellPhone}
                                onClick={e => this.toggleCell()} />
                        </div>
                        <label className='invoice-label-right'>Tax Exempt:</label>
                        <input type="checkbox" className='invoice-checkbox'
                            checked={this.state.taxExempt}
                            onClick={e => this.toggleTaxExempt()} />
                        <label className='invoice-label-right'>Tax ID Number:</label>
                        <input type="text" className='invoice-text-input invoice-input-short'
                            value={this.state.taxIdNum}
                            onChange={e => this.handleChange('taxIdNum', e)} />
                        <label className='invoice-label-right'>PO Number:</label>
                        <input type="text" className='invoice-text-input invoice-input-short'
                            value={this.state.poNum}
                            onChange={e => this.handleChange('poNum', e)} />
                        <label className='invoice-label-right'>Location:</label>
                        <input type="text" className='invoice-text-input'
                            value={this.state.location}
                            onChange={e => this.handleChange('location', e)} />
                    </div>
                    <hr />
                    <div className='invoice-prices-container'>
                        <input type="text" className='invoice-price-input'
                            onChange={e => this.handleChange("qtyLine1", e)}
                            value={this.state.qtyLine1} />
                        <input type="text" className='invoice-desc-other'
                            onChange={e => this.handleChange("descLine1", e)}
                            value={this.state.descLine1} />
                        <input type="text" className='invoice-price-input'
                            onChange={e => this.handleChange("priceLine1", e)}
                            value={this.state.priceLine1} />
                        <span>{(this.state.qtyLine1 * this.state.priceLine1).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>

                        <input type="text" className='invoice-price-input'
                            onChange={e => this.handleChange("qtyLine2", e)}
                            value={this.state.qtyLine2} />
                        <input type="text" className='invoice-desc-other'
                            onChange={e => this.handleChange("descLine2", e)}
                            value={this.state.descLine2} />
                        <input type="text" className='invoice-price-input'
                            onChange={e => this.handleChange("priceLine2", e)}
                            value={this.state.priceLine2} />
                        <span>{(this.state.qtyLine2 * this.state.priceLine2).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>

                        <input type="text" className='invoice-price-input'
                            onChange={e => this.handleChange("qtyLine3", e)}
                            value={this.state.qtyLine3} />
                        <input type="text" className='invoice-desc-other'
                            onChange={e => this.handleChange("descLine3", e)}
                            value={this.state.descLine3} />
                        <input type="text" className='invoice-price-input'
                            onChange={e => this.handleChange("priceLine3", e)}
                            value={this.state.priceLine3} />
                        <span>{(this.state.qtyLine3 * this.state.priceLine3).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>

                        <input type="text" className='invoice-price-input'
                            onChange={e => this.handleChange("qtyLine4", e)}
                            value={this.state.qtyLine4} />
                        <input type="text" className='invoice-desc-other'
                            onChange={e => this.handleChange("descLine4", e)}
                            value={this.state.descLine4} />
                        <input type="text" className='invoice-price-input'
                            onChange={e => this.handleChange("priceLine4", e)}
                            value={this.state.priceLine4} />
                        <span>{(this.state.qtyLine4 * this.state.priceLine4).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>

                        <input type="text" className='invoice-price-input'
                            onChange={e => this.handleChange("qtyLine5", e)}
                            value={this.state.qtyLine5} />
                        <input type="text" className='invoice-desc-other'
                            onChange={e => this.handleChange("descLine5", e)}
                            value={this.state.descLine5} />
                        <input type="text" className='invoice-price-input'
                            onChange={e => this.handleChange("priceLine5", e)}
                            value={this.state.priceLine5} />
                        <span>{(this.state.qtyLine5 * this.state.priceLine5).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>

                        <input type="text" className='invoice-price-input'
                            onChange={e => this.handleChange("qtyLine6", e)}
                            value={this.state.qtyLine6} />
                        <input type="text" className='invoice-desc-other'
                            onChange={e => this.handleChange("descLine6", e)}
                            value={this.state.descLine6} />
                        <input type="text" className='invoice-price-input'
                            onChange={e => this.handleChange("priceLine6", e)}
                            value={this.state.priceLine6} />
                        <span>{(this.state.qtyLine6 * this.state.priceLine6).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>

                        <input type="text" className='invoice-price-input'
                            onChange={e => this.handleChange("qtyLine7", e)}
                            value={this.state.qtyLine7} />
                        <input type="text" className='invoice-desc-other'
                            onChange={e => this.handleChange("descLine7", e)}
                            value={this.state.descLine7} />
                        <input type="text" className='invoice-price-input'
                            onChange={e => this.handleChange("priceLine7", e)}
                            value={this.state.priceLine7} />
                        <span>{(this.state.qtyLine7 * this.state.priceLine7).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>

                        <input type="text" className='invoice-price-input'
                            onChange={e => this.handleChange("qtyLine8", e)}
                            value={this.state.qtyLine8} />
                        <input type="text" className='invoice-desc-other'
                            onChange={e => this.handleChange("descLine8", e)}
                            value={this.state.descLine8} />
                        <input type="text" className='invoice-price-input'
                            onChange={e => this.handleChange("priceLine8", e)}
                            value={this.state.priceLine8} />
                        <span>{(this.state.qtyLine8 * this.state.priceLine8).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>

                        <div></div>
                        <div></div>
                        <span>Sub Total</span>
                        <span>{this.state.subTotal.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>

                        <div></div>
                        <div></div>
                        <span>Tax</span>
                        <span>{this.state.taxAmt.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>

                        <div></div>
                        <div></div>
                        <span>TOTAL</span>
                        <span>{this.state.total.toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
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
