import { useEffect, useState } from "react";
import AdminLeftBar from "../AdminLeftbar";
import { USER_API_END_POINT } from "@/utils/constant";
import { motion } from "framer-motion";
import Student from "./Student";
import axios from "axios";
import { Input } from "@/components/ui/input";

const StudentManagment = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const getAllStudents = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/students/admin`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res?.data?.success) {
        setStudents(res.data.students);
      } else {
        setError("Failed to fetch users");
      }
    } catch (error) {
      console.error(error);
      setError(error.message || "An error occurred while fetching users");
    }
  };
  useEffect(() => {
    getAllStudents();
  }, []);
  const filteredStudents = students.filter((student) => {
    return (
      (student.fullname.toLowerCase().includes(searchQuery) ||
        student.email.toLowerCase().includes(searchQuery))
    );
  });
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };
  return (
    <div>
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
                  </div>
                </div>
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            <div className="grid grid-cols-3 gap-4">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    key={student._id}
                  >
                    <Student student={student} />
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
    </div>
  );
};

export default StudentManagment;
