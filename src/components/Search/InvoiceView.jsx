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
        // console.log(this.props.id)
        let res = await axios.get(`/search/${this.props.searchType}ID/${this.props.id}`)
        // console.log(res.data);
        this.setState({
            invoice: res.data[0]
        })
        // console.log(this.state.invoice)
    }

    render() {
        return (
            <div>
                {this.props.searchType === 'beef' ? (
                    <div className='invoice-view-container'>
                        <div className='invoice-item invoice-header'>Quantity</div>
                        <div className='invoice-item invoice-header'>Description</div>
                        <div className='invoice-item invoice-header'>Price</div>
                        <div className='invoice-item invoice-header'>Amount</div>
                        <div className='invoice-item'>${this.state.invoice.slaughter}</div>
                        <div className='invoice-item'>Beef Slaughter</div>
                        <div className='invoice-item invoice-view-right'>${this.state.invoice.price_slaughter}</div>
                        <div className='invoice-item invoice-view-right'>${this.state.invoice.total_slaughter}</div>
                        <div className='invoice-item'>{this.state.invoice.qty_cut}</div>
                        <div className='invoice-item'>Cut & Wrap</div>
                        <div className='invoice-item invoice-view-right'>${this.state.invoice.price_cut}</div>
                        <div className='invoice-item invoice-view-right'>${this.state.invoice.total_cut}</div>
                        <div className='invoice-item'>{this.state.invoice.qty_patties}</div>
                        <div className='invoice-item'>Patties</div>
                        <div className='invoice-item invoice-view-right'>${this.state.invoice.price_patties}</div>
                        <div className='invoice-item invoice-view-right'>${this.state.invoice.total_patties}</div>
                        <div className='invoice-item'>{this.state.invoice.qty_brand}</div>
                        <div className='invoice-item'>Brand Inspection</div>
                        <div className='invoice-item invoice-view-right'>${this.state.invoice.price_brand}</div>
                        <div className='invoice-item invoice-view-right'>${this.state.invoice.total_brand}</div>
                        <div className='invoice-item'>{this.state.invoice.qty_other}</div>
                        <div className='invoice-item'>{this.state.invoice.desc_other}</div>
                        <div className='invoice-item invoice-view-right'>${this.state.invoice.price_other}</div>
                        <div className='invoice-item invoice-view-right'>${this.state.invoice.total_other}</div>
                    </div>
                ) : null}
                {this.props.searchType === 'pork' ? (
                    <div>
                        <div className='invoice-view-container'>
                        <div className='invoice-item invoice-header'>Quantity</div>
                        <div className='invoice-item invoice-header'>Description</div>
                        <div className='invoice-item invoice-header'>Price</div>
                        <div className='invoice-item invoice-header'>Amount</div>
                        <div className='invoice-item'>{this.state.invoice.qty_slaughter}</div>
                        <div className='invoice-item'>Pork Slaughter</div>
                        <div className='invoice-item invoice-view-right'>${this.state.invoice.price_slaughter}</div>
                        <div className='invoice-item invoice-view-right'>${this.state.invoice.total_slaughter}</div>
                        <div className='invoice-item'>{this.state.invoice.qty_cut}</div>
                        <div className='invoice-item'>Cut & Wrap</div>
                        <div className='invoice-item invoice-view-right'>${this.state.invoice.price_cut}</div>
                        <div className='invoice-item invoice-view-right'>${this.state.invoice.total_cut}</div>
                        <div className='invoice-item'>{this.state.invoice.qty_cure}</div>
                        <div className='invoice-item'>Cure</div>
                        <div className='invoice-item invoice-view-right'>${this.state.invoice.price_cure}</div>
                        <div className='invoice-item invoice-view-right'>${this.state.invoice.total_cure}</div>
                        <div className='invoice-item'>{this.state.invoice.qty_link}</div>
                        <div className='invoice-item'>Link/Patty Sausage</div>
                        <div className='invoice-item invoice-view-right'>${this.state.invoice.price_link}</div>
                        <div className='invoice-item invoice-view-right'>${this.state.invoice.total_link}</div>
                        <div className='invoice-item'>{this.state.invoice.qty_bulk}</div>
                        <div className='invoice-item'>Bulk Sausage</div>
                        <div className='invoice-item invoice-view-right'></div>
                        <div className='invoice-item invoice-view-right'></div>
                        <div className='invoice-item'>{this.state.invoice.qty_fat}</div>
                        <div className='invoice-item'>Fat Rendered</div>
                        <div className='invoice-item invoice-view-right'>${this.state.invoice.price_fat}</div>
                        <div className='invoice-item invoice-view-right'>${this.state.invoice.total_fat}</div>
                        <div className='invoice-item'>{this.state.invoice.qty_other}</div>
                        <div className='invoice-item'>{this.state.invoice.desc_other}</div>
                        <div className='invoice-item invoice-view-right'>${this.state.invoice.price_other}</div>
                        <div className='invoice-item invoice-view-right'>${this.state.invoice.total_other}</div>
                    </div>
                </div>
                ) : null}
            </div>
        )
    }
}