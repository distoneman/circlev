import React, { Component } from 'react';
import axios from 'axios';
import './EmailForm.css';

export default class EmailForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice: [],
            mail: null,
            subject: null,
            message: null
        }

    }

    async componentDidMount() {
        console.log(this.props)
        // console.log(this.props.id)
        let res = await axios.get(`/search/${this.props.searchType}ID/${this.props.id}`)
        this.setState({
            invoice: res.data[0],
            email: res.data[0].email
        })
        // console.log(this.state)
    }

    handleChange(key, value) {
        // console.log(key)
        // console.log(value.target.value)
        this.setState({
            [key]: value.target.value
        })
        // console.log(this.state)
    }

    async sendMail() {
        // console.log('send mail')
        // console.log(this.state.message)
        axios.post('/mail/send', {
            email: this.state.email,
            subject: this.state.subject,
            html_message: this.state.message
        })
        this.props.toggleEmailModal()
    }

    render() {
        return (
            <div>
                <label className='email-form-title'>New Message</label>
                <hr />
                <div className='email-form-container'>
                    <label className='email-label-right'>To:</label>
                    <input type='text' className='email-input'
                        defaultValue={this.state.invoice.email}
                        onChange={e => this.handleChange("email", e)}
                    />
                    <label className='email-label-right'>Subject:</label>
                    <input type="text" className='email-input'
                        onChange={e => this.handleChange("subject", e)}
                    />
                    <label className='email-label-right'>Message:</label>
                    <br />
                    <textarea className='email-message'
                        onChange={e=>this.handleChange("message", e)}
                        cols='50' rows='15' >
                    </textarea>
                    <button className='email-send-btn' 
                        onClick={() => this.sendMail()}>
                        Send
                    </button>

                </div>
            </div>
        )
    }
}
