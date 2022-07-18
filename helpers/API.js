import axios from "axios";

const API = () => {
  const defaultOptions = {
    baseURL: "/api",
  };

  // Create instance
  let instance = axios.create(defaultOptions);

  instance.interceptors.request.use((config) => {
    const jwtToken = localStorage.getItem("shop_auth_key");

    if (jwtToken) {
      config.headers["Authorization"] = `Bearer ${jwtToken}`;
    }

    let tempParams = config.params;
    if (tempParams) {
      for (let key in tempParams) {
        if (!tempParams[key]) {
          delete tempParams[key];
        }
      }
      config.params = tempParams;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log("we are here", error);
      if (error.response.status === 401) {
        localStorage.removeItem("shop_auth_key");
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default API();
