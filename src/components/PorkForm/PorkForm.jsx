import React, { Component } from "react";
import axios from "axios";
import moment from 'moment';
import InputMask from 'react-input-mask';
import jsPDF from "jspdf";
import Swal from 'sweetalert2';

import './PorkForm.css'

export default class PorkForm extends Component {
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
            porkPrices: {},
            slaughterTotal: 0,
            cutWrapTotal: 0,
            cureTotal: 0,
            linkTotal: 0,
            fatTotal: 0,
            otherTotal: 0
        };
    }
    async componentDidMount() {
        if (this.props.match.params.ID === undefined) {
            // console.log("no edit")
            let res = await axios.get("/pork/prices");
            await this.setState({ porkPrices: res.data[0] });
            // console.log(this.state.porkPrices);
        } else {
            this.setState({ edit: true });
            // console.log("edit")
            let res = await axios.get(`/search/porkID/${this.props.match.params.ID}`);
            // console.log(res.data)
            let invoicePrices = {
                slaughter: res.data[0].price_slaughter,
                cut_wrap: res.data[0].price_cut,
                cure: res.data[0].price_cure,
                links: res.data[0].price_link,
                fat: res.data[0].price_fat
            }
            await this.setState({ porkPrices: invoicePrices })
            await this.setState({
                invoiceID: res.data[0].pork_id,
                soldBy: res.data[0].sold_by,
                customer: res.data[0].customer,
                iDate: res.data[0].invoice_date,
                phone: res.data[0].phone,
                cellPhone: res.data[0].cell_phone,
                email: res.data[0].email,
                baskets: res.data[0].baskets,
                row: res.data[0].row_num,
                slaughter: res.data[0].qty_slaughter,
                cutWrap: res.data[0].qty_cut,
                cure: res.data[0].qty_cure,
                links: res.data[0].qty_link,
                bulk: res.data[0].qty_bulk,
                fat: res.data[0].qty_fat,
                qtyOther: res.data[0].qty_other,
                descOther: res.data[0].desc_other,
                priceOther: res.data[0].price_other,
                lard: res.data[0].lard,
                netWeight: res.data[0].net_weight,
                message: res.data[0].message,
                total: res.data[0].total,
                slaughterTotal: res.data[0].total_slaughter,
                cutWrapTotal: res.data[0].total_cut,
                cureTotal: res.data[0].total_cure,
                linkTotal: res.data[0].total_link,
                fatTotal: res.data[0].total_fat,
                otherTotal: res.data[0].total_other
            })
        }
    }

    save = async () => {
        // console.log("save");
        this.calcTotal()
        await axios.post("/pork/save", {
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
            cure: this.state.cure,
            links: this.state.links,
            bulk: this.state.bulk,
            fat: this.state.fat,
            qty_other: this.state.qtyOther,
            desc_other: this.state.descOther,
            price_other: this.state.priceOther,
            total: this.state.total,
            lard: this.state.lard,
            net_weight: this.state.netWeight,
            message: this.state.message
        });
        await this.printInvoice();
        await this.resetState();
    };

    update = async () => {
        this.calcTotal();
        // console.log(this.state.total)
        // let total_slaughter = this.state.slaughter * this.state.porkPrices.slaughter;
        // let total_cut = this.state.cut * this.state.porkPrices.cut
        await axios.put(`/pork/update`, {
            pork_id: this.state.invoiceID,
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
            qty_cure: this.state.cure,
            total_cure: this.state.cureTotal,
            qty_link: this.state.links,
            total_link: this.state.linkTotal,
            qty_bulk: this.state.bulk,
            qty_fat: this.state.fat,
            total_fat: this.state.fatTotal,
            qty_other: this.state.qtyOther,
            desc_other: this.state.descOther,
            price_other: this.state.priceOther,
            total_other: this.state.otherTotal,
            total: this.state.total,
            lard: this.state.lard,
            net_weight: this.state.netWeight,
            message: this.state.message
        })
        Swal.fire({
            title: 'Invoice Updated',
            // text: "You won't be able to revert this!",
            // type: 'warning',
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
            // this.props.history.push('/pork')  //redirect
        })

    }

    resetState = async () => {
        let res = await axios.get("/pork/prices");
        await this.setState ({
            porkPrices: res.data[0],
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
            slaughterTotal: 0,
            cutWrapTotal: 0,
            cureTotal: 0,
            linkTotal: 0,
            fatTotal: 0,
            otherTotal: 0
        });
    }

    async handleChange(key, value) {
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
        let slaughterTotal = this.state.slaughter * this.state.porkPrices.slaughter;
        let cutWrapTotal = this.state.cutWrap * this.state.porkPrices.cut_wrap;
        let cureTotal = this.state.cure * this.state.porkPrices.cure;
        let linkTotal = this.state.links * this.state.porkPrices.links;
        let fatTotal = this.state.fat * this.state.porkPrices.fat;
        let otherTotal = this.state.qtyOther * this.state.priceOther;
        let total = slaughterTotal + cutWrapTotal + cureTotal + linkTotal + fatTotal + otherTotal;
        let lard =  2 * Math.round((Number(this.state.fat) * .66) / 2)
        // console.log(lard)
        this.setState({
            total: total,
            slaughterTotal: slaughterTotal,
            cutWrapTotal: cutWrapTotal,
            cureTotal: cureTotal,
            linkTotal: linkTotal,
            fatTotal: fatTotal,
            otherTotal: otherTotal,
            lard: lard
        });
    }

    printInvoice = () => {
        // console.log(this.state.slaughterTotal);
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
        doc.text('Pork Slaughter', 27, 77);
        doc.text(`$${this.state.porkPrices.slaughter}`, 102, 77, { align: 'right' });
        doc.text(this.state.slaughterTotal.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 77, { align: 'right' })

        doc.text(this.state.cutWrap.toString(), 20, 85, { align: 'right' })
        doc.text('Cut & Wrap (Carcass Weight)', 27, 85);
        doc.text(`$${this.state.porkPrices.cut_wrap}`, 102, 85, { align: 'right' });
        doc.text(this.state.cutWrapTotal.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 85, { align: 'right' });

        doc.text(this.state.cure.toString(), 20, 93, { align: 'right' })
        doc.text('Cure', 27, 93);
        doc.text(`$${this.state.porkPrices.cure}`, 102, 93, { align: 'right' });
        doc.text(this.state.cureTotal.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 93, { align: 'right' });

        doc.text(this.state.links.toString(), 20, 101, { align: 'right' });
        doc.text('Link/Patty Sausage', 27, 101);
        doc.text(`$${this.state.porkPrices.links}`, 102, 101, { align: 'right' });
        doc.text(this.state.linkTotal.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 101, { align: 'right' });

        doc.text(this.state.bulk.toString(), 20, 108, { align: 'right' });
        doc.text('Bulk Sausage', 27, 108);
        //
        doc.text(this.state.fat.toString(), 20, 116, { align: 'right' });
        doc.text('Fat Rendered', 27, 116);
        doc.text(`$${this.state.porkPrices.fat}`, 102, 116, { align: 'right' });
        doc.text(this.state.fatTotal.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 116, { align: 'right' });

        if (Number(this.state.qtyOther) !== 0) {
            doc.text(this.state.qtyOther.toString(), 20, 124, { align: 'right' });
            doc.text(this.state.descOther, 27, 124);
            doc.text(`$${this.state.priceOther}`, 102, 124, { align: 'right' });
            doc.text(this.state.otherTotal.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
                132, 124, { align: 'right' });
        }
        doc.text('Total', 100, 132);
        doc.text(this.state.total.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 132, { align: 'right' });
        doc.text(`${this.state.lard} lbs of Lard`, 60, 140)
        doc.text(this.state.message, 27, 155, { maxWidth: '90' })
        doc.text(`${this.state.netWeight} Net Weight Misc. Pork Cuts`, 60, 185)
        // doc.save('invoice.pdf')
        doc.autoPrint({});
        var iframe = document.getElementById('output');
        iframe.src = doc.output('dataurlstring');
    }

    render() {
        return (
            <div className='pork-container'>
                <div className="pork-form">
                    <span className='pork-title'>Pig</span>
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
                        <input type="text" className="pork-text-input"
                            value={this.state.customer}
                            onChange={e => this.handleChange("customer", e)} />
                        <label className='pork-label-right'>E-Mail:</label>
                        <input type="text" className="pork-text-input"
                            value={this.state.email}
                            onChange={e => this.handleChange("email", e)} />
                        <label className='pork-label-right'>Phone:</label>
                        <div>
                            <InputMask 
                                mask="999-999-9999" maskChar={null}
                                className="pork-text-input pork-input-short"
                                value={this.state.phone}
                                onChange={e => this.handleChange("phone", e)} />
                            <label>Cell:</label>
                            <input type="checkbox"
                                checked={this.state.cellPhone}
                                onClick={e => this.toggleCell()} />
                        </div>
                        <label className='pork-label-right'>Baskets:</label>
                        <input type="type" className="pork-text-input pork-input-short"
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
                        <span>{this.state.lard} lbs</span>
                    </div>
                    <hr />
                    <div className='pork-prices-container'>
                        <input className='pork-price-input'
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
                        <span>${this.state.porkPrices.links}</span>
                        <span>{(this.state.links * this.state.porkPrices.links).toLocaleString('us-US', { style: 'currency', currency: 'USD' })}</span>
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
                            <button className='pork-save-btn'
                                onClick={() => this.save()}>Save</button>
                        ) : (
                                <button className='pork-save-btn'
                                    onClick={() => this.update()}>Update</button>
                            )}
                    </div>
                </div>
                <iframe title="pdf" id="output" className='pork-pdf-iframe'></iframe>
            </div>
        );
    }
}
