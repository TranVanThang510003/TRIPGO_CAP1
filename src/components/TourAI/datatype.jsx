import { FaUser, FaUserFriends, FaUsers } from "react-icons/fa"; // Import FontAwesome icons

const datatype = [
  {
    id: 1,
    name: "Cá nhân", // Individual
    icon: <FaUser />,
  },
  {
    id: 2,
    name: "Cặp đôi", // Couple
    icon: <FaUserFriends />,
  },
  {
    id: 3,
    name: "Nhóm", // Group
    icon: <FaUsers />,
  },
];

export default datatype;
