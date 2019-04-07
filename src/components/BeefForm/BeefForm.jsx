import React, {Component} from 'react';
import axios from 'axios';

export default class BeefForm extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    async componentDidMount() {
        console.log('componentDidMount')
    }

    render () {
        return(
            <div>
                <div>Beef Form</div>
                <hr/>
                Sold By: <input type="text"/>
                Date: <input type="text"/>
                
            </div>

        )
    }
}