    import {ALL_PRODUCT_FAIL, ALL_PRODUCT_REQUEST, ALL_PRODUCT_SUCCESS, CLEAR_ERRORS, ALL_PRODUCT_DETAILS_REQUEST, ALL_PRODUCT_DETAILS_FAIL, ALL_PRODUCT_DETAILS_SUCCESS, NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_RESET,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS, NEW_PRODUCT_FAIL,NEW_PRODUCT_RESET,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS, DELETE_PRODUCT_FAIL, DELETE_PRODUCT_RESET,
    UPDATE_PRODUCT_REQUEST,
    UPDATE_PRODUCT_SUCCESS,
    UPDATE_PRODUCT_RESET,
    UPDATE_PRODUCT_FAIL,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_RESET
    } from "../constants/productConstants";



    export const productsReducer = (state = { products: [] }, actions) => {
  switch (actions.type) {
    case ALL_PRODUCT_REQUEST:
    case ADMIN_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true, // Set loading to true
        products: [],
      };
    case ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: actions.payload.products,
        productsCount: actions.payload.productCount,
        resultPerPage: actions.payload.resultPerPage,
        filteredProductsCount: actions.payload.filteredProductsCount
      };
    case ADMIN_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: actions.payload,
      };
    case ALL_PRODUCT_FAIL:
    case ADMIN_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, actions) => {
  switch (actions.type) {
    case ALL_PRODUCT_DETAILS_REQUEST:
      return {
        ...state,
        loading: true, // Set loading to true
      };
    case ALL_PRODUCT_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        product: actions.payload,
      };
    case ALL_PRODUCT_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
//add reviews
export const newReviewReducer = (state = { }, actions) => {
  switch (actions.type) {
    case NEW_REVIEW_REQUEST:
      return {
        ...state,
        loading: true, // Set loading to true
      };
    case NEW_REVIEW_SUCCESS:
      return {
        loading: false,
        success: actions.payload,
      };
    case NEW_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };
    case NEW_REVIEW_RESET:
      return {  
          ...state,
          success: false,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//Create New Product
export const newProductReducer = (state = {product: {} }, actions) => {
  switch (actions.type) {
    case NEW_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true, // Set loading to true
      };
    case NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        success: actions.payload.success,
        product: actions.payload.product
      };
    case NEW_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };
    case NEW_PRODUCT_RESET:
      return {  
          ...state,
          success: false,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const productReducer = (state = {}, actions) => {
  switch (actions.type) {
    case DELETE_PRODUCT_REQUEST:
    case UPDATE_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true, // Set loading to true
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: actions.payload,
      };
    case UPDATE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: actions.payload,
      };

    case DELETE_PRODUCT_FAIL:
    case UPDATE_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };
    case DELETE_PRODUCT_RESET:
      return {  
          ...state,
          isDeleted: false,
      }
    case UPDATE_PRODUCT_RESET:
      return {  
          ...state,
          isUpdated: false,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
//Get All Reviews Of Single Product

export const productReviewsReducer = (state = { reviews: [] }, actions) => {
  switch (actions.type) {
    case ALL_REVIEW_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ALL_REVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        reviews: actions.payload,
      };
    case ALL_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

//Delete a Review --Admin
export const reviewReducer = (state = {product: {} }, actions) => {
  switch (actions.type) {
    case DELETE_REVIEW_REQUEST:
      return {
        ...state,
        loading: true, // Set loading to true
      };
    case DELETE_REVIEW_SUCCESS:
      return {
        loading: false,
        isDeleted: actions.payload,
      };
    case DELETE_REVIEW_FAIL:
      return {
        ...state,
        loading: false,
        error: actions.payload,
      };
    case DELETE_REVIEW_RESET:
      return {  
          ...state,
          isDeleted: false,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};