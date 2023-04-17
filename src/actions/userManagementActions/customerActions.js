import {
  CUSTOMER_LOGIN_FAIL,
  CUSTOMER_LOGIN_REQUEST,
  CUSTOMER_LOGIN_SUCCESS,
  CUSTOMER_LOGOUT,
  CUSTOMER_REGISTER_FAIL,
  CUSTOMER_REGISTER_REQUEST,
  CUSTOMER_REGISTER_SUCCESS,
  CUSTOMER_VIEW_FAIL,
  CUSTOMER_VIEW_REQUEST,
  CUSTOMER_VIEW_SUCCESS,
  CUSTOMER_UPDATE_FAIL,
  CUSTOMER_UPDATE_REQUEST,
  CUSTOMER_UPDATE_SUCCESS,
  CUSTOMER_DELETE_FAIL,
  CUSTOMER_DELETE_REQUEST,
  CUSTOMER_DELETE_SUCCESS,
  CUSTOMER_LIST_FAIL,
  CUSTOMER_LIST_REQUEST,
  CUSTOMER_LIST_SUCCESS,
  CUSTOMER_VIEW_BY_ID_FAIL,
  CUSTOMER_VIEW_BY_ID_REQUEST,
  CUSTOMER_VIEW_BY_ID_SUCCESS,
  CUSTOMER_UPDATE_BY_ID_FAIL,
  CUSTOMER_UPDATE_BY_ID_REQUEST,
  CUSTOMER_UPDATE_BY_ID_SUCCESS,
  CUSTOMER_DELETE_BY_ID_FAIL,
  CUSTOMER_DELETE_BY_ID_REQUEST,
  CUSTOMER_DELETE_BY_ID_SUCCESS,
} from "../../constants/userManagementConstants/customerConstants";
import axios from "axios";
import swal from "sweetalert";
import { API_ENDPOINT_FOR_USER_MANAGEMENT } from "../../config";

export const customerLogin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: CUSTOMER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${API_ENDPOINT_FOR_USER_MANAGEMENT}/user/customer/login`,
      { email, password, isAdmin: false },
      config
    );

    dispatch({ type: CUSTOMER_LOGIN_SUCCESS, payload: data });
    swal({
      title: "Success !!!",
      text: "Customer Log In Successful.",
      icon: "success",
      timer: 2000,
      button: false,
    });
    setTimeout(function () {
      window.location.href = "/customer";
    }, 2000);
    localStorage.setItem("customerInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: CUSTOMER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export function authHeader() {
  let customer = JSON.parse(localStorage.getItem("customerInfo"));

  if (customer && customer.token) {
    return { Authorization: `Bearer ${customer.token}` };
  } else {
    return {};
  }
}

export const customerLogout = () => async (dispatch) => {
  localStorage.removeItem("customerInfo");
  dispatch({ type: CUSTOMER_LOGOUT });
};

export const customerRegister =
  (name, telephone, address, email, password, pic) => async (dispatch) => {
    try {
      dispatch({ type: CUSTOMER_REGISTER_REQUEST });

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${API_ENDPOINT_FOR_USER_MANAGEMENT}/user/customer/register`,
        {
          name,
          telephone,
          address,
          email,
          password,
          pic,
        },
        config
      );

      dispatch({ type: CUSTOMER_REGISTER_SUCCESS, payload: data });
      swal({
        title: "Success !!!",
        text: "Customer Registration Successful.",
        icon: "success",
        timer: 2000,
        button: false,
      });
      setTimeout(function () {
        window.location.href = "/customer";
      }, 2000);
    } catch (error) {
      dispatch({
        type: CUSTOMER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const customerViewProfile = (customer) => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOMER_VIEW_REQUEST });

    const {
      customer_Login: { customerInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${API_ENDPOINT_FOR_USER_MANAGEMENT}/user/customer/view`,
      customer,
      config
    );

    dispatch({ type: CUSTOMER_VIEW_SUCCESS, payload: data });

    dispatch({ type: CUSTOMER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("customerInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: CUSTOMER_VIEW_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const customerUpdateProfile =
  (customer) => async (dispatch, getState) => {
    try {
      dispatch({ type: CUSTOMER_UPDATE_REQUEST });

      const {
        customer_Login: { customerInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${customerInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${API_ENDPOINT_FOR_USER_MANAGEMENT}/user/customer/edit`,
        customer,
        config
      );

      dispatch({ type: CUSTOMER_UPDATE_SUCCESS, payload: data });
      swal({
        title: "Success !!!",
        text: "Customer Account Update Successful.",
        icon: "success",
        timer: 2000,
        button: false,
      });
      setTimeout(function () {
        window.location.href = "/customer-view";
      }, 2000);
      dispatch({ type: CUSTOMER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem("customerInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: CUSTOMER_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const customerDeleteProfile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CUSTOMER_DELETE_REQUEST });

    const {
      customer_Login: { customerInfo },
    } = getState();
    console.log(customerInfo);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${customerInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `${API_ENDPOINT_FOR_USER_MANAGEMENT}/user/customer/delete`,
      config
    );

    dispatch({ type: CUSTOMER_DELETE_SUCCESS, payload: data });
    swal({
      title: "Success !!!",
      text: "Customer Account Delete Successful.",
      icon: "success",
      timer: 2000,
      button: false,
    });

    window.location.href = "/";

    dispatch({ type: CUSTOMER_LOGOUT });
    localStorage.removeItem("customerInfo");
  } catch (error) {
    dispatch({
      type: CUSTOMER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const customersList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CUSTOMER_LIST_REQUEST,
    });

    const {
      admin_Login: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${API_ENDPOINT_FOR_USER_MANAGEMENT}/user/admin/customers`,
      config
    );

    dispatch({
      type: CUSTOMER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: CUSTOMER_LIST_FAIL,
      payload: message,
    });
  }
};

export const customerViewProfileById =
  (id, name, telephone, address, email, password, pic) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CUSTOMER_VIEW_BY_ID_REQUEST,
      });

      const {
        admin_Login: { adminInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${adminInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `${API_ENDPOINT_FOR_USER_MANAGEMENT}/user/admin/customer/profile/view/${id}`,
        {
          id,
          name,
          telephone,
          address,
          email,
          password,
          pic,
        },
        config
      );

      dispatch({
        type: CUSTOMER_VIEW_BY_ID_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: CUSTOMER_VIEW_BY_ID_FAIL,
        payload: message,
      });
    }
  };

export const customerUpdateProfileById =
  (id, name, telephone, address, email, password, pic, message) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CUSTOMER_UPDATE_BY_ID_REQUEST,
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
        `${API_ENDPOINT_FOR_USER_MANAGEMENT}/user/admin/customer/profile/edit/${id}`,
        {
          name,
          telephone,
          address,
          email,
          password,
          pic,
          message,
        },
        config
      );

      dispatch({
        type: CUSTOMER_UPDATE_BY_ID_SUCCESS,
        payload: data,
      });
      swal({
        title: "Success !!!",
        text: "Customer Account Update Successful.",
        icon: "success",
        timer: 2000,
        button: false,
      });
      setTimeout(function () {
        window.location.href = "/admin-customers";
      }, 2000);
    } catch (error) {
      const message = "Customer Update Failed !!!";
      dispatch({
        type: CUSTOMER_UPDATE_BY_ID_FAIL,
        payload: message,
      });
    }
  };

export const customerDeleteProfileById = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CUSTOMER_DELETE_BY_ID_REQUEST,
    });

    const {
      admin_Login: { adminInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${adminInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `${API_ENDPOINT_FOR_USER_MANAGEMENT}/user/admin/customer/profile/view/${id}`,
      config
    );

    dispatch({
      type: CUSTOMER_DELETE_BY_ID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message = "Customer Delete Failed !!!";
    dispatch({
      type: CUSTOMER_DELETE_BY_ID_FAIL,
      payload: message,
    });
  }
};
