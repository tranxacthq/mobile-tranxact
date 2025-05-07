const isDev = process.env.NODE_ENV === 'development';

const API_URLS = {
    development: 'https://dev-api.yourdomain.com',
    staging: 'https://staging-api.yourdomain.com',
    production: 'https://api.yourdomain.com',
};

const API_URL = isDev ? API_URLS.development : API_URLS.production;

const API_VERSION = 'v1';

export const BASE_URL = `${API_URL}/${API_VERSION}`;

export const REQUEST_TIMEOUT = 30000;

export const DEFAULT_HEADERS = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};

export default {
    BASE_URL,
    REQUEST_TIMEOUT,
    DEFAULT_HEADERS,
};