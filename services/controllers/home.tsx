import axios, { AxiosRequestConfig } from "axios";

export const fetchNews = (options: AxiosRequestConfig) => {
  return axios.get(`https://newsapi.org/v2/top-headlines`, options);
};
