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
    DELIVERY_EACH_GET_FAIL 
} from "../../constants/deliveryManagementConstants/deliveriesConstants";
import axios from "axios";
import swal from "sweetalert";


export const DeliveryCreateAction =
	(
		order,
		customerName,
		customerEmail,
		customerPhone,
		deliveryServiceName,
		deliveryServiceEmail,
		deliveryServicePhone,
		status
	) =>
	async (dispatch, getState) => {
		try {
			dispatch({
				type: CREATE_DELIVERY_REQUEST,
			});
			const {
				customer_Login: { customerInfo },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${customerInfo.token}`,
				},
			};
			const dt = {
				order,
				customerName,
				customerEmail,
				customerPhone,
				deliveryServiceName,
				deliveryServiceEmail,
				deliveryServicePhone,
				status,
			};
			console.log("data", dt);
			const { data } = await axios.post(
				`http://localhost:5007/distribution/deliverycustomer/delivery/create`,
				{
					order,
					customerName,
					customerEmail,
					customerPhone,
					deliveryServiceName,
					deliveryServiceEmail,
					deliveryServicePhone,
					status,
				},
				config
			);

			swal({
				title: "Success !!!",
				text: "The Delivery Successfully Submitted.",
				icon: "success",
				timer: 2000,
				button: false,
			});

			dispatch({
				type: CREATE_DELIVERY_SUCCESS,
				payload: data,
			});
		} catch (error) {
			const message = "Delivery creation failed";
			dispatch({
				type: CREATE_DELIVERY_FAIL,
				payload: message,
			});

			swal({
				title: "Error!",
				text: "Something is Wrong",
				type: "error",
			});
		}
	};
export const updateDeliveryStatusAction = (id, status) => async (dispatch, getState) => {
	try {
		dispatch({
			type: UPDATE_DELIVERY_REQUEST,
		});

		const {
			admin_Login: { adminInfo },
		} = getState();

		const config = {
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${adminInfo.token}`,
			},
		};
		const { data } = await axios.put(
			`http://localhost:5007/distribution/delivery/customer/delivery/get/${id}`,
			{ status },
			config
		);

		dispatch({
			type: UPDATE_DELIVERY_SUCCESS,
			payload: data,
		});
		swal({
			title: "Success !!!",
			text: "Delivery status is updated",
			icon: "success",
			timer: 2000,
			button: false,
		});

		// setTimeout(function () {
		// 	window.location.href = "/admin-orders";
		// }, 2000);
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: UPDATE_DELIVERY_FAIL,
			payload: message,
		});
	}
};
export const listDeliveryForEachaction = (id) => async (dispatch, getState) => {
	try {
		dispatch({
			type: DELIVERY_EACH_GET_REQUEST,
		});

		const {
			customer_Login: { customerInfo },
		} = getState();

		const config = {
			headers: {
				Authorization: `Bearer ${customerInfo.token}`,
			},
		};

		const { data } = await axios.get(
			`http://localhost:5007/distribution/delivery/customer/delivery/get/${id}`,
			config
		);

		dispatch({
			type: DELIVERY_EACH_GET_SUCCESS,
			payload: data,
		});
	} catch (error) {
		const message = error.response && error.response.data.message ? error.response.data.message : error.message;
		dispatch({
			type: DELIVERY_EACH_GET_FAIL,
			payload: message,
		});
	}
};