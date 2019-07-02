import React, { Component } from 'react';
// import Checkout from '../Checkout/Checkout';
import { connect } from 'react-redux';
import Logos from '../../../public/Assets/logo.png';
import { clearProducts, deleteProduct, updatesize, updatecolor, increment, decrement, cartauthcheck } from '../../Action';
import Navbar from '../Navbar';
import Footer from '../Footer';


class Addtocart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            update: false,
            // cartempty: false
        }
    }

    emptycart = (e) => {
        let { clearProducts } = this.props;
        let { cartauthcheck } = this.props;
        e.preventDefault();
        clearProducts();
        cartauthcheck();
    }

    backtocart = () => {
        this.props.history.push("/");
    }

    checkout = (e) => {
        this.props.history.push("/Checkout")
    }

    updatecart = (e) => {
        this.setState({
            update: true
        })

    }
    deleteCartProduct = (id) => {
        let { deleteProduct } = this.props;
        deleteProduct(id);
    }

    handleAddQuantity = (id, price) => {
        this.props.increment({
            id,
            price
        });
    };
    handleSubtractQuantity = (id, price) => {
        this.props.decrement({
            id,
            price
        });
    };
    handleChangeSize = (e) => {
        let { updatesize } = this.props;
        this.props.cart.map((item, id) => {
            if (item.id == e.target.id) {
                console.log("id------>", id);
                item.size = e.target.value;
                id = item.id;
                let size = item.size;
                console.log("Updated Size---->", item.size);
                console.log("updated item id ------>", item.id);
                updatesize({
                    id,
                    size
                });
            }
        }
        )
    }

    handleChangeColor = (e) => {
        let { updatecolor } = this.props;
        this.props.cart.map((item, id) => {
            if (item.id == e.target.id) {
                console.log("id------>", id);
                item.color = e.target.value;
                id = item.id;
                let color = item.color;
                console.log("Updated Size---->", item.color);
                console.log("updated item id ------>", item.id);
                updatecolor({
                    id,
                    color
                });
            }
        }
        )
    }



    render() {
        // let {handleChangeSize} = this.props;
        let { cartauthcheck } = this.props;
        return (
            <div>
                <Navbar />
                <br /> <br /><br />
                {
                    cartauthcheck && (this.props.cart.length > 0) ?
                        <div className='selectedproductscontainer'>
                            <div className='selectedproducts'>
                                <div className='shippingnav'>
                                    <div className='summary'>
                                        <span className='shippimgnavdata'>1. Summary</span>
                                    </div>
                                    <div className='shippingaddress'>
                                        <span className='shippimgnavdata'>2. Shipping Address</span>
                                    </div>
                                    <div className='payment'>
                                        <span className='shippimgnavdata'>3. Payment</span>
                                    </div>
                                </div>
                                <h3>Your Cart</h3>
                                {
                                    this.props.cart.map((item, i) =>
                                        <div className='detailsdisplay'>
                                            <div className='imgtablecontainer'>
                                                {item.color === "Yellow" ?
                                                    <img src={"Assets/img3.jpg"} alt="yellow" className="cart-img" />
                                                    : null
                                                }
                                                {item.color === "Blue" ?
                                                    <img src={"Assets/img1.jpg"} alt="blue" className="cart-img" />
                                                    : null
                                                }
                                                {item.color === "Red" ?
                                                    <img src={"Assets/img2.jpg"} alt="red" className="cart-img" />
                                                    : null
                                                }
                                            </div>
                                            <div className='productname'>{item.productname}
                                                <p className='deletetext' onClick={() => this.deleteCartProduct(item.id)}> <u>Delete Product </u></p>
                                            </div>
                                            <div className='productupdate'>
                                                <p className='detailhead'>Quantity</p>
                                                {this.state.update ?
                                                    item.quantity <= 1 ?
                                                        <button disabled className="addSubBtn btn-danger btn-dis quantityselection" type="button">-</button>
                                                        :
                                                        <button className="addSubBtn btn-danger quantityselection" type="button" onClick={() => this.handleSubtractQuantity(item.id, item.price)}>-</button>

                                                    : null
                                                }
                                                <p className="qty">
                                                    {item.quantity}
                                                </p>
                                                {this.state.update ?
                                                    item.quantity < 10 ?
                                                        <button className="addSubBtn btn-danger quantityselection" type="button" onClick={() => this.handleAddQuantity(item.id, item.price)}>+</button>
                                                        :
                                                        <button className="addSubBtn btn-danger btn-dis quantityselection" type="button" disabled>+</button>
                                                    : null
                                                }
                                            </div>
                                            <div className='productsize'>
                                                <p className='detailhead'>Size</p>
                                                {!this.state.update ? item.size : null}
                                                {
                                                    this.state.update ?
                                                        <select id={item.id} name="Size" onClick={this.handleChangeSize} className='sizeselection'>
                                                            <option value="S">S</option>
                                                            <option value="M">M</option>
                                                            <option value="L">L</option>
                                                        </select> : null
                                                }
                                            </div>
                                            <div className='productcolor'>
                                                <p className='detailhead'>Color</p>
                                                {!this.state.update ? item.color : null}
                                                {
                                                    this.state.update ?
                                                        <select id={item.id} name="Color" onClick={this.handleChangeColor} className='sizeselection'>
                                                            <option value="Red">Red</option>
                                                            <option value="Blue">Blue</option>
                                                            <option value="Yellow">Yellow</option>
                                                        </select> : null
                                                }
                                            </div>
                                            <div className='producttotal'>
                                                <p className='detailhead'>Total</p>
                                                ${item.price * item.quantity}
                                            </div>
                                        </div>
                                    )} <br /> <br />
                                <span className='addproducts' onClick={this.backtocart}> <u>Add More Products</u></span>
                                <span className='updateproducts' onClick={this.updatecart}> <u>Update Products</u></span>

                            </div>

                            <div className='coupons'>
                                <div className='couponcontainer'>
                                    <p className='coupontext'>Apply Coupons and Promotions</p>
                                </div>
                                <button className='applybutton'>Apply Now</button>
                                <br /> <br /> <br />
                                <div className='subtotaldisplay'>
                                    <p className='ordersummary'>Order Summary</p>
                                    {
                                        this.props.cart.map((item, i) =>
                                            <p className='subtotalshow'>
                                                Sub-Total of Product {i + 1}
                                                <br />
                                                ${
                                                    item.price * item.quantity
                                                }
                                            </p>
                                        )}
                                    <button className='orderbutton' onClick={this.checkout}>PLACE ORDER</button>
                                </div>
                            </div>
                        </div>

                        // <div className='producttable'>
                        //     <table class="table table-bordered carttable">
                        //         <thead>
                        //             <tr>
                        //                 <th scope="col">PRODUCT IMAGE</th>
                        //                 <th scope="col">ITEM</th>
                        //                 <th scope="col">QTY</th>
                        //                 <th scope="col">SIZE</th>
                        //                 <th scope="col">COLOR</th>
                        //                 <th scope="col" colspan="2">PRICE</th>
                        //             </tr>
                        //         </thead>
                        //         <tbody>
                        //             {
                        //                 this.props.cart.map((item, i) =>
                        //                     <tr key={i}>
                        //                         <td className="imageTd">
                        //                             <div className='imgtablecontainer'>
                        //                                 {item.color === "Yellow" ?
                        //                                     <img src={"Assets/img3.jpg"} alt="yellow" className="cart-img" />
                        //                                     : null
                        //                                 }
                        //                                 {item.color === "Blue" ?
                        //                                     <img src={"Assets/img1.jpg"} alt="blue" className="cart-img" />
                        //                                     : null
                        //                                 }
                        //                                 {item.color === "Red" ?
                        //                                     <img src={"Assets/img2.jpg"} alt="red" className="cart-img" />
                        //                                     : null
                        //                                 }
                        //                             </div>
                        //                         </td>
                        //                         <td className="tableData">{item.productname}</td>
                        //                         <td className="tableData quantity-btn">
                        //                             {this.state.update ?
                        //                                 item.quantity <= 1 ?
                        //                                     <button disabled className="addSubBtn btn-danger btn-dis quantityselection" type="button">-</button>
                        //                                     :
                        //                                     <button className="addSubBtn btn-danger quantityselection" type="button" onClick={() => this.handleSubtractQuantity(item.id, item.price)}>-</button>

                        //                                 : null
                        //                             }
                        //                             <span className="qty">
                        //                                 {item.quantity}
                        //                             </span>
                        //                             {this.state.update ?
                        //                                 item.quantity < 10 ?
                        //                                     <button className="addSubBtn btn-danger quantityselection" type="button" onClick={() => this.handleAddQuantity(item.id, item.price)}>+</button>
                        //                                     :
                        //                                     <button className="addSubBtn btn-danger btn-dis quantityselection" type="button" disabled>+</button>
                        //                                 : null
                        //                             }
                        //                         </td>
                        //                         <td>{!this.state.update ? item.size : null}
                        //                             {
                        //                                 this.state.update ?
                        //                                     <select id={item.id} name="Size" onClick={this.handleChangeSize} className='sizeselection'>
                        //                                         <option value="S">S</option>
                        //                                         <option value="M">M</option>
                        //                                         <option value="L">L</option>
                        //                                     </select> : null
                        //                             }
                        //                         </td>
                        //                         <td>{!this.state.update ? item.color : null}
                        //                             {
                        //                                 this.state.update ?
                        //                                     <select id={item.id} name="Color" onClick={this.handleChangeColor} className='sizeselection'>
                        //                                         <option value="Red">Red</option>
                        //                                         <option value="Blue">Blue</option>
                        //                                         <option value="Yellow">Yellow</option>
                        //                                     </select> : null
                        //                             }
                        //                         </td>
                        //                         <td>${item.price * item.quantity}</td>
                        //                         {
                        //                             this.state.update ?
                        //                                 <td><i className="fas fa-times cross" onClick={() => this.deleteCartProduct(item.id)}></i></td> : null
                        //                         }
                        //                     </tr>

                        //                 )
                        //             }
                        //         </tbody>

                        //     </table>
                        //     <div className='buttoncontainer'>
                        //         <button type="button" class="btn btn-danger updatebutton" onClick={this.updatecart}>UPDATE CART</button>
                        //         <button type="button" class="btn btn-danger emptybutton" onClick={this.emptycart}>EMPTY CART</button>
                        //         <button type="button" class="btn btn-danger continuebutton" onClick={this.backtocart}>CONTINUE SHOPPING</button>
                        //         <button type="button" class="btn btn-danger checkoutbutton" onClick={this.checkout}>GO TO CHECKOUT</button>
                        //     </div>
                        // </div>
                        :
                        <div className='emptycontainer'>
                            <div className='cartempty'> <span className='emptycontent'>No Products In Cart </span></div>
                            <br /> <br />
                            <div className='cntbtndiv'>
                                <button type="button" class="btn btn-danger continue-button" onClick={this.backtocart}>ADD PRODUCTS TO YOUR CART</button>
                            </div>
                        </div>
                }
                {/* <Footer/> */}
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
    clearProducts: (data) => dispatch(clearProducts(data)),
    deleteProduct: (id) => dispatch(deleteProduct(id)),
    updatesize: (data) => dispatch(updatesize(data)),
    updatecolor: (data) => dispatch(updatecolor(data)),
    increment: (data) => dispatch(increment(data)),
    decrement: (data) => dispatch(decrement(data)),
    cartauthcheck: (data) => dispatch(cartauthcheck(data)),

})

export default connect(mapStateToProps, mapDispatchToProps)(Addtocart);
