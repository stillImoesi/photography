export const ENDPOINT =
  process.env.NODE_ENV === "production" ? process.env.PROD_ENDPOINT : process.env.DEV_ENDPOINT;