import axios from "axios";

export const request = axios.create({
  baseURL: process.env.REACT_APP_FETCH_API,
});
export const get = async (url, options = {}) => {
  const res = await request.get(url, options);
  return res;
};
export const post = (url, body = {}) => {
  return request
    .post(url, body)
    .then((res) => {
      if (res.ok) {
        console.log(res);
        return res;
      }
    })
    .catch((error) => {
      console.log(error.response);
      return error.response;
    });
};
