import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Carddata from './Carddata';
import { addProduct, cartauthcheck } from '../Action';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { ToastsContainer, ToastsStore } from 'react-toasts';


class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clickid: 1,
            size: 'S',
            // color: 'Red',
            quantity: 1,
            // selectedImage: 'blue',
            selectedColor: props.product.defaultcolor,
            color: props.product.defaultcolor,
            animate: true
        }
    }


    gettingimgid = (e) => {
        console.log("details id------>", e.target.id)
        this.setState({
            clickid: e.target.id
        })
        console.log("image -- id", this.state.clickid);
    }
    handleChangeSize = (e) => {
        console.log("Selected size", e.target.value);
        this.setState({
            size: e.target.value
        })

    }
    handleChangeColor = (e) => {
        // e.stopPropagation();
        // console.log("Color Selection", e.target.value);
        // this.setState({
        //     selectedImage: e.target.value,
        //     color: e.target.value
        // })
        let { name } = this.props.product;
        let selectedRadio = name + " radio";
        console.log("radio button ", e.target.value);
        if (e.target.name === selectedRadio) {
            this.setState({
                selectedColor: e.target.value,
                animate: true,
                color: e.target.value
            })
        }
        this.setState({
            [e.target.name]: e.target.value,

        })
        {
            console.log("etargetvalue", e.target.name)
        }
    }
    handleAddToCart = (e) => {
        ToastsStore.success("Product added to Cart")
        e.preventDefault();
        let { cartauthcheck } = this.props;
        console.log("Cart auth in Card.js", cartauthcheck)
        console.log("cart  verification in card--->>>", cartauthcheck);
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
        cartauthcheck({
            cartauthcheck: true
        })
    }

    render() {
        let { product } = this.props;
        let imageRender = this.props.images;
        let imageKeys = Object.keys(this.props.images[0]);
        return (
            <div class="col-9 mx-auto col-md-6 col-lg-3 my-3 cardcontainer">
                <div class="card" onMouseOver="show_sidebar()" onMouseOut="hide_sidebar()">
                    <div className="img-container p-4">
                        <Link to={`/details/${product.id}`}>
                            {
                                imageKeys.map((item, i) => {
                                    return (
                                        this.state.selectedColor === item ?
                                            <div key={i} className="image container" onClick={this.gettingimgid}>
                                                <img src={imageRender[0][item]} alt="shirt" className={`${product.name} productimage`} />
                                                {/* <div className="middle">
                                                    <div className="text">CLICK HERE TO VIEW MORE ABOUT THE PRODUCT</div>
                                                </div> */}
                                            </div> : null

                                    )
                                })
                            }
                        </Link>
                    </div>
                    <div className="carddatafooter">
                        {/* <div className='carddatadetails'> */}
                            <span className="align-self-center">{product.name}</span>
                            <span>${product.price}</span>
                        {/* </div> */}
                    </div>
                    <div className={`${product.name} buttonNav`}>
                            <Carddata
                                selectedColor={this.state.selectedColor}
                                name={product.name}
                                imageKeys={imageKeys}
                                handleChangeSize={this.handleChangeSize}
                                handleChangeColor={this.handleChangeColor}
                                handleAddToCart={this.handleAddToCart}
                            />
                        </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    console.log("images", state.Reducer.images);
    return {
        storedProducts: state.Reducer.storeProducts,
        images: state.Reducer.images,
        cartauth: state.cartauthreducer.cartauthentication
    }
}
const mapDispatchToProps = (dispatch) => ({
    addProduct: (data) => dispatch(addProduct(data)),
    cartauthcheck: (data) => dispatch(cartauthcheck(data))

})
export default connect(mapStateToProps, mapDispatchToProps)(Card);
