import {
  PRODUCTS_LIST_FOR_VENDOR_REQUEST,
  PRODUCTS_LIST_FOR_VENDOR_SUCCESS,
  PRODUCTS_LIST_FOR_VENDOR_FAIL,
  PRODUCTS_LIST_FOR_ADMIN_REQUEST,
  PRODUCTS_LIST_FOR_ADMIN_SUCCESS,
  PRODUCTS_LIST_FOR_ADMIN_FAIL,
  PRODUCTS_CREATE_REQUEST,
  PRODUCTS_CREATE_SUCCESS,
  PRODUCTS_CREATE_FAIL,
  PRODUCTS_UPDATE_BY_VENDOR_REQUEST,
  PRODUCTS_UPDATE_BY_VENDOR_SUCCESS,
  PRODUCTS_UPDATE_BY_VENDOR_FAIL,
  PRODUCTS_DELETE_BY_VENDOR_REQUEST,
  PRODUCTS_DELETE_BY_VENDOR_SUCCESS,
  PRODUCTS_DELETE_BY_VENDOR_FAIL,
  PRODUCTS_UPDATE_BY_ADMIN_REQUEST,
  PRODUCTS_UPDATE_BY_ADMIN_SUCCESS,
  PRODUCTS_UPDATE_BY_ADMIN_FAIL,
  PRODUCTS_DELETE_BY_ADMIN_REQUEST,
  PRODUCTS_DELETE_BY_ADMIN_SUCCESS,
  PRODUCTS_DELETE_BY_ADMIN_FAIL,
} from "../../constants/productManagementConstants/productConstants";
import axios from "axios";
import { API_ENDPOINT_FOR_PRODUCT_MANAGEMENT } from "../../config";

export const productsListForVendor = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCTS_LIST_FOR_VENDOR_REQUEST,
    });

    const {
      vendor_Login: { vendorInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${vendorInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `${API_ENDPOINT_FOR_PRODUCT_MANAGEMENT}/products/vendor/product/get`,
      config
    );

    dispatch({
      type: PRODUCTS_LIST_FOR_VENDOR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCTS_LIST_FOR_VENDOR_FAIL,
      payload: message,
    });
  }
};

export const productsListForAdmin = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCTS_LIST_FOR_ADMIN_REQUEST,
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
      `${API_ENDPOINT_FOR_PRODUCT_MANAGEMENT}/products/admin/product/get`,
      config
    );

    dispatch({
      type: PRODUCTS_LIST_FOR_ADMIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCTS_LIST_FOR_ADMIN_FAIL,
      payload: message,
    });
  }
};

export const createProduct =
  (
    vendorEmail,
    title,
    category,
    productBrand,
    productCode,
    description,
    picURL,
    price,
    ingredients,
    usage,
    warnings,
    discountNote,
    discountPrice,
    quantity
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCTS_CREATE_REQUEST,
      });

      const {
        vendor_Login: { vendorInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${vendorInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `${API_ENDPOINT_FOR_PRODUCT_MANAGEMENT}/products/vendor/product/add`,
        {
          vendorEmail,
          title,
          category,
          productBrand,
          productCode,
          description,
          picURL,
          price,
          ingredients,
          usage,
          warnings,
          discountNote,
          discountPrice,
          quantity,
        },
        config
      );

      dispatch({
        type: PRODUCTS_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PRODUCTS_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateProductByVendor =
  (
    id,
    vendorEmail,
    title,
    category,
    productBrand,
    productCode,
    description,
    picURL,
    price,
    ingredients,
    usage,
    warnings,
    discountNote,
    discountPrice,
    quantity
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCTS_UPDATE_BY_VENDOR_REQUEST,
      });

      const {
        vendor_Login: { vendorInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${vendorInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `${API_ENDPOINT_FOR_PRODUCT_MANAGEMENT}/products/vendor/product/get/${id}`,
        {
          vendorEmail,
          title,
          category,
          productBrand,
          productCode,
          description,
          picURL,
          price,
          ingredients,
          usage,
          warnings,
          discountNote,
          discountPrice,
          quantity,
        },
        config
      );

      dispatch({
        type: PRODUCTS_UPDATE_BY_VENDOR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PRODUCTS_UPDATE_BY_VENDOR_FAIL,
        payload: message,
      });
    }
  };

export const updateProductByAdmin =
  (
    id,
    vendorEmail,
    title,
    category,
    productBrand,
    productCode,
    description,
    picURL,
    price,
    ingredients,
    usage,
    warnings,
    discountNote,
    discountPrice,
    quantity
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: PRODUCTS_UPDATE_BY_ADMIN_REQUEST,
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
        `${API_ENDPOINT_FOR_PRODUCT_MANAGEMENT}/products/vendor/product/get/${id}`,
        {
          vendorEmail,
          title,
          category,
          productBrand,
          productCode,
          description,
          picURL,
          price,
          ingredients,
          usage,
          warnings,
          discountNote,
          discountPrice,
          quantity,
        },
        config
      );

      dispatch({
        type: PRODUCTS_UPDATE_BY_ADMIN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: PRODUCTS_UPDATE_BY_ADMIN_FAIL,
        payload: message,
      });
    }
  };

export const deleteProductByVendor = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCTS_DELETE_BY_VENDOR_REQUEST,
    });

    const {
      vendor_Login: { vendorInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${vendorInfo.token}`,
      },
    };

    const { data } = await axios.delete(
      `${API_ENDPOINT_FOR_PRODUCT_MANAGEMENT}/products/vendor/product/get/${id}`,
      config
    );

    dispatch({
      type: PRODUCTS_DELETE_BY_VENDOR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCTS_DELETE_BY_VENDOR_FAIL,
      payload: message,
    });
  }
};

export const deleteProductByAdmin = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PRODUCTS_DELETE_BY_ADMIN_REQUEST,
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
      `${API_ENDPOINT_FOR_PRODUCT_MANAGEMENT}/products/admin/product/get/${id}`,
      config
    );

    dispatch({
      type: PRODUCTS_DELETE_BY_ADMIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCTS_DELETE_BY_ADMIN_FAIL,
      payload: message,
    });
  }
};