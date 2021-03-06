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
        console.log(this.props.searchType)
        let res = await axios.get(`/search/${this.props.searchType}ID/${this.props.id}`)
        this.setState({
            invoice: res.data[0]
        })
        console.log(this.state)
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
                {this.props.searchType === 'sheep' ? (
                    <div>
                        <div className='invoice-view-container'>
                            <div className='invoice-item invoice-header'>Quantity</div>
                            <div className='invoice-item invoice-header'>Description</div>
                            <div className='invoice-item invoice-header'>Price</div>
                            <div className='invoice-item invoice-header'>Amount</div>
                            <div className='invoice-item'>{this.state.invoice.qty_slaughter}</div>
                            <div className='invoice-item'>Sheep Slaughter</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.price_slaughter}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.total_slaughter}</div>
                            <div className='invoice-item'>{this.state.invoice.qty_cut}</div>
                            <div className='invoice-item'>Cut & Wrap</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.price_cut}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.total_cut}</div>
                            <div className='invoice-item'>{this.state.invoice.qty_bone}</div>
                            <div className='invoice-item'>Bone & Roll</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.price_bone}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.total_bone}</div>
                            <div className='invoice-item'>{this.state.invoice.qty_other}</div>
                            <div className='invoice-item'>{this.state.invoice.desc_other}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.price_other}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.total_other}</div>
                        </div>
                    </div>
                ) : null}
                {this.props.searchType === 'circleV' ? (
                    <div>
                        <div className='invoice-view-container'>
                            <div className='invoice-item invoice-header'>Quantity</div>
                            <div className='invoice-item invoice-header'>Description</div>
                            <div className='invoice-item invoice-header'>Price</div>
                            <div className='invoice-item invoice-header'>Amount</div>
                            <div className='invoice-item'>{this.state.invoice.qty_line1}</div>
                            <div className='invoice-item'>{this.state.invoice.desc_line1}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.price_line1}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.total_line1}</div>
                            <div className='invoice-item'>{this.state.invoice.qty_line2}</div>
                            <div className='invoice-item'>{this.state.invoice.desc_line2}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.price_line2}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.total_line2}</div>
                        </div>
                    </div>
                ) : null}
                {this.props.searchType === 'invoice' ? (
                    <div>
                        <div className='invoice-view-container'>
                            <div className='invoice-item invoice-header'>Quantity</div>
                            <div className='invoice-item invoice-header'>Description</div>
                            <div className='invoice-item invoice-header'>Price</div>
                            <div className='invoice-item invoice-header'>Amount</div>
                            <div className='invoice-item'>{this.state.invoice.qty_line1}</div>
                            <div className='invoice-item'>{this.state.invoice.desc_line1}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.price_line1}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.total_line1}</div>
                            <div className='invoice-item'>{this.state.invoice.qty_line2}</div>
                            <div className='invoice-item'>{this.state.invoice.desc_line2}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.price_line2}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.total_line2}</div>
                            <div className='invoice-item'>{this.state.invoice.qty_line3}</div>
                            <div className='invoice-item'>{this.state.invoice.desc_line3}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.price_line3}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.total_line3}</div>
                            <div className='invoice-item'>{this.state.invoice.qty_line4}</div>
                            <div className='invoice-item'>{this.state.invoice.desc_line4}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.price_line4}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.total_line4}</div>
                            <div className='invoice-item'>{this.state.invoice.qty_line5}</div>
                            <div className='invoice-item'>{this.state.invoice.desc_line5}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.price_line5}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.total_line5}</div>
                            <div className='invoice-item'>{this.state.invoice.qty_line6}</div>
                            <div className='invoice-item'>{this.state.invoice.desc_line6}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.price_line6}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.total_line6}</div>
                            <div className='invoice-item'>{this.state.invoice.qty_line7}</div>
                            <div className='invoice-item'>{this.state.invoice.desc_line7}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.price_line7}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.total_line7}</div>
                            <div className='invoice-item'>{this.state.invoice.qty_line8}</div>
                            <div className='invoice-item'>{this.state.invoice.desc_line8}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.price_line8}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.total_line8}</div>
                            <div className='invoice-item'>{this.state.invoice.qty_line9}</div>
                            <div className='invoice-item'>{this.state.invoice.desc_line9}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.price_line9}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.total_line9}</div>
                            <div className='invoice-item'>{this.state.invoice.qty_line10}</div>
                            <div className='invoice-item'>{this.state.invoice.desc_line10}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.price_line10}</div>
                            <div className='invoice-item invoice-view-right'>${this.state.invoice.total_line10}</div>
                        </div>
                    </div>
                ) : null}

            </div>
        )
    }
}