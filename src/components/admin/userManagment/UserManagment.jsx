import { useEffect, useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import AdminLeftBar from "../AdminLeftbar";
import { motion } from "framer-motion";
import User from "./User";
import { Input } from "@/components/ui/input";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/users`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res?.data?.success) {
        setUsers(res.data.users);
      } else {
        setError("Failed to fetch users");
      }
    } catch (error) {
      console.error(error);
      setError(error.message || "An error occurred while fetching users");
    }
  };

  const handleRoleChange = (event) => {
    setFilterRole(event.target.value);
  };
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };
  const filteredUsers = users.filter((user) => {
    return (
      (filterRole ? user.role === filterRole : true) &&
      (user.fullname.toLowerCase().includes(searchQuery) ||
        user.email.toLowerCase().includes(searchQuery))
    );
  });


  return (
    <div className="flex min-h-screen">
      <AdminLeftBar />
      <div className="w-4/5 p-4">
        <div>
          <div className="flex items-center justify-between my-5">
            <Input
              className="w-full mr-2"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <select
              className="p-2 rounded border"
              value={filterRole}
              onChange={handleRoleChange}
            >
              <option value="">Choose role</option>
              <option value="student">Student</option>
              <option value="recruiter">Recruiter</option>
            </select>
          </div>
        </div>
        <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
          <div className="grid grid-cols-3 gap-4">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  key={user._id}
                >
                  <User user={user} />
                </motion.div>
              ))
            ) : (
              <p className="col-span-3 text-center text-gray-600">
                No users found.
              </p>
            )}
            {error && (
              <p className="col-span-3 text-center text-red-500">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
