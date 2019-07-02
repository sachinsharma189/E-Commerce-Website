import React from 'react';
import { connect } from 'react-redux';
import { Formik, Form, Field } from "formik/dist/index";
import swal from 'sweetalert';
import { billingAction } from "../../Action";
import { initialValues, validateName, validateEmail, validateZip } from "./formHandler";
import Navbar from '../Navbar';
import Footer from '../Footer';

class FieldLevelValidationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            subtotal: 0,
        }
    }
    handleSubmit = (values, { resetForm }) => {
        const { billingAction } = this.props;
        billingAction(values);
        resetForm();
        this.props.history.push('/submit');
        // alert('Submitted Successfully!');
        swal("Congratulations!", "Your Order has been placed", "success");
    }

    handleShippingAddressCheckbox = (setFieldValue, values) => {
        Object.keys(values).map(item => {
            setFieldValue(['Shipping_' + item], values[item]);
        })
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className='checkoutformpage'>

                    <div className='detailsform'>
                        <Formik
                            initialValues={initialValues}
                            onSubmit={this.handleSubmit}
                            render={({ errors, setFieldValue, values }) => (
                                <div className="checkOutShop">
                                    <Form className="form-details">
                                        <h2 className="checkoutHead">Checkout</h2>
                                        <h4 className="checkoutHead">Your Details</h4>
                                        <fieldset className="billing">
                                            <h5 className="billHead">Billing</h5>
                                            <br />
                                            <div>
                                                <label className="checkLabel">Name:</label>
                                                <Field
                                                    className="input-fields"
                                                    name="Username"
                                                    validate={validateName}
                                                />
                                                {errors.Username &&

                                                    <span className="errors">{errors.Username}</span>

                                                }
                                            </div>
                                            <div>
                                                <label className="checkLabel">Email:</label>
                                                <Field
                                                    className="input-fields"
                                                    name="Email"
                                                    validate={validateEmail}
                                                />
                                                {
                                                    errors.Email &&

                                                    <span className="errors">{errors.Email}</span>

                                                }
                                            </div>
                                            <div>
                                                <label className="checkLabel">City:</label>
                                                <Field
                                                    className="input-fields"
                                                    name="City"
                                                />
                                            </div>
                                            <div>
                                                <label className="checkLabel">Address:</label>
                                                <Field
                                                    className="input-fields"
                                                    name="Address"
                                                />
                                            </div>
                                            <div>
                                                <label className="checkLabel">Zipcode:</label>
                                                <Field
                                                    className="input-fields"
                                                    name="Zipcode"
                                                    validate={validateZip}

                                                />
                                                {
                                                    errors.Zipcode &&

                                                    <span className="errors">{errors.Zipcode}</span>

                                                }
                                            </div>
                                            <div>
                                                <label className="checkLabel">Country:</label>
                                                <Field component="select" name="Country" className="country">
                                                    <option value="India">India</option>
                                                    <option value="Thailand">Thailand</option>
                                                    <option value="USA">USA</option>
                                                </Field>
                                            </div>
                                        </fieldset>

                                        <div className="billSame">
                                            <span>Same as Billing</span>
                                            <input
                                                type="checkbox"
                                                onChange={(e) => this.handleShippingAddressCheckbox(setFieldValue, values)}
                                                className="checkBilling"
                                            />
                                        </div>

                                        <fieldset className="shipping">
                                            <h5 className="shipHead">Shipping</h5>
                                            <br />
                                            <div>
                                                <label className="checkLabel">Name:</label>
                                                <Field
                                                    className="input-fields"
                                                    name="Shipping_Username"
                                                    validate={validateName}
                                                />
                                                {errors.Username &&
                                                    <span className="errors">{errors.Username}</span>

                                                }
                                            </div>
                                            <div>
                                                <label className="checkLabel">Email:</label>
                                                <Field
                                                    className="input-fields"
                                                    name="Shipping_Email"
                                                    validate={validateEmail}
                                                />
                                                {
                                                    errors.Email &&

                                                    <span className="errors">{errors.Email}</span>

                                                }
                                            </div>
                                            <div>
                                                <label className="checkLabel">City:</label>
                                                <Field
                                                    className="input-fields"
                                                    name="Shipping_City"
                                                />
                                            </div>
                                            <div>
                                                <label className="checkLabel">Address:</label>
                                                <Field
                                                    className="input-fields"
                                                    name="Shipping_Address"
                                                />
                                            </div>
                                            <div>
                                                <label className="checkLabel">Zipcode:</label>
                                                <Field
                                                    className="input-fields"
                                                    name="Shipping_Zipcode"
                                                    validate={validateZip}

                                                />
                                                {
                                                    errors.Zipcode &&

                                                    <span className="errors">{errors.Zipcode}</span>

                                                }
                                            </div>
                                            <div>
                                                <label className="checkLabel">Country:</label>
                                                <Field component="select" name="Country" className="country">
                                                    <option value="India">India</option>
                                                    <option value="Thailand">Thailand</option>
                                                    <option value="USA">USA</option>
                                                </Field>
                                            </div>
                                        </fieldset>
                                        <button type="submit" className="btn btn-danger btn-checkout add-btn">
                                            Submit
                                        </button>
                                    </Form>
                                </div>

                            )}
                        /></div>
                    <div className='productdetails'>
                        <h2 className='productsummary'>Checkout Summary</h2>
                        {
                            // console.log("cart details in form",this.props.cart)
                            this.props.cart.map((item, i) => {
                                return (
                                    <div className='incartproducts'>

                                        <div className='incartimg'>
                                            {item.color === "Yellow" ?
                                                <img className="imageYrb productimgform" src={"/Assets/img3.jpg"} alt="yellow" />
                                                : null
                                            }
                                            {item.color === "Blue" ?
                                                <img className="imageYrb productimgform" src={"/Assets/img1.jpg"} alt="blue" />
                                                : null
                                            }
                                            {item.color === "Red" ?
                                                <img className="imageYrb productimgform" src={"/Assets/img2.jpg"} alt="red" />
                                                : null
                                            }
                                        </div>
                                        <div className='incartdescription'>
                                            <span> Price :  ${item.price}</span> <br />
                                            <span> Quantity :  {item.quantity}</span> <br />
                                            <span> Product Name : {item.productname}</span> <br />
                                            <span> Sub Total : $ {
                                                this.state.subtotal = item.price * item.quantity
                                            }
                                            </span> <br />

                                            {/* <div className='totaldiv'>
                                                <span>Sub-Total(Including Shipping and GST) : $ {this.state.subtotal = item.price * item.quantity}
                                                </span>
                                                {/* <p>Total: {this.state.total = this.state.subtotal + this.state.total}</p> */}
                                            {/* </div> */}
                                            {console.log("subtotal======================>", this.state.subtotal)}
                                        </div>
                                        <p className='hidetotal'>Total: ${this.state.total = this.state.subtotal + this.state.total}</p>
                                    </div>
                                )
                            })
                        }
                        <br /> <br />
                        <div className='totaldiv'>
                            <p>Total: ${this.state.total}</p>
                        </div>
                    </div>

                </div>
                <Footer />
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    cart: state.cartreducer,
    storedProducts: state.Reducer.storeProducts,
    cartauthcheck: state.cartauthreducer.cartauthentication
})

const mapDispatchToProps = {
    billingAction
}

export default connect(mapStateToProps, mapDispatchToProps)(FieldLevelValidationForm);