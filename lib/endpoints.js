const service = {};
service.gateway = process.env.BACKEND_BASE_URL

console.log("process.env=>", process.env.NODE_ENV, process.env.BACKEND_BASE_URL, service.gateway);

export default service;
