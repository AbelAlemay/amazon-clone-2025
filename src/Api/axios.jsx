import axios from "axios";

const instance = axios.create({
  // baseURL: "http://127.0.0.1:5001/clone-2025-4d69f/us-central1/api",
  baseURL: "https://api-vs3j34acfq-uc.a.run.app",
});

export { instance };
