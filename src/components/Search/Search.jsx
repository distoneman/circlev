import React, { Component } from 'react';
import axios from 'axios';
import './Search.css';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customer: ""
        }
    }

    handleChange(key, value) {
        this.setState({
            [key]: value.target.value
        });
        console.log(this.state.customer);
    }

    async search() {
        console.log("search")
        let customer = `%${this.state.customer}%`
        console.log(customer);
        const res = await axios.get(`/search/beefCustomer/${this.state.customer}`)
        console.log(res.data)
    }

    render() {
        return(
            <div className='search-main'>Search
                <hr/>
                <select name="search-type" id="search-type">
                    <option value="beef">Beef</option>
                    <option value="pork">Pork</option>
                    <option value="sheep">Sheep</option>
                    <option value="other">Other</option>
                </select>
                <input type="text" className="search-input"
                    onChange={e => this.handleChange("customer", e)}/>
                <button className='search-btn'
                    onClick={() => this.search()}>Search</button>
            </div>
        )
    }
}