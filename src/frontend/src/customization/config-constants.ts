export const BASENAME = "/nsfgpt/agent-web";
export const PORT = 3000;
export const PROXY_TARGET = "http://127.0.0.1:7860";
export const API_ROUTES = ["^/nsfgpt/agent/manager/api/v1/", "/nsfgpt/agent/manager/health"];
export const BASE_URL_API = "/nsfgpt/agent/manager/api/v1/";
export const HEALTH_CHECK_URL = "/nsfgpt/agent/manager/health_check";
export const DOCS_LINK = "https://docs.langflow.org";

export default {
  DOCS_LINK,
  BASENAME,
  PORT,
  PROXY_TARGET,
  API_ROUTES,
  BASE_URL_API,
  HEALTH_CHECK_URL,
};
