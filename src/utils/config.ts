const DEV_ENDPOINT =
  "https://rzs6126mm7.execute-api.eu-central-1.amazonaws.com/dev";
const PROD_ENDPOINT =
  "https://rzs6126mm7.execute-api.eu-central-1.amazonaws.com/prod";

export const ENDPOINT =
  process.env.NODE_ENV === "production" ? PROD_ENDPOINT : DEV_ENDPOINT;