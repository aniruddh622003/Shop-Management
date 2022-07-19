import API from "../helpers/API";

let UserService = {};

UserService.getAll = async () => {
  const res = await API.get(`user`);
  return await res.data;
};

UserService.create = async (data) => {
  const res = await API.post(`user`, data);
  return await res.data;
};

UserService.changeStatus = async ({ id, body }) => {
  const res = await API.post(`user/changeStatus/${id}`, body);
  return await res.data;
};

export default UserService;
