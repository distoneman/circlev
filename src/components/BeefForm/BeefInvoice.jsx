import React, { Component } from "react";
import axios from "axios";
import jsPDF from "jspdf";


export default class BeefInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            beefPrices: {}
        }
    }

    async componentDidMount() {
        let res = await axios.get("/beef/prices");
        await this.setState({beefPrices: res.data[0]})
        console.log(this.state.beefPrices)
    }

        render() {
            return (
                <div>
                    <button>Print Invoice</button>
                </div>
            )
        }
    }