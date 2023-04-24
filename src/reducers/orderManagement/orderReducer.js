import {ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL
} from '../../constants/orderManagement/orderConstants';

export const allOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case ALL_ORDERS_REQUEST:
            return {
                loading: true,
            };

        case ALL_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.payload,
            };

        case ALL_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

export const orderReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ORDER_REQUEST:
            return {
                ...state,
                loading: true,
            };

        case UPDATE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };

        case UPDATE_ORDER_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};
