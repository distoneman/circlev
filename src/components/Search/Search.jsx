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
        // console.log("search")
        // console.log(this.state.searchCriteria)
        // console.log(this.state.searchType)
        // console.log(this.state.searchField)
        if (this.state.searchField === "customer") {
            const res = await axios.get(`/search/${this.state.searchType}Customer/${this.state.searchCriteria}`)
            // console.log(res.data)
            this.setState({
                searchResults: res.data
            })
        }
        if (this.state.searchField === "soldBy") {
            const res = await axios.get(`/search/${this.state.searchType}SoldBy/${this.state.searchCriteria}`)
            // console.log(res.data)
            this.setState({
                searchResults: res.data
            })
        }
        if (this.state.searchField === "invoiceDate") {
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
        // console.log(this.state.invoice)

    }

    deleteInvoice = async (invoiceID) => {
        await axios.delete(`/${this.state.searchType}/delete/${invoiceID}`)
        this.search();
    }

    printBeefInvoice = async (invoiceID) => {
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
            doc.text('Cut & Wrap (Carcass Weight)', 27, 95);
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
        doc.text(`${this.state.invoice[0].net_weight} Net Weight Misc. Beef Cuts`, 27, 180)
        // doc.save('invoice.pdf')
        doc.autoPrint({});
        var iframe = document.getElementById('output');
        iframe.src = doc.output('dataurlstring');
    }

    printPorkInvoice = async (invoiceID) => {
        console.log(this.state.invoice)
        await this.searchOne(invoiceID)
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: [396, 612]  //5.5in by 8.5in paper
        });
        doc.setFontSize(11);
        doc.text(this.state.invoice[0].sold_by, 18, 39);
        doc.text(moment(this.state.invoice[0].invoice_date).format('MM/DD/YYYY'), 112, 39);
        doc.text(this.state.invoice[0].customer, 15, 45);
        doc.text(this.state.invoice[0].phone, 15, 55);
        doc.text(`${this.state.invoice[0].baskets} Basket - Row ${this.state.invoice[0].row_num}`, 20, 63);
        doc.text(this.state.invoice[0].qty_slaughter.toString()
            , 20, 77, { align: 'right' });
        doc.text('Pork Slaughter', 27, 77);
        doc.text(`$${this.state.invoice[0].price_slaughter}`, 102, 77, { align: 'right' });
        doc.text(this.state.invoice[0].total_slaughter.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 77, { align: 'right' })

        doc.text(this.state.invoice[0].qty_cut.toString(), 20, 85, { align: 'right' })
        doc.text('Cut & Wrap (Carcass Weight)', 27, 85);
        doc.text(`$${this.state.invoice[0].price_cut}`, 102, 85, { align: 'right' });
        doc.text(this.state.invoice[0].total_cut.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 85, { align: 'right' });

        doc.text(this.state.invoice[0].qty_cure.toString(), 20, 93, { align: 'right' })
        doc.text('Cure', 27, 93);
        doc.text(`$${this.state.invoice[0].price_cure}`, 102, 93, { align: 'right' });
        doc.text(this.state.invoice[0].total_cure.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 93, { align: 'right' });

        doc.text(this.state.invoice[0].qty_link.toString(), 20, 101, { align: 'right' });
        doc.text('Link/Patty Sausage', 27, 101);
        doc.text(`$${this.state.invoice[0].price_link}`, 102, 101, { align: 'right' });
        doc.text(this.state.invoice[0].total_link.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 101, { align: 'right' });

        doc.text(this.state.invoice[0].qty_bulk.toString(), 20, 108, { align: 'right' });
        doc.text('Bulk Sausage', 27, 108);
        //
        doc.text(this.state.invoice[0].qty_fat.toString(), 20, 116, { align: 'right' });
        doc.text('Fat Rendered', 27, 116);
        doc.text(`$${this.state.invoice[0].price_fat}`, 102, 116, { align: 'right' });
        doc.text(this.state.invoice[0].total_fat.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 116, { align: 'right' });

        if (Number(this.state.invoice[0].qtyOther) !== 0) {
            doc.text(this.state.invoice[0].qty_other.toString(), 20, 124, { align: 'right' });
            doc.text(this.state.invoice[0].desc_other, 27, 124);
            doc.text(`$${this.state.invoice[0].price_other}`, 102, 124, { align: 'right' });
            doc.text(this.state.invoice[0].total_other.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
                132, 124, { align: 'right' });
        }
        doc.text('Total', 100, 132);
        doc.text(this.state.invoice[0].total.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 132, { align: 'right' });
        doc.text(`${this.state.invoice[0].lard} lbs of Lard`, 60, 140)
        doc.text(this.state.invoice[0].message, 27, 155, { maxWidth: '90' })
        doc.text(`${this.state.invoice[0].net_weight} Net Weight Misc. Pork Cuts`, 60, 185)
        // doc.save('invoice.pdf')
        doc.autoPrint({});
        var iframe = document.getElementById('output');
        iframe.src = doc.output('dataurlstring');
    }

    printSheepInvoice = async (invoiceID) => {
        // console.log('print sheep invoice')
        await this.searchOne(invoiceID)
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: [396, 612]  //5.5in by 8.5in paper
        });
        doc.setFontSize(11);
        doc.text(this.state.invoice[0].sold_by, 18, 39);
        doc.text(moment(this.state.invoice[0].iDate).format('MM/DD/YYYY'), 112, 39);
        doc.text(this.state.invoice[0].customer, 15, 45);
        doc.text(this.state.invoice[0].phone, 15, 55);
        doc.text(`${this.state.invoice[0].baskets} Basket - Row ${this.state.invoice[0].row_num}`, 20, 63);

        doc.text(this.state.invoice[0].qty_slaughter.toString()
            , 20, 77, { align: 'right' });
        doc.text('Sheep Slaughter', 27, 77);
        doc.text(`$${this.state.invoice[0].price_slaughter}`, 102, 77, { align: 'right' });
        doc.text(this.state.invoice[0].total_slaughter.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 77, { align: 'right' })

        doc.text(this.state.invoice[0].qty_cut.toString(), 20, 85, { align: 'right' })
        doc.text('Cut & Wrap (Carcass Weight)', 27, 85);
        doc.text(`$${this.state.invoice[0].price_cut}`, 102, 85, { align: 'right' });
        doc.text(this.state.invoice[0].total_cut.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 85, { align: 'right' });

        doc.text(this.state.invoice[0].qty_bone.toString(), 20, 93, { align: 'right' })
        doc.text('Bone & Roll', 27, 93);
        doc.text(`$${this.state.invoice[0].price_bone}`, 102, 93, { align: 'right' });
        doc.text(this.state.invoice[0].total_bone.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 93, { align: 'right' });

        if (Number(this.state.invoice[0].qty_other) !== 0) {
            doc.text(this.state.invoice[0].qty_other.toString(), 20, 101, { align: 'right' });
            doc.text(this.state.invoice[0].desc_other, 27, 101);
            doc.text(`$${this.state.invoice[0].price_other}`, 102, 101, { align: 'right' });
            doc.text(this.state.invoice[0].total_other.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
                132, 101, { align: 'right' });
        }
        doc.text('Total', 100, 109);
        doc.text(this.state.invoice[0].total.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 109, { align: 'right' });
        doc.text(this.state.invoice[0].message, 27, 120, { maxWidth: '90' })
        doc.text(`${this.state.invoice[0].net_weight} Net Weight Misc. Sheep Cuts`, 60, 150)
        // doc.save('invoice.pdf')
        doc.autoPrint({});
        var iframe = document.getElementById('output');
        iframe.src = doc.output('dataurlstring');
    }

    printCircleVInvoice = async (invoiceID) => {
        // console.log('circlev invoice')
        await this.searchOne(invoiceID)
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: [396, 612]  //5.5in by 8.5in paper
        });
        console.log(this.state.invoice[0])
        doc.setFontSize(11);
        doc.text(this.state.invoice[0].sold_by, 18, 39);
        doc.text(moment(this.state.invoice[0].invoice_date).format('MM/DD/YYYY'), 112, 39);
        doc.text(this.state.invoice[0].customer, 15, 45);
        doc.text(this.state.invoice[0].phone, 15, 55);
        doc.text(`${this.state.invoice[0].baskets} Basket - Row ${this.state.row}`, 20, 63);

        doc.text(this.state.invoice[0].qty_line1.toString()
            , 20, 77, { align: 'right' });
        doc.text(this.state.invoice[0].desc_line1, 27, 77);
        doc.text(`$${this.state.invoice[0].price_line1}`, 102, 77, { align: 'right' });
        doc.text(this.state.invoice[0].total_line1.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 77, { align: 'right' })

        doc.text(this.state.invoice[0].qty_line2.toString()
            , 20, 85, { align: 'right' });
        doc.text(this.state.invoice[0].desc_line2, 27, 85);
        doc.text(`$${this.state.invoice[0].price_line2}`, 102, 85, { align: 'right' });
        doc.text(this.state.invoice[0].total_line2.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 85, { align: 'right' })

        doc.text('Sub Total', 100, 93, { align: 'right' });
        doc.text(this.state.invoice[0].sub_total.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 93, { align: 'right' })

        doc.text('Tax', 100, 101, { align: 'right' });
        doc.text(this.state.invoice[0].tax_amt.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 101, { align: 'right' })

        doc.text('Total', 100, 109, { align: 'right' });
        doc.text(this.state.invoice[0].total.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 109, { align: 'right' });

        if (Number(this.state.invoice[0].amt_paid) !== 0) {
            doc.text('Pre-Paid', 100, 117, { align: 'right' });
            doc.text('$' + this.state.invoice[0].amt_paid.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
                132, 117, { align: 'right' });

            doc.text('Balance', 100, 125, { align: 'right' });
            doc.text(this.state.invoice[0].balance.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
                132, 125, { align: 'right' });
        }

        doc.text(this.state.invoice[0].message, 27, 135, { maxWidth: '90' })
        doc.text(`${this.state.invoice[0].net_weight} Net Weight Misc. Cuts`, 60, 165)
        // doc.save('invoice.pdf')
        doc.autoPrint({});
        var iframe = document.getElementById('output');
        iframe.src = doc.output('dataurlstring');

    }

    printInvoice = async (invoiceID) => {
        await this.searchOne(invoiceID)
        const doc = new jsPDF({
            orientation: 'p',
            unit: 'mm',
            format: [396, 612]  //5.5in by 8.5in paper
        });
        doc.setFontSize(11);
        doc.text(this.state.invoice[0].sold_by, 18, 39);
        doc.text(moment(this.state.invoice[0].invoice_date).format('MM/DD/YYYY'), 112, 39);
        doc.text(this.state.invoice[0].customer, 15, 45);
        doc.text(this.state.invoice[0].memo, 85, 45)
        doc.text(this.state.invoice[0].phone, 15, 55);
        doc.text(`Tax ID: ${this.state.invoice[0].tax_id_num}`, 85, 55); // position, row
        doc.text(this.state.invoice[0].location, 20, 63);
        doc.text(`PO #: ${this.state.invoice[0].po_num}`, 85, 63);

        doc.text(this.state.invoice[0].qty_line1.toString()
            , 20, 77, { align: 'right' });
        doc.text(this.state.invoice[0].desc_line1, 27, 77);
        doc.text(`$${this.state.invoice[0].price_line1}`, 102, 77, { align: 'right' });
        doc.text(this.state.invoice[0].total_line1.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 77, { align: 'right' })

        if (Number(this.state.invoice[0].qty_line2) !== 0) {
            doc.text(this.state.invoice[0].qty_line2.toString()
                , 20, 85, { align: 'right' });
            doc.text(this.state.invoice[0].desc_line2, 27, 85);
            doc.text(`$${this.state.invoice[0].price_line2}`, 102, 85, { align: 'right' });
            doc.text(this.state.invoice[0].total_line2.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
                132, 85, { align: 'right' })
        }

        if (Number(this.state.invoice[0].qty_line3) !== 0) {
            doc.text(this.state.invoice[0].qty_line3.toString()
                , 20, 93, { align: 'right' });
            doc.text(this.state.invoice[0].desc_line3, 27, 93);
            doc.text(`$${this.state.invoice[0].price_line3}`, 102, 93, { align: 'right' });
            doc.text(this.state.invoice[0].total_line3.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
                132, 93, { align: 'right' })
        }

        if (Number(this.state.invoice[0].qty_line4) !== 0) {
            doc.text(this.state.invoice[0].qty_line4.toString()
                , 20, 101, { align: 'right' });
            doc.text(this.state.invoice[0].desc_line4, 27, 101);
            doc.text(`$${this.state.invoice[0].price_line4}`, 102, 101, { align: 'right' });
            doc.text(this.state.invoice[0].total_line4.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
                132, 101, { align: 'right' })
        }

        if (Number(this.state.invoice[0].qty_line5) !== 0) {
            doc.text(this.state.invoice[0].qty_line5.toString()
                , 20, 108, { align: 'right' });
            doc.text(this.state.invoice[0].desc_line5, 27, 108);
            doc.text(`$${this.state.invoice[0].price_line5}`, 102, 108, { align: 'right' });
            doc.text(this.state.invoice[0].total_line5.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
                132, 108, { align: 'right' })
        }

        if (Number(this.state.invoice[0].qty_line6) !== 0) {
            doc.text(this.state.invoice[0].qty_line6.toString()
                , 20, 116, { align: 'right' });
            doc.text(this.state.invoice[0].desc_line6, 27, 116);
            doc.text(`$${this.state.invoice[0].price_line6}`, 102, 116, { align: 'right' });
            doc.text(this.state.invoice[0].total_line6.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
                132, 116, { align: 'right' })
        }

        if (Number(this.state.invoice[0].qty_line7) !== 0) {
            doc.text(this.state.invoice[0].qty_line7.toString()
                , 20, 124, { align: 'right' });
            doc.text(this.state.invoice[0].desc_line7, 27, 124);
            doc.text(`$${this.state.invoice[0].price_line7}`, 102, 124, { align: 'right' });
            doc.text(this.state.invoice[0].total_line7.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
                132, 124, { align: 'right' })
        }

        if (Number(this.state.invoice[0].qty_line8) !== 0) {
            doc.text(this.state.invoice[0].qty_line8.toString()
                , 20, 132, { align: 'right' });
            doc.text(this.state.invoice[0].desc_line8, 27, 132);
            doc.text(`$${this.state.invoice[0].price_line8}`, 102, 132, { align: 'right' });
            doc.text(this.state.invoice[0].total_line8.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
                132, 132, { align: 'right' })
        }

        if (Number(this.state.invoice[0].qty_line9) !== 0) {
            doc.text(this.state.invoice[0].qty_line9.toString()
                , 20, 140, { align: 'right' });
            doc.text(this.state.invoice[0].desc_line9, 27, 140);
            doc.text(`$${this.state.invoice[0].price_line9}`, 102, 140, { align: 'right' });
            doc.text(this.state.invoice[0].total_line9.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
                132, 140, { align: 'right' })
        }

        if (Number(this.state.invoice[0].qty_line10) !== 0) {
            doc.text(this.state.invoice[0].qty_line10.toString()
                , 20, 148, { align: 'right' });
            doc.text(this.state.invoice[0].desc_line10, 27, 148);
            doc.text(`$${this.state.invoice[0].price_line10}`, 102, 148, { align: 'right' });
            doc.text(this.state.invoice[0].total_line10.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
                132, 148, { align: 'right' })
        }

        doc.text('Sub Total', 100, 156, { align: 'right' });
        doc.text(this.state.invoice[0].sub_total.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 156, { align: 'right' })

        doc.text('Tax', 100, 164, { align: 'right' });
        doc.text(this.state.invoice[0].tax_amt.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 164, { align: 'right' })

        doc.text('Total', 100, 172, { align: 'right' });
        doc.text(this.state.invoice[0].total.toLocaleString('us-US', { style: 'currency', currency: 'USD' }),
            132, 172, { align: 'right' });

        // doc.save('invoice.pdf')
        doc.autoPrint({});
        var iframe = document.getElementById('output');
        iframe.src = doc.output('dataurlstring');
    }

    render() {
        let searchResults = this.state.searchResults.map(invoice => {
            let iDate = moment(invoice.invoice_date).format('MM/DD/YYYY')
            if (this.state.searchType === 'beef') {
                var id = invoice.beef_id
                var editURL = `/beef/${id}`;
                var printInvoice = this.printBeefInvoice
            }
            if (this.state.searchType === 'pork') {
                id = invoice.pork_id;
                editURL = `/pork/${id}`;
                printInvoice = this.printPorkInvoice;
            }
            if (this.state.searchType === 'sheep') {
                id = invoice.sheep_id;
                editURL = `/sheep/${id}`;
                printInvoice = this.printSheepInvoice;
            }
            if (this.state.searchType === 'circleV') {
                id = invoice.circlev_id;
                editURL = `/circlev/${id}`;
                printInvoice = this.printCircleVInvoice;
            }
            if (this.state.searchType === 'invoice') {
                id = invoice.invoice_id;
                editURL = `/invoice/${id}`;
                printInvoice = this.printInvoice;
            }

            return (
                <SearchDisplay
                    key={id}
                    id={id}
                    searchType={this.state.searchType}
                    iDate={iDate}
                    customer={invoice.customer}
                    soldBy={invoice.sold_by}
                    phone={invoice.phone}
                    total={invoice.total}
                    weight={invoice.net_weight}
                    printInvoice={printInvoice}
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
                            <option value="circleV">Circle V</option>
                            <option value="invoice">General Invoice</option>
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
                    {/* <div className='search-results-item-title'>Weight</div> */}
                    <div className='search-results-item-title'></div>
                </div>
                {searchResults}
                <iframe title="pdf" id="output" className='beef-pdf-iframe'></iframe>
            </div>
        )
    }
}