export default {
  isProduction: process.env.ENV === 'production',
  isDevelopment: process.env.ENV === 'development',
  backendUri: process.env.VUE_APP_BACKEND,
};
