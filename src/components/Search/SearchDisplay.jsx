import React, { Component } from 'react';
import './Search.css';
import InvoiceView from './InvoiceView';
import EmailForm from '../EmailForm/EmailForm';
import { FaPrint, FaTrashAlt, FaEdit, FaSearch, FaEnvelope } from 'react-icons/fa';
import { Link } from "react-router-dom";
// import { IoIosMail, IoIosText } from "react-icons/io";


export default class SearchDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            viewModal: false,
            emailModal: false
        }

    }

    toggleView = () => {
        this.setState({
            viewModal: !this.state.viewModal
        })
        // console.log(this.state.viewModal)
    }

    toggleEmailModal = () => {
        this.setState({
            emailModal: !this.state.emailModal
        })
        console.log(this.state.emailModal)
    }

    render() {

        return (
            <div>
                {this.state.viewModal ? (
                    <div className="invoice-view">
                        <button className='close-invoice-view-modal' onClick={this.toggleView}>X</button>
                        <InvoiceView
                            searchType={this.props.searchType}
                            id={this.props.id}
                        />
                    </div>
                ) : (
                        null
                    )}
                {this.state.emailModal ? (
                    <div className='email-modal'>
                        <button className='close-email-modal' onClick={this.toggleEmailModal}>X</button>
                        <EmailForm
                            searchType={this.props.searchType}
                            id={this.props.id}
                            toggleEmailModal = {this.toggleEmailModal}
                        />
                    </div>
                ) : (
                        null
                    )}
                <div className='search-results-container'>
                    <div className='search-item'>{this.props.iDate}</div>
                    <div className='search-item'>{this.props.customer}</div>
                    <div className='search-item'>{this.props.soldBy}</div>
                    <div className='search-item'>{this.props.phone}</div>
                    <div className='search-item'>${this.props.total}</div>
                    <div className='search-item'>{this.props.qty_cut}</div>
                    <div className='search-item'>{this.props.weight}</div>
                    <div className='search-item'>
                        <FaPrint className='fa-icon'
                            onClick={() => this.props.printInvoice(this.props.id)} />
                        <FaSearch className='fa-icon' onClick={this.toggleView} />
                        <Link to={this.props.editURL}>
                            <FaEdit className='fa-icon' />
                        </Link>
                        <FaTrashAlt className='fa-icon'
                            onClick={() => this.props.deleteInvoice(this.props.id)} />
                        <FaEnvelope className='fa-icon'
                            onClick={this.toggleEmailModal} />
                        {/* <FaComment className='fa-icon' /> */}
                    </div>
                </div>
            </div>
        )
    }
}