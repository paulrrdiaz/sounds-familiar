import axios from 'axios';

const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URI + 'api/'
});

export default http;
