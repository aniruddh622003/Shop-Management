import API from "../helpers/API";

let VendorService = {};

VendorService.getAll = async () => {
  const res = await API.get(`vendor`);
  return await res.data;
};
VendorService.create = async (data) => {
  const res = await API.post(`vendor`, data);
  return await res.data;
};

export default VendorService;
