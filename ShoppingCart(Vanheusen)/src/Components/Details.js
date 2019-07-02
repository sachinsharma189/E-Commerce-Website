import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addProduct, updatecolor } from '../Action';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import { ToastsContainer, ToastsStore } from 'react-toasts';

// import { clearProducts, deleteProduct, updatesize, updatecolor, increment, decrement } from '../../Action';

class Details extends Component {
    constructor(props) {
        super(props);
        this.state = {
            size: 'S',
            color: 'Red',
            quantity: 1,
        }
    }


    handleChangeColor = (e) => {
        let { updatecolor } = this.props;
        console.log("Event id", e.target.id);
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

    handleAddToCart = (e) => {
        ToastsStore.success("Product added to Cart")
        e.preventDefault();
        let { addProduct } = this.props;
        let { id, name, price, inCart } = this.props.product;
        console.log("AddProduct", addProduct);
        this.setState({
            quantity: this.state.quantity + 1
        });
        addProduct({
            id: id,
            productname: name,
            price: price,
            inCart: inCart,
            quantity: this.state.quantity,
            size: this.state.size,
            color: this.state.color
        });
    }
    backtocart = () => {
        this.props.history.push("/");
    }

    render() {
        // let { product } = this.props;
        let imageRender = this.props.images;
        let imageKeys = Object.keys(this.props.images[0]);
        let { intId, product } = this.props;
        const { defaultcolor, name, price } = product;
        console.log("Productsssss----->", product);
        console.log("Details Page ---->", this.props.storedProducts);
        console.log("Int id-------> ", intId);
        return (
            <div className='detailscontainer'>
                <Navbar />
                <Header />
                <div className='detailspage'>
                    <div className='colorsavailable'>
                        <div className=''>
                            <h4>COLORS AVAILABLE</h4>
                            <div>
                                <img className="availability" src={"/Assets/img3.jpg"} alt="yellow" />
                            </div>
                            <div>
                                <img className="availability" src={"/Assets/img2.jpg"} alt="yellow" />
                            </div>
                            <div>
                                <img className="availability" src={"/Assets/img1.jpg"} alt="yellow" />
                            </div>
                        </div>
                    </div>
                    {
                        this.props.storedProducts.map((item, i) => {
                            if (item.id === intId) {
                                return <div className='productimgcontainer'>
                                    {item.defaultcolor === "Yellow" ?
                                        <img className="imageYrb productimg" src={"/Assets/img3.jpg"} alt="yellow" />
                                        : null
                                    }
                                    {item.defaultcolor === "Blue" ?
                                        <img className="imageYrb productimg" src={"/Assets/img1.jpg"} alt="blue" />
                                        : null
                                    }
                                    {item.defaultcolor === "Red" ?
                                        <img className="imageYrb productimg" src={"/Assets/img2.jpg"} alt="red" />
                                        : null
                                    }
                                    {/* <span>Change Color</span>
                                <select id={item.id} name="Color" onClick={this.handleChangeColor} className='sizeselection'>
                                    <option value="Red">Red</option>
                                    <option value="Blue">Blue</option>
                                    <option value="Yellow">Yellow</option>
                                </select> */}
                                </div>
                            }
                        })
                    }
                    <div className='productdescription'>
                        <h2 className='ProductName'>{name}</h2>
                        <span className='detailsprice'><b>${price}</b></span><br />
                        <strong className='detailscolor'>{defaultcolor}</strong><br />
                        <p className='detailsdescription'>Material: 100% Premium Combed Cotton, Single jersey, Pre-washed to impart a softer texture.Airy and perspire-friendly fabric that's best suited for Indian weather. “Proudly Made in India”<br />
                            <b>Fit Type</b>: Unisex Regular Fit<br />
                            <b>T-Shirt Colour </b>: {defaultcolor}<br />
                            <b>Sleeve Type </b>: Half<br />
                            <b>Occasion </b>: Classy Casual and Daily Wear. Good to go for any casual scene, express your style with these printed unisex t-shirts.
                            Wash Care instructions: Do not bleach. Dry in shade. Wash with similar colours. Machine wash cold.
                                    All designs are printed with skin-friendly chemicals and are tested for up to 10 washes, no bleeding.</p>
                        <span className='detailsprice'> <b>${price}</b> <br /> Including All Taxes</span><br /> <br />

                        <button type='button' className='btn add-btn' onClick={this.handleAddToCart}>ADD TO CART</button>
                        <ToastsContainer store={ToastsStore} />

                        <button type='button' className='btn continue-btn' onClick={this.backtocart}>CONTINUE SHOPPING</button>

                    </div>
                </div>
                {/* <div className='moreproducts'>
                    <div class="col-9 mx-auto col-md-6 col-lg-3 my-3 cardcontainer">
                        <div class="card">
                            <div className="img-container p-1">
                            </div>
                        </div>
                    </div>
                </div> */}
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const id = ownProps.match.params.id;
    const intId = parseInt(id);
    console.log("itemid update -----> ", intId);
    const product = state.productReducer.storeProducts.find(item => item.id === intId);
    console.log("Product Details ---->", product);
    console.log("images", state.Reducer.images);
    return {
        cart: state.cartreducer,
        storedProducts: state.Reducer.storeProducts,
        images: state.Reducer.images,
        product,
        intId
    }
}
const mapDispatchToProps = (dispatch) => ({
    addProduct: (data) => dispatch(addProduct(data)),
    updatecolor: (data) => dispatch(updatecolor(data)),

})

export default connect(mapStateToProps, mapDispatchToProps)(Details);