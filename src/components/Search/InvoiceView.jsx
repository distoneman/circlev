import React, { Component } from 'react';
import axios from 'axios';
import './Search.css';

export default class InvoiceView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice: []
        }

    }

    async componentDidMount() {
        console.log(this.props.id)
        let res = await axios.get(`/search/${this.props.searchType}ID/${this.props.id}`)
        console.log(res.data);
        this.setState({
            invoice: res.data[0]
        })
        console.log(this.state.invoice)
    }

    render() {
        return (
            <div>
                <div className='beef-invoice-view-container'>
                    <div className='beef-invoice-item'>Quantity</div>
                    <div className='beef-invoice-item'>Description</div>
                    <div className='beef-invoice-item'>Price</div>
                    <div className='beef-invoice-item'>Amount</div>
                    <div className='beef-invoice-item'>{this.state.invoice.slaughter}</div>
                    <div className='beef-invoice-item'>Beef Slaughter</div>
                    <div className='beef-invoice-item invoice-view-right'>${this.state.invoice.price_slaughter}</div>
                    <div className='beef-invoice-item invoice-view-right'>${this.state.invoice.total_slaughter}</div>
                    <div className='beef-invoice-item'>{this.state.invoice.qty_cut}</div>
                    <div className='beef-invoice-item'>Cut & Wrap</div>
                    <div className='beef-invoice-item invoice-view-right'>${this.state.invoice.price_cut}</div>
                    <div className='beef-invoice-item invoice-view-right'>${this.state.invoice.total_cut}</div>
                    <div className='beef-invoice-item'>{this.state.invoice.qty_patties}</div>
                    <div className='beef-invoice-item'>Patties</div>
                    <div className='beef-invoice-item invoice-view-right'>${this.state.invoice.price_patties}</div>
                    <div className='beef-invoice-item invoice-view-right'>${this.state.invoice.total_patties}</div>
                    <div className='beef-invoice-item'>{this.state.invoice.qty_brand}</div>
                    <div className='beef-invoice-item'>Brand Inspection</div>
                    <div className='beef-invoice-item invoice-view-right'>${this.state.invoice.price_brand}</div>
                    <div className='beef-invoice-item invoice-view-right'>${this.state.invoice.total_brand}</div>
                    <div className='beef-invoice-item'>{this.state.invoice.qty_other}</div>
                    <div className='beef-invoice-item'>{this.state.invoice.desc_other}</div>
                    <div className='beef-invoice-item invoice-view-right'>${this.state.invoice.price_other}</div>
                    <div className='beef-invoice-item invoice-view-right'>${this.state.invoice.total_other}</div>
                </div>
            </div>
        )
    }
}