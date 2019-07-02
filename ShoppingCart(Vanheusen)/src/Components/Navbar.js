import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Cartdata from './Cartdata';
import vanheusenlogo from '../../public/Assets/vanheusenlogo.png';
// import NotificationBadge from 'react-notification-badge';
// import {Effect} from 'react-notification-badge';

class Navbar extends Component {
    backtocart = () => {
        this.props.history.push("/");
    }
    render() {
        return (
            <Link to='/'>
                <nav className='banner'>
                    <img src={vanheusenlogo} alt="lmnlogo" className='bannerlogo' />
                </nav>
            </Link>
        );
    }
}


export default Navbar;
