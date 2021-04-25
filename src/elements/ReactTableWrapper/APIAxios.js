import axios from "axios";
import * as API from "../../config/endpoint.js";
export const postRequest = (api, params) => {
  return axios.post(api, params);
};

export const graphRequest = (query, params = "") => {
  return axios.post(API.GRAPHQL, {
    query,
    variables: {
      params,
    },
  });
  // .then((res) => res.data);
};
