let service = {};

if (process.env.BACKEND_BASE_URL) {
  service.gateway = process.env.BACKEND_BASE_URL;
} else if (process.env.BACKEND_BASE_URL === "production") {
  service.gateway = "";
} else if (process.env.BACKEND_BASE_URL === "uat") {
  service.gateway = "";
} else if (process.env.BACKEND_BASE_URL === "staging") {
  service.gateway = "";
} else {
  service.gateway = "http://localhost:3031/api/v1";
}

export default service;
