import { cartauthentication } from './Components/Data';

const initialState = { cartauthentication: false }

export const cartauthreducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CART_AUTH': {
            console.log("CART_AUTH verification", action.data);
            const cartauth = action.data.cartauthcheck;
            console.log("Cart auth reducer cart auth ",cartauth);
            return { ...state,  cartauthentication: cartauth};
        }
        default: {
            return {...state};
        }
    }
}

export default cartauthreducer;