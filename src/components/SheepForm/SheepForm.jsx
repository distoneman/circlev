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
            otherTotal: 0,
            netWeight: 0,
            total: 0,
            sheepPrices: {},
            slaughterTotal: 0,
            cutWrapTotal: 0,
            boneTotal: 0,
            message: ''
        };
    }

    async componentDidMount() {
        if (this.props.match.params.ID === undefined) {
            let res = await axios.get("/sheep/prices");
            await this.setState({ sheepPrices: res.data[0] });
            // console.log(this.state.sheepPrices);
        } else {
            this.setState({ edit: true });
            let res = await axios.get(`/search/sheepID/${this.props.match.params.ID}`);
            // console.log(res.data)
            let invoicePrices = {
                slaughter: res.data[0].price_slaughter,
                cut_wrap: res.data[0].price_cut,
                bone_roll: res.data[0].price_bone
            }
            await this.setState({ sheepPrices: invoicePrices })
            await this.setState({
                invoiceID: res.data[0].sheep_id,
                soldBy: res.data[0].sold_by,
                iDate: res.data[0].invoice_date,
                customer: res.data[0].customer,
                phone: res.data[0].phone,
                cellPhone: res.data[0].cell_phone,
                email: res.data[0].email,
                baskets: res.data[0].baskets,
                row: res.data[0].row_num,
                slaughter: res.data[0].qty_slaughter,
                cutWrap: res.data[0].qty_cut,
                boneRoll: res.data[0].qty_bone,
                qtyOther: res.data[0].qty_other,
                descOther: res.data[0].desc_other,
                priceOther: res.data[0].price_other,
                netWeight: res.data[0].net_weight,
                total: res.data[0].total,
                slaughterTotal: res.data[0].total_slaughter,
                cutWrapTotal: res.data[0].total_cut,
                boneTotal: res.data[0].total_bone,
                message: res.data[0].message
            })
        }
    }

    save = async () => {
        // console.log("save");
        await axios.post("/sheep/save", {
            soldBy: this.state.soldBy,
            iDate: moment(this.state.iDate).format('l'),
            customer: this.state.customer,
            email: this.state.email,
            phone: this.state.phone,
            cellPhone: this.state.cellPhone,
            baskets: this.state.baskets,
            row: this.state.row,
            slaughter: this.state.slaughter,
            priceSlaughter: this.state.sheepPrices.slaughter,
            cutWrap: this.state.cutWrap,
            priceCutWrap: this.state.sheepPrices.cut_wrap,
            boneRoll: this.state.boneRoll,
            priceBone: this.state.sheepPrices.bone_roll,
            qtyOther: this.state.qtyOther,
            descOther: this.state.descOther,
            priceOther: this.state.priceOther,
            otherTotal: this.state.otherTotal,
            total: this.state.total,
            netWeight: this.state.netWeight,
            message: this.state.message,
            slaughterTotal: this.state.slaughterTotal,
            cutWrapTotal: this.state.cutWrapTotal,
            boneTotal: this.state.boneTotal
        });
        await this.printInvoice();
        await this.resetState();
    };

    calcTotal = async () => {
        let slaughterTotal = this.state.slaughter * this.state.sheepPrices.slaughter;
        let cutWrapTotal = this.state.cutWrap * this.state.sheepPrices.cut_wrap;
        let boneTotal = this.state.boneRoll * this.state.sheepPrices.bone_roll;
        let otherTotal = this.state.qtyOther * this.state.priceOther;
        let total = slaughterTotal + cutWrapTotal + boneTotal + otherTotal;
        this.setState({
            total: total,
            slaughterTotal: slaughterTotal,
            cutWrapTotal: cutWrapTotal,
            boneTotal: boneTotal,
            otherTotal: otherTotal
        })
    }

    resetState = async () => {
        let res = await axios.get("/sheep/prices");
        await this.setState({
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
            sheepPrices: res.data[0],
            slaughterTotal: 0,
            cutWrapTotal: 0,
            boneTotal: 0,
            message: ''
        })
    }

    async handleChange(key, value) {
        await this.setState({
            [key]: value.target.value
        });
        await this.calcTotal();
        // console.log(this.state);
    }

    async toggleCell() {
        await this.setState({
            cellPhone: !this.state.cellPhone
        })
        // console.log(this.state.cellPhone)
    }

    printInvoice = () => {
        // console.log(this.state.slaughterTotal);
        // console.log(this.state.row)
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

        doc.text(this.state.slaughter.toString()
            , 20, 77, { align: 'right' });
        doc.text('Sheep Slaughter', 27, 77);
        doc.text(`$${this.state.sheepPrices.slaughter}`, 102, 77, { align: 'right' });
        doc.text(this.state.slaughterTotal.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 77, { align: 'right' })

        doc.text(this.state.cutWrap.toString(), 20, 85, { align: 'right' })
        doc.text('Cut & Wrap (Carcass Weight)', 27, 85);
        doc.text(`$${this.state.sheepPrices.cut_wrap}`, 102, 85, { align: 'right' });
        doc.text(this.state.cutWrapTotal.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 85, { align: 'right' });

        doc.text(this.state.boneRoll.toString(), 20, 93, { align: 'right' })
        doc.text('Bone & Roll', 27, 93);
        doc.text(`$${this.state.sheepPrices.bone_roll}`, 102, 93, { align: 'right' });
        doc.text(this.state.boneTotal.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 93, { align: 'right' });

        if (Number(this.state.qtyOther) !== 0) {
            doc.text(this.state.qtyOther.toString(), 20, 101, { align: 'right' });
            doc.text(this.state.descOther, 27, 101);
            doc.text(`$${this.state.priceOther}`, 102, 101, { align: 'right' });
            doc.text(this.state.otherTotal.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
                132, 101, { align: 'right' });
        }
        doc.text('Total', 100, 109);
        doc.text(this.state.total.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 109, { align: 'right' });
        doc.text(this.state.message, 27, 120, { maxWidth: '90' })
        doc.text(`${this.state.netWeight} Net Weight Misc. Sheep Cuts`, 60, 150)
        // doc.save('invoice.pdf')
        doc.autoPrint({});
        var iframe = document.getElementById('output');
        iframe.src = doc.output('dataurlstring');
    }

    update = async () => {
        // console.log('update')
        this.calcTotal();
        await axios.put(`/sheep/update`, {
            sheep_id: this.state.invoiceID,
            iDate: moment(this.state.iDate).format('l'),
            soldBy: this.state.soldBy,
            customer: this.state.customer,
            phone: this.state.phone,
            cellPhone: this.state.cellPhone,
            email: this.state.email,
            baskets: this.state.baskets,
            row: this.state.row,
            qty_slaughter: this.state.slaughter,
            total_slaughter: this.state.slaughterTotal,
            qty_cut: this.state.cutWrap,
            total_cut: this.state.cutWrapTotal,
            qty_bone: this.state.boneRoll,
            total_bone: this.state.boneRoll,
            qty_other: this.state.qtyOther,
            desc_other: this.state.descOther,
            price_other: this.state.priceOther,
            total_other: this.state.otherTotal,
            total: this.state.total,
            net_weight: this.state.netWeight,
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
                // this.resetState();
                // Swal.fire(
                //   'Invoice Printed'
                // )
            }
            this.resetState()
        })
    }

    render() {
        return (
            <div className='sheep-container'>
                <div className="sheep-form">
                    <span className='sheep-title'>Sheep</span>
                    <hr />
                    <div className='sheep-header-container'>
                        <label className='sheep-label-right'>Date:</label>
                        <InputMask mask="99/99/9999" maskChar={null}
                            className='sheep-text-input sheep-input-short'
                            onChange={e => this.handleChange('iDate', e)}
                            value={moment(this.state.iDate).format('MM/DD/YYYY')} />
                        <label className='sheep-label-right'>Sold By:</label>
                        <input type="text" className='sheep-text-input'
                            value={this.state.soldBy}
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
                        <label className='sheep-label-right'>Net Weight:</label>
                        <input type="text" className='sheep-text-input sheep-input-short'
                            value={this.state.netWeight}
                            onChange={e => this.handleChange('netWeight', e)} />
                    </div>
                    <hr />
                    <div className='sheep-prices-container'>
                        <input type="text" className='sheep-price-input'
                            value={this.state.slaughter}
                            onChange={e => this.handleChange('slaughter', e)} />
                        <label>Sheep Slaughter</label>
                        <span>${this.state.sheepPrices.slaughter}</span>
                        <span>{(this.state.slaughter * this.state.sheepPrices.slaughter).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
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
                <iframe title="pdf" id="output" className='sheep-pdf-iframe'></iframe>
            </div>
        );
    }
}
