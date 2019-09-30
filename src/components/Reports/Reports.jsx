import React, { Component } from 'react';
import InputMask from 'react-input-mask';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';

import './Reports.css'

export default class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {
            report: '',
            taxYear: null,
            taxQtr: null,
            startDate: null,
            endDate: null,
            nonTaxSales: null,
            taxSales: null,
            taxAmt:null
        }

    }
    async componentDidMount() {

    }

    grindingReport = async () => {
        // this.getGrindingData();
        const res = await axios.get(`/reports/grinding/?startDate=${this.state.startDate}&endDate=${this.state.endDate}`)
        var rows = [];
        res.data.forEach(e => {
            var temp = [e.date_fmt, e.customer, e.qty_patties,
            e.net_weight, Number(e.gr_beef).toFixed(2)];
            rows.push(temp);
        });

        const doc = new jsPDF({
            orientation: 'p',
        })
        doc.text('Grinding Report', 15, 15)
        doc.autoTable({
            startY: 25,
            head: [
                ['Date', 'Customer', 'Patties', 'Net Weight', 'Ground Beef'],
            ],
            body: rows
        });
        // doc.save('invoice.pdf')
        doc.autoPrint({});
        // doc.output('dataurlnewwindow');
        var iframe = document.getElementById('output');
        iframe.src = doc.output('dataurlstring');
    }

    qtrTax = async () => {
        //Beef Sales Non-Tax
        const resBeef = await axios.get(`/reports/qtrBeefSales/?taxYear=${this.state.taxYear}&taxQtr=${this.state.taxQtr}`)
        console.log(resBeef.data[0].sum)
        let beefSales = resBeef.data[0].sum
        this.setState({
            nonTaxSales: Number(this.state.nonTaxSales) + Number(beefSales)
        })
        console.log('state: ' + this.state.nonTaxSales)
        //Pork Sales Non-Tax
        const resPork = await axios.get(`/reports/qtrPorkSales/?taxYear=${this.state.taxYear}&taxQtr=${this.state.taxQtr}`)
        console.log(resPork.data[0].sum)
        let porkSales = resPork.data[0].sum
        this.setState({
            nonTaxSales: Number(this.state.nonTaxSales) + Number(porkSales)
        })
        console.log('state: ' + this.state.nonTaxSales)
        //Sheep Sales Non-Tax
        const resSheep = await axios.get(`/reports/qtrSheepSales/?taxYear=${this.state.taxYear}&taxQtr=${this.state.taxQtr}`)
        console.log(resSheep.data[0].sum)
        let sheepSales = resSheep.data[0].sum
        this.setState({
            nonTaxSales: Number(this.state.nonTaxSales) + Number(sheepSales)
        })
        console.log('state: ' + this.state.nonTaxSales)
        //CircleV Sales Taxable
        const resCircleVSales = await axios.get(`/reports/qtrCircleVSales/?taxYear=${this.state.taxYear}&taxQtr=${this.state.taxQtr}`)
        console.log(resCircleVSales.data[0].sum)
        let circleVSubTotal = resCircleVSales.data[0].sum
        this.setState({
            taxSales: Number(this.state.taxSales) + Number(circleVSubTotal)
        })
        console.log('tax state: ' + this.state.taxSales)
        //CircleV Tax Amount
        const resCircleVTax = await axios.get(`/reports/qtrCircleVTax/?taxYear=${this.state.taxYear}&taxQtr=${this.state.taxQtr}`)
        console.log(resCircleVTax.data[0].sum)
        let circleVTax = resCircleVTax.data[0].sum
        this.setState({
            taxAmt: Number(this.state.taxAmt) + Number(circleVTax)
        })
        console.log('taxAmt state: ' + this.state.taxAmt)
        //General Invoice Non-Taxable Sales taxExempt = 't'
        const resInvoiceTaxExempt = await axios.get(`/reports/qtrInvoiceSubTotal/?taxYear=${this.state.taxYear}&taxQtr=${this.state.taxQtr}&taxExempt=t`)
        console.log(resInvoiceTaxExempt.data[0].sum)
        let invoiceTaxExempt = resInvoiceTaxExempt.data[0].sum
        this.setState({
            nonTaxSales: Number(this.state.nonTaxSales) + Number(invoiceTaxExempt)
        })
        console.log('state: ' + this.state.nonTaxSales)
        //General Invoice Taxable Sales taxExempt = 'f'
        const resInvoiceTaxSales = await axios.get(`/reports/qtrInvoiceSubTotal/?taxYear=${this.state.taxYear}&taxQtr=${this.state.taxQtr}&taxExempt=f`)
        console.log(resInvoiceTaxSales.data[0].sum)
        let invoiceTaxSales = resInvoiceTaxSales.data[0].sum
        this.setState({
            taxSales: Number(this.state.taxSales) + Number(invoiceTaxSales)
        })
        console.log('tax state: ' + this.state.taxSales)
        //General Invoice Tax Amount
        const resInvoiceTaxAmt = await axios.get(`/reports/qtrInvoiceTax/?taxYear=${this.state.taxYear}&taxQtr=${this.state.taxQtr}`)
        console.log(resInvoiceTaxAmt.data[0].sum)
        let invoiceTaxAmt = resInvoiceTaxAmt.data[0].sum
        this.setState({
            taxAmt: Number(this.state.taxAmt) + Number(invoiceTaxAmt)
        })
        console.log('taxAmt state: ' + this.state.taxAmt)
        this.printTaxReport();
    }

    printTaxReport = async () => {
        console.log(this.state.taxQtr)
        let qtr = null;
        if(this.state.taxQtr === '1') {
            qtr = '1st'
        } else if(this.state.taxQtr === '2') {
            qtr = '2nd'
        } else if(this.state.taxQtr === '3') {
            qtr = '3rd'
        }else if(this.state.taxQtr === '4') {
            qtr = '4th'
        }

        const doc = new jsPDF({
            orientation: 'p',
        })
        doc.text('Circle V Meat Quarterly Tax Report', 25, 25)
        doc.text(`${this.state.taxYear} ${qtr} Quarter `, 25, 31)
        
        doc.output('dataurlnewwindow');
    }

    handleChange = async (key, value) => {
        await this.setState({
            [key]: value.target.value
        });
        // console.log(`${key} is ${this.state[key]}`);
    }

    render() {
        return (
            <div className='reports-container'>
                <div className='reports-title'>
                    Reports
                </div>
                <hr />
                <div className='reports-selection'>
                    <label className='reports-label-right'>Select Report:</label>
                    <select name="report-select" id="report-select"
                        className='report-select'
                        onChange={(e) => this.handleChange("report", e)} >
                        <option value=""></option>
                        <option value="grinding">Grinding Report</option>
                        <option value="qtrTax">Quarterly Tax Report</option>
                    </select>
                </div>
                <hr />
                {this.state.report === 'qtrTax' ? (
                    <div className='report-options'>
                        <label className='reports-label-right'>Select Year:</label>
                        <select name="tax-year" id="tax-year"
                            className='report-select-short'
                            onChange={(e) => this.handleChange("taxYear", e)} >
                            <option value=""></option>
                            <option value="2019">2019</option>
                            <option value="2020">2020</option>
                            <option value="2021">2021</option>
                            <option value="2022">2022</option>
                        </select>
                        <label className='reports-label-right'>Select Quarter:</label>
                        <select name="tax-qtr" id="tax-qtr"
                            className='report-select-short'
                            onChange={(e) => this.handleChange("taxQtr", e)} >
                            <option value=""></option>
                            <option value="1">1st Quarter</option>
                            <option value="2">2nd Quarter</option>
                            <option value="3">3rd Quarter</option>
                            <option value="4">4th Quarter</option>
                        </select>
                        <button onClick={this.qtrTax} className='run-button'>Run</button>
                    </div>
                ) : (null)}
                {this.state.report === 'grinding' ? (
                    <div>
                        <label className='reports-label-right'>Start Date:
                            <InputMask mask="99/99/9999" maskChar={null}
                                className='reports-text-input'
                                onChange={(e) => this.handleChange("startDate", e)} />
                        </label>
                        <label className='reports-label-right'>End Date:
                            <InputMask mask="99/99/9999" maskChar={null}
                                className='reports-text-input'
                                onChange={(e) => this.handleChange("endDate", e)} />
                        </label>
                        <button onClick={this.grindingReport} className='run-button'>Run</button>
                    </div>
                ) : (null)}
                <iframe title="pdf" id="output" className='circleV-pdf-iframe'
                    type="application/pdf"></iframe>
            </div >
        )
    }
}