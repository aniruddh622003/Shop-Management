import API from "../helpers/API";

let UserService = {};

UserService.getAll = async () => {
  const res = await API.get(`user`);
  return await res.data;
};

export default UserService;
