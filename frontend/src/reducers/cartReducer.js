import {ADD_TO_CART, REMOVE_CART_ITEM, SAVE_SHIPPING_INFO} from "../constants/cartConstants"

export const cartReducer = (state = { cartItems: [], shippingInfo: {} }, actions) => {

    switch (actions.type) {

        case ADD_TO_CART:
            const item = actions.payload;

            const isItemExist = state.cartItems.find((i)=> i.product === item.product)

            if(isItemExist){
                return {
                    ...state,
                    cartItems: state.cartItems.map((i)=> i.product === isItemExist.product ? item: i),
                };
            }
            else{
                return{
                    ...state,
                    cartItems: [...state.cartItems, item],

                };
            }
        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => i.product !== actions.payload),
            };
        
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo:actions.payload
            };    
        default:
            return state;
    }

}