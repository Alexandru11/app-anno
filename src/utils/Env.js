export default {
  isProduction: process.env.NODE_ENV === 'production',
  isDevelopment: process.env.NODE_ENV === 'development',
  backendUri: !process.env.VUE_APP_PROD_BACKEND
    ? process.env.VUE_APP_DEV_BACKEND : process.env.VUE_APP_PROD_BACKEND,
};
