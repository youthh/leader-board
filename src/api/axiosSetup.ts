import axios from "axios";

export const instance = axios.create({
  baseURL: "http://coding-test.cube19.io/frontend/v1/",
});
