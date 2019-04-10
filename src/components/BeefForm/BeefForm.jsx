import React, {Component} from 'react';
import axios from 'axios';

export default class BeefForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            soldBy: '',
            date: '',
            customer: '',
            phone: '',
            baskets: 0,
            row: '',
            slaughter: 0,
            cutWrap: 0,
            patties: 0,
            brand: 0,
            beefPrices: {}
        }
    }
    async componentDidMount() {
        let res = await axios.get("/beef/prices");
        await this.setState({beefPrices: res.data[0]})
        console.log(this.state.beefPrices)
    }

    save = async () => {
        console.log('save')
        const res = await axios.post("/beef/save", { 
            soldBy: this.state.soldBy,
            date: this.state.date,
            customer: this.state.customer,
            phone: this.state.phone,
            baskets: this.state.baskets,
            row: this.state.row,
            slaughter: this.state.slaughter,
            cutWrap: this.state.cutWrap,
            patties: this.state.patties,
            brand: this.state.brand
         });
    }

    handleChange(key, value) {
        this.setState({
            [key]: value.target.value
          });
        console.log(`${key} is ${this.state[key]}`)
    }

    render () {
        return(
            <div>
                <div>Beef Form</div>
                <hr/>
                Sold By: <input type="text" onChange={e => this.handleChange("soldBy", e)}/>
                <br/>
                Date: <input type="text" onChange={e => this.handleChange("date", e)}/>
                <br/>
                Customer: <input type="text" onChange={e => this.handleChange("customer", e)}/>
                <br/>
                Phone: <input type="text" onChange={e => this.handleChange("phone", e)}/>
                <br/>
                Baskets: <input type="type" onChange={e => this.handleChange("baskets", e)}/>
                <br/>
                Row: <input type="text" onChange={e => this.handleChange("row", e)}/>
                <br/>
                Beef Slaughter: <input type="text" onChange={e => this.handleChange("slaughter", e)}/>
                <span>{this.state.beefPrices.slaughter}</span>
                <span>{(this.state.slaughter) * (this.state.beefPrices.slaughter)}</span>
                <br/>
                Cut & Wrap: <input type="text" onChange={e => this.handleChange("cutWrap", e)}/>
                <span>{this.state.beefPrices.cut_wrap}</span>
                <span>{this.state.cutWrap * this.state.beefPrices.cut_wrap}</span>
                <br/>
                Patties: <input type="text" onChange={e => this.handleChange("patties", e)}/>
                <br/>
                Brand Inspection: <input type="text" onChange={e => this.handleChange("brand", e)}/>
                <br/>
                <button onClick={() => this.save()} >
                    Save
                </button>
            </div>

        )
    }
}