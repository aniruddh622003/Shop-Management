import API from "../helpers/API";

let AuthService = {};

AuthService.login = async (data) => {
  const res = await API.post(`login`, data);
  return await res.data;
};

AuthService.test = async (data) => {
  const res = await API.post(`test`, data);
  return await res.data;
};

export default AuthService;
