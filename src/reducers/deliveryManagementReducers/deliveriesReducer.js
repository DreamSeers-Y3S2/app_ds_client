import {
	CREATE_DELIVERY_REQUEST,
	CREATE_DELIVERY_SUCCESS,
	CREATE_DELIVERY_FAIL,
	DELIVERY_GET_BY_ID_REQUEST,
	DELIVERY_GET_BY_ID_SUCCESS,
	DELIVERY_GET_BY_ID_FAIL,
	UPDATE_DELIVERY_REQUEST,
	UPDATE_DELIVERY_SUCCESS,
	UPDATE_DELIVERY_FAIL,
	DELIVERY_EACH_GET_REQUEST,
	DELIVERY_EACH_GET_SUCCESS,
	DELIVERY_EACH_GET_FAIL,
} from "../../constants/deliveryManagementConstants/deliveriesConstants";


export const DeliveryCreateReducer = (state = {}, action) => {
	switch (action.type) {
		case CREATE_DELIVERY_REQUEST:
			return { loading: true };
		case CREATE_DELIVERY_SUCCESS:
			return { loading: false, success: true };
		case CREATE_DELIVERY_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const DeliveryUpdateReducer = (state = {}, action) => {
	switch (action.type) {
		case UPDATE_DELIVERY_REQUEST:
			return { loading: true };
		case UPDATE_DELIVERY_SUCCESS:
			return { loading: false, success: true };
		case UPDATE_DELIVERY_FAIL:
			return { loading: false, error: action.payload, success: false };

		default:
			return state;
	}
};

export const DeliveryForEachReducer = (state = { deliveries: [] }, action) => {
	switch (action.type) {
		case DELIVERY_EACH_GET_REQUEST:
			return { loading: true };
		case DELIVERY_EACH_GET_SUCCESS:
			return { loading: false, deliveries: action.payload };
		case DELIVERY_EACH_GET_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};

export const DeliveryGetByIDReducer = (state = { distribution: [] }, action) => {
	switch (action.type) {
		case DELIVERY_GET_BY_ID_REQUEST:
			return { loading: true };
		case DELIVERY_GET_BY_ID_SUCCESS:
			return { loading: false, distribution: action.payload };
		case DELIVERY_GET_BY_ID_FAIL:
			return { loading: false, error: action.payload };

		default:
			return state;
	}
};