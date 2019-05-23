import React, { Component } from "react";
import axios from "axios";

import './InvoiceForm.css'

export default class InvoiceForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            soldBy: "",
            date: "",
            customer: "",
            phone: "",
            baskets: 0,
            row: "",
            slaughter: 0,
            cutWrap: 0,
            patties: 0,
            brand: 0,
        };
    }
    async componentDidMount() {
        // let res = await axios.get("/beef/prices");
        // await this.setState({ beefPrices: res.data[0] });
        // console.log(this.state.beefPrices);
    }

    save = async () => {
        console.log("save");
        // const res = await axios.post("/beef/save", {
        //   soldBy: this.state.soldBy,
        //   date: this.state.date,
        //   customer: this.state.customer,
        //   phone: this.state.phone,
        //   baskets: this.state.baskets,
        //   row: this.state.row,
        //   slaughter: this.state.slaughter,
        //   cutWrap: this.state.cutWrap,
        //   patties: this.state.patties,
        //   brand: this.state.brand
        // });
    };

    handleChange(key, value) {
        // this.setState({
        //     [key]: value.target.value
        // });
        // console.log(`${key} is ${this.state[key]}`);
    }

    render() {
        return (
            <div className='invoice-container'>
                <div className="main-invoice-form">
                    <div>Invoice Form</div>
                </div>
            </div>
        );
    }
}
