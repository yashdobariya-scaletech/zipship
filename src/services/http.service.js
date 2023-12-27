import axios from "axios";
import queryString from "query-string";
const axiosInstance = axios.create();

const API_CONFIG = {
  baseUrl: process.env.REACT_APP_BASE_URL,
  path: {
    shipment: "shipment.asmx/Create",
  },
};

const getUrl = (url, params = {}) => {
  let urlString = `${API_CONFIG.baseUrl}/apiv5/${url}`;
  if (params && Object.keys(params).length) {
    urlString += `?${queryString.stringify(params)}`;
  }
  return urlString;
};

/**
 * get method
 * @param request object containing axios params
 */
const get = (url, params = {}) => {
  return commonAxios({ method: "GET", url: getUrl(url, params) });
};

/**
 * post method
 * @param request object containing axios params
 */
const post = (url, params = {}, queryParams = {}) => {
  return commonAxios({
    method: "POST",
    url: getUrl(url, queryParams),
    data: params,
  });
};

/**
 * put method
 * @param request object containing axios params
 */
const put = (url, params = {}) => {
  return commonAxios({ method: "PUT", url: getUrl(url), data: params });
};

/**
 * deleteRequest method
 * @param request object containing axios params
 */
const deleteRequest = (url, params = {}) => {
  return commonAxios({ method: "DELETE", url: getUrl(url), data: params });
};

/**
 * commonAxios
 * @param object containing method, url, data, access token, content-type
 */
const commonAxios = ({
  method,
  url,
  data,
  contentType = "application/json",
}) => {
  const headers = {
    "Content-Type": contentType,
    "x-api-key": "8d70a88a-eecb-4595-a387-94294e3ab37f",
  };

  return new Promise((resolve, reject) => {
    axiosInstance({
      method: method,
      url: url,
      headers: headers,
      data: data,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.data && error.response.data.message) {
            reject(new Error(error.response.data.message));
          } else {
            reject(error);
          }
        } else {
          reject(error);
        }
      });
  });
};

const HttpService = {
  get: get,
  post: post,
  put: put,
  deleteRequest: deleteRequest,
};

export { API_CONFIG, HttpService, axiosInstance };
