import { flatten } from "utils/flattenObject";
import API from "../helpers/API";

let TransactionService = {};

TransactionService.getAllExpenses = async () => {
  const res = await API.get(`transactions/getExpenses`);
  res.data.forEach((ele, id) => {
    res.data[id] = flatten(ele);
  });
  return await res.data;
};

export default TransactionService;
