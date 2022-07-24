import { BsPerson } from "react-icons/bs";
import { FaPeopleCarry, FaStore } from "react-icons/fa";

export const inventoryLinks = [
  {
    title: "Products",
    icon: <FaStore />,
    link: "/protected/products",
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
