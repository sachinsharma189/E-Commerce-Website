import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearProducts } from '../../Action';
import Navbar from '../Navbar';
import Footer from '../Footer';
class Submit extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    emptycart = (e) => {
        let { clearProducts } = this.props;
        clearProducts();
    }

    handleClick = () => {
        this.props.history.push('/');
        this.emptycart();
    }

    render() {
        let { cart } = this.props;
        let itemKeys = Object.keys(cart);
        console.log('submit', this.props.cart);
        return (
            <div>
                <div className='submitbody'>
                    <Navbar />
                    <br/> <br/>
                    <div className="submitted">
                        <span>
                            {/* <img className="green-tick" src="https://banner2.kisspng.com/20180315/djw/kisspng-check-mark-computer-icons-clip-art-green-tick-mark-5aab1c5116d0a0.2098334515211633450935.jpg" alt="tick" /> */}
                        </span>
                        <h4>Thank you...</h4>
                        <h5>Your order has been placed.</h5>

                        <button type="button" className="btn btn-danger btn-continue"
                            onClick={this.handleClick}>CONTINUE SHOPPING</button>
                    </div> 
                    <br/> <br/>
                    <div>
                        <p className='printorder'> Click here for printing Order Details
                            <i class="fas fa-print printer"></i>
                        </p>
                    </div>
                    <br/> <br/>

                    <div className="billDetailsSubmit">
                        <h5 className="your-details-head">Your Details</h5>
                        <p className="user-details">{itemKeys.map(item =>
                            <React.Fragment>
                                <span> {item} : <span className="cart-item">{cart[item]}</span>  </span>
                                <br /> <br />
                            </React.Fragment>
                        )
                        }</p>

                    </div>
                   
                </div>
                <Footer />
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    cart: state.BillingAddress.tempData,
    delete: state.cartreducer,
})

const mapDispatchToProps = (dispatch) => ({
    clearProducts: (data) => dispatch(clearProducts(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Submit);