import { CREATE_ORDER_REQUEST, CREATE_ORDER_FAIL, CREATE_ORDER_SUCCESS, CLEAR_ERRORS , MY_ORDER_REQUEST, MY_ORDER_SUCCESS, MY_ORDER_FAIL, ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
ALL_ORDER_REQUEST,
ALL_ORDER_SUCCESS,
ALL_ORDER_FAIL,
DELETE_ORDER_REQUEST,
DELETE_ORDER_SUCCESS,
DELETE_ORDER_FAIL,
UPDATE_ORDER_REQUEST,
UPDATE_ORDER_SUCCESS,
UPDATE_ORDER_FAIL,
UPDATE_ORDER_RESET,
DELETE_ORDER_RESET
} from "../constants/orderConstants";

export const newOrderReducer = (state = {}, actions) => {

    switch (actions.type) {
        case CREATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case CREATE_ORDER_SUCCESS:
            return {
                loading: false,
                order: actions.payload,
            };
        case CREATE_ORDER_FAIL:
            return {
                loading: false,
                error: actions.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
    
        default:
            return state;
    }
};

export const myOrdersReducer = (state = {orders: []}, actions) => {

    switch (actions.type) {
        case MY_ORDER_REQUEST:
            return {
                loading: true,
            };
        case MY_ORDER_SUCCESS:
            return {
                orders: actions.payload,
                loading: false,
            };
        case MY_ORDER_FAIL:
            return {
                loading: false,
                error: actions.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
    
        default:
            return state;
    }
};


export const allordersReducer = (state = {orders: []}, actions) => {

    switch (actions.type) {
        case ALL_ORDER_REQUEST:
            return {
                loading: true,
            };
        case ALL_ORDER_SUCCESS:
            return {
                orders: actions.payload,
                loading: false,
            };
        case ALL_ORDER_FAIL:
            return {
                loading: false,
                error: actions.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
    
        default:
            return state;
    }
};

export const orderReducer = (state = {}, actions) => {

    switch (actions.type) {
        case UPDATE_ORDER_REQUEST:
        case DELETE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case UPDATE_ORDER_SUCCESS:

            return {
                ...state,
                isUpdated: actions.payload,
                loading: false,
            };
        case DELETE_ORDER_SUCCESS:

            return {
                ...state,
                isDeleted: actions.payload,
                loading: false,
            };
        case UPDATE_ORDER_RESET:
            return {
                ...state,
                isUpdated: false,
            };
        case DELETE_ORDER_RESET:
            return {
                ...state,
                isDeleted: false,
            };
        case UPDATE_ORDER_FAIL:
        case DELETE_ORDER_FAIL:
            
            return {
                ...state,
                loading: false,
                error: actions.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
    
        default:
            return state;
    }
};

export const orderDetailsReducer = (state = {order: {}}, actions) => {

    switch (actions.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                loading: true,
            };
        case ORDER_DETAILS_SUCCESS:
            return {
                order: actions.payload,
                loading: false,
            };
        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: actions.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null,
            }
    
        default:
            return state;
    }
};