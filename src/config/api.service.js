import axios from "axios";

const ApiService = {
  init() {
    axios.defaults.headers["Content-Type"] = "application/json";
    axios.defaults.headers["Access-Control-Allow-Origin"] = "*";
  },

  setToken() {
    axios.defaults.headers.common.Authorization = `Bearer abcd}`;
  },

  get(url) {
    return axios.get(`${url}`).catch((error) => {
      console.log("error", error);
    });
  },
  post(url, payload) {
    console.log("url", url);
    console.log("pylodd", payload);
    return axios.post(url, payload).catch((error) => {
      console.log("error", error);
    });
  },

  patch(url, param, payload) {
    return axios.patch(`${url}/${param}`, payload);
  },

  delete(url, param) {
    return axios.delete(`${url}/${param}`).catch((error) => {
      console.log("error", error);
    });
  },
};

export default ApiService;
