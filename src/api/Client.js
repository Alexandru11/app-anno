import axios from 'axios';
import env from '@/utils/Env';

const { backendUri } = env;

const client = axios.create({
  baseURL: backendUri,
  json: true,
  headers: { 'Content-Type': 'application/json' },
});

export default {
  async execute(method, resource, data) {
    // inject the accessToken for each request
    return client({
      method,
      url: resource,
      data,
    }).then((req) => req.data);
  },
  // handled by the browser
  async executeDownload(resource) {
    const resourceURL = `${backendUri}${resource}`;
    window.open(resourceURL);
  },
};
