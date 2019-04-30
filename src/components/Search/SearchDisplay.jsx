import React from 'react';
import './Search.css';
import { FaPrint, FaTrashAlt, FaEdit, FaSearch, FaEnvelope, FaComment } from 'react-icons/fa';
import { IoIosMail, IoIosText } from "react-icons/io";


export default function SearchDisplay(props){
    return(
        <div className='search-results-container'>
            <div className='search-item'>{props.iDate}</div>
            <div className='search-item'>{props.customer}</div>
            <div className='search-item'>{props.soldBy}</div>
            <div className='search-item'>{props.phone}</div>
            <div className='search-item'>${props.total}</div>
            <div className='search-item'>{props.weight}</div>
            <div className='search-item'>
                <FaPrint className='fa-icon'
                    onClick={() => props.printInvoice(props.id)}/>
                <FaSearch className='fa-icon' />
                <FaEdit className='fa-icon' />
                <FaTrashAlt className='fa-icon'/>
                <FaEnvelope className='fa-icon' />
                <FaComment className='fa-icon' />
            </div>
        </div>

    )
}