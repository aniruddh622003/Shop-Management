import { BsPerson } from "react-icons/bs";
import { FaPeopleCarry, FaStore } from "react-icons/fa";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { GiExpense } from "react-icons/gi";

export const transactionLinks = [
  {
    title: "Inventory",
    icon: <FaStore />,
    link: "/protected/products",
  },
  {
    title: "Expenses",
    icon: <GiExpense />,
    link: "/protected/expenses",
  },
];

export const manageLinks = [
  {
    title: "Users",
    icon: <BsPerson />,
    link: "/protected/user",
  },
  {
    title: "Vendors",
    icon: <FaPeopleCarry />,
    link: "/protected/vendor",
  },
];
