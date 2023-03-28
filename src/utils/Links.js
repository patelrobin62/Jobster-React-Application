import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

export const Links = [
  {
    id: 1,
    text: "Stats",
    path: "/dashboard",
    icon: <IoBarChartSharp/>,
  },
  {
    id: 2,
    text: "All Jobs",
    path: "/dashboard/allJobs",
    icon: <MdQueryStats/>,
  },
  {
    id: 3,
    text: "Add Jobs",
    path: "/dashboard/addJob",
    icon: <FaWpforms/>,
  },
  {
    id: 4,
    text: "Profile",
    path: "/dashboard/profile",
    icon: <ImProfile/>,
  },
];
