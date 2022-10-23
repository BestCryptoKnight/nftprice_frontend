import axios from 'axios';

export const Axios = axios.create();
export const Canceler = axios.CancelToken.source();