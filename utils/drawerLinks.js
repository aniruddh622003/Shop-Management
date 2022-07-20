import { BsPerson } from "react-icons/bs";
import { FaPeopleCarry } from "react-icons/fa";

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
