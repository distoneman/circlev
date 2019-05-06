import React, {Component} from 'react';
// import { Link } from 'react-router-dom';
import image from './../../images/home_image.jpg';
import './Home.css'

export default class Home extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div>
                <img src={image} alt="Home Page"
                    className='home-image'/>
            </div>

        )
    }
}