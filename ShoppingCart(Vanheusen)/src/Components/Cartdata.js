import React, { Component } from 'react';
import img3 from '../../public/Assets/img3.jpg';
import img2 from '../../public/Assets/img2.jpg';
import img1 from '../../public/Assets/img1.jpg';


import { connect } from 'react-redux';
import { deleteProduct } from '../Action';


class Cartdata extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    deleteCartProduct = (id) => {
        let { deleteProduct } = this.props;
        deleteProduct(id);
    }
    render() {
        let { cartauthcheck } = this.props;
        console.log("Cart Auth Check =====>>>>", cartauthcheck);
        return (
            <div>
                {
                    // {console.log(cartauthcheck)}
                    cartauthcheck && (this.props.cart.length > 0) ?
                        <div className='producttablehover'>
                                <div className='productimghover'>
                                    {
                                        this.props.cart.map((item, i) =>
                                            <div className='imghovercontainer'>
                                                {item.color === "Yellow" ?
                                                    <img src={img3} alt="yellow" className="cart-imghover" />
                                                    : null
                                                }
                                                {
                                                    item.color === "Blue" ?
                                                        <img src={img1} alt="blue" className="cart-imghover" />
                                                        : null
                                                }
                                                {
                                                    item.color === "Red" ?
                                                        <img src={img2} alt="red" className="cart-imghover" />
                                                        : null
                                                }
                                            </div>
                                        )}
                                </div>
                                <div className='productdeschover'>
                                    {
                                        this.props.cart.map((item, i) =>
                                            <div className='texthover'>
                                                <p className='imgname'>{item.productname} </p> <br />
                                                <span className='imgsize'>Size : {item.size}</span>
                                                <span className='imgname'>Quantity : {item.quantity}</span>
                                                <p className='imgprice'>Price : ${item.price*item.quantity}</p>
                                                <p className='imgdelete' onClick={() => this.deleteCartProduct(item.id)}>Delete Prduct <i class="fas fa-trash-alt"></i></p>
                                            </div>
                                        )}
                                </div>

                                {/* <table class="table table-bordered carttable">
                                <thead>
                                    <tr>
                                        <th scope="col">ITEM</th>
                                        <th scope="col">QTY</th>
                                        <th scope="col" colspan="2">COLOR</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        // console.log('fkvhbdfhbv',this.props.cart)
                                        this.props.cart.map((item, i) =>
                                            <tr key={i}>
                                                <td className="tableData">{item.productname}</td>
                                                <td className="tableData">
                                                    {item.quantity}
                                                </td>
                                                <td>{item.color}
                                                </td>
                                                <td><i className="fas fa-times cross" onClick={() => this.deleteCartProduct(item.id)}></i></td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table> */}
                        </div> :
                        <div>
                            <div className='cartemptynav'> <p className='cartcontentnav'> Your Cart Is Empty</p></div>
                        </div>
                }
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    cart: state.cartreducer,
    storedProducts: state.Reducer.storeProducts,
    cartauthcheck: state.cartauthreducer.cartauthentication
})

const mapDispatchToProps = (dispatch) => ({
    deleteProduct: (id) => dispatch(deleteProduct(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Cartdata);
