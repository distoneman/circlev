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
            endDate: null
        }

    }
    async componentDidMount() {

    }

    async getGrindingData() {
        console.log(this.state.startDate)
        const res = await axios.get(`/search/grinding/?startDate=${this.state.startDate}&endDate=${this.state.endDate}`)
        console.log(res.data)
    }

    testTable = async () => {
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

    async handleChange(key, value) {
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
                        </select>
                        <label className='reports-label-right'>Select Quarter:</label>
                        <select name="tax-qtr" id="tax-qtr"
                            className='report-select-short'
                            onChange={(e) => this.handleChange("taxQtr", e)} >
                            <option value=""></option>
                            <option value="1qtr">1st Quarter</option>
                            <option value="2qtr">2nd Quarter</option>
                            <option value="3qtr">3rd Quarter</option>
                            <option value="4qtr">4th Quarter</option>
                        </select>
                    </div>
                ) : (null)}
                {this.state.report === 'grinding' ? (
                    <div>
                        <label className='reports-label-right'>Start Date:</label>
                        <InputMask mask="99/99/9999" maskChar={null}
                            className='reports-text-input'
                            onChange={(e) => this.handleChange("startDate", e)} />
                        <label className='reports-label-right'>End Date:</label>
                        <InputMask mask="99/99/9999" maskChar={null}
                            className='reports-text-input'
                            onChange={(e) => this.handleChange("endDate", e)} />
                        <button onClick={this.testTable} className='run-button'>Run</button>
                    </div>
                ) : (null)}
                <iframe title="pdf" id="output" className='circleV-pdf-iframe'
                    type="application/pdf"></iframe>
            </div >
        )
    }
}