import React from 'react';

export default function SearchDisplay(props){
    return(
        <div>
        {props.customer}
        <button onClick={() => props.printInvoice(props.id)}>Print</button>
        </div>

    )
}