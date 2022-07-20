import API from "../helpers/API";

let VendorService = {};

VendorService.getAll = async () => {
  const res = await API.get(`vendor`);
  return await res.data;
};
export default VendorService;
