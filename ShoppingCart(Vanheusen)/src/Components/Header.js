import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import Cartdata from './Cartdata';
import NotificationBadge from 'react-notification-badge';
import {Effect} from 'react-notification-badge';
import cartLogo from'../../public/Assets/cart.svg';

class Header extends Component {
    getInitialState() {
        return {
            isMouseInside: false
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            isMouseInside: false
        }
    }
    mouseEnter = () => {
        this.setState({ isMouseInside: true });
    }
    mouseLeave = () => {
        this.setState({ isMouseInside: false });
    }
    render() {
        let cartNotify = this.props.cartNotify;
        return (
            <nav onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} className="cart-notify">
                <Link to='/addtocart' className="ml-auto">
                    <div className="badge-div">
                        <span className="badge-span">
                            <NotificationBadge count={cartNotify.length || 0} effect={Effect.SCALE} />
                        </span>
                        <div className='cartimg' >
                            {/* <img src={cartLogo} alt="cart" /> */}
                            <i class="fas fa-shopping-cart headcart"></i>
                            {/* {this.state.isMouseInside ? <Cartdata /> : null} */}
                        </div>
                    </div>
                </Link>
                <span className="hover-span">
                    {
                        this.state.isMouseInside &&
                        <Cartdata />
                    }
                </span>
            </nav>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        cartNotify: state.cartreducer||0,
    }
    
}
export default connect (mapStateToProps)(Header);
