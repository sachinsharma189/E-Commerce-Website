import React, { Component } from 'react';
import { connect } from 'react-redux';
import SelectSize from './Selectsize';
import Radiobutton from './Radiobutton';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import {ToastsContainer, ToastsStore} from 'react-toasts';

class Carddata extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayColorButton: false,
            // cartauth:false
        }
    }
    handleChangeColor =(e) =>{
        e.stopPropagation();
        this.props.handleChangeColor(e);
    }
    colorButton = (e) => {
        e.stopPropagation();
        console.log("Color Button Function Called");
        this.setState({
            displayColorButton: !this.state.displayColorButton
            // displayColorButton : true
        });
        console.log("Display color button",this.state.displayColorButton);
        console.log("ColorButton", e.target);
        console.log("CButton", this.state.displayColorButton);

    }
    

    render() {
        const { value , name, imageKeys, handleAddToCart, handleChangeSize, handleChangeColor, selectedColor } = this.props;
        let btn = this.state.displayColorButton ? "displayBlock" : "hideBlock";
        let {cartauthcheck} = this.props;
        console.log("cart Auth --111------->>>>>>>",cartauthcheck);
        console.log("button  --->>",btn);
        return (
            <div className='selectionoption'>
                <div className={`${btn} cartmenu`}>
                    <Radiobutton
                        handleChangeColor={(e) => handleChangeColor(e)}
                        value = {value}
                        name={name}
                        imageKeys={imageKeys}
                        colorButtonToggle={this.colorButton}
                        selectedColor = {selectedColor}
                    />
                </div>
                <div>
                    <SelectSize
                        handleChangeSize={(e) => handleChangeSize(e)}
                    />
                </div>
                <div>
                    <button type='button' value='Add To Cart' className='btn add-btnmain' onClick={handleAddToCart}>
                        ADD TO CART
                    </button>
                    <ToastsContainer store={ToastsStore}/>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        storedProducts: state.Reducer.storeProducts,
        cartauthcheck : state.cartauthreducer.cartauthentication
    }
}

export default connect(mapStateToProps)(Carddata);
