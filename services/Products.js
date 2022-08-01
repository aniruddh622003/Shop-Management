import { flatten } from "utils/flattenObject";
import API from "../helpers/API";

let ProductService = {};

ProductService.getAll = async () => {
  const res = await API.get(`products`);
  res.data.forEach((ele, id) => {
    res.data[id] = flatten(ele);
  });
  return await res.data;
};
ProductService.create = async (data) => {
  const res = await API.post(`products`, data);
  return await res.data;
};

export default ProductService;
