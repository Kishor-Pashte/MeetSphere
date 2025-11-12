let IS_PROD = true;

const server = IS_PROD
  ? "https://meetsphere-4fdu.onrender.com"
  : "http://localhost:8000";

export default server;
