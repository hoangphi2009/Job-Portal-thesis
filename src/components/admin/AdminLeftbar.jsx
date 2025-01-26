import { setUser } from "@/redux/authSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import { Button } from "@mui/material";
import axios from "axios";
import {
  BriefcaseBusiness,
  Building2,
  FileText,
  LogOut,
  UserRoundPen,
} from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AdminLeftBar = () => {
  const [isOpen, setIsOpen] = useState({
    dashboard: false,
    userManagement: false,
    companyManagement: false,
    jobManagement: false,
    resumeManagement: false,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [hoverSection, setHoverSection] = useState("");
  const toggleSection = (section) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [section]: !prevState[section],
    }));
  };
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
  return (
    <div className="w-1/5 p-4 bg-gray-200 mx-2">
      <div className="mb-4 mx-auto w-1/2">
        <Link to="/admin">
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Job
            <span className="text-[#F83002] dark:text-[#FF5733]">Portal</span>
          </h1>
        </Link>
      </div>
      <div
        onMouseEnter={() => setHoverSection("user")}
        onMouseLeave={() => setHoverSection("")}
        onClick={() => toggleSection("user")}
        className="text-lg font-bold mt-10 mb-4 cursor-pointer select-none transition duration-300 ease-in-out bg-white hover:bg-white rounded-md p-2"
      >
        <div className="flex items-center gap-2">
          <UserRoundPen color="green" />
          <h1 className="text-lg font-bold">User Management</h1>
        </div>

        {(isOpen.user || hoverSection === "user") && (
          <div className="mx-5 my-3">
            <ul className="space-y-2 mx-5 my-3 items-center gap-5 text-gray-800 dark:text-gray-200">
              <li>
                <Link
                  to="/admin/users"
                  className="text-base hover:text-red-600 text-green-800"
                >
                  Users Management
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/students"
                  className="text-base hover:text-red-600 text-green-800"
                >
                  Students Management
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/recruiters"
                  className="text-base hover:text-red-600 text-green-800"
                >
                  Recruiters Management
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>

      <div
        onMouseEnter={() => setHoverSection("job")}
        onMouseLeave={() => setHoverSection("")}
        onClick={() => toggleSection("job")}
        className="text-lg font-bold mb-4 mt-10 cursor-pointer select-none transition duration-300 bg-white ease-in-out hover:bg-white rounded-md p-2"
      >
        <div className="flex items-center gap-2">
          <BriefcaseBusiness color="red" />
          <h1 className="text-lg font-bold">Job Management</h1>
        </div>
        {(isOpen.job || hoverSection === "job") && (
          <div className="mx-5 my-3">
            <ul className="space-y-2 mx-5 my-3 items-center gap-5 text-gray-800 dark:text-gray-200">
              <li>
                <Link
                  to="/admin/jobs"
                  className="text-base hover:text-red-600 text-green-800"
                >
                  Jobs Management
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div
        onMouseEnter={() => setHoverSection("company")}
        onMouseLeave={() => setHoverSection("")}
        onClick={() => toggleSection("company")}
        className="text-lg font-bold mb-4 mt-10 cursor-pointer select-none transition duration-300 bg-white ease-in-out hover:bg-white rounded-md p-2"
      >
        <div className="flex items-center gap-2">
          <Building2 color="#02599c" />
          <h1 className="text-lg font-bold">Company Management</h1>
        </div>

        {(isOpen.company || hoverSection === "company") && (
          <div className="mx-5 my-3">
            <ul className="space-y-2 mx-5 my-3 items-center gap-5 text-gray-800 dark:text-gray-200">
              <li>
                <Link
                  to="/admin/companies"
                  className="text-base hover:text-red-600 text-green-800"
                >
                  Companys Management
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div
        onMouseEnter={() => setHoverSection("resume")}
        onMouseLeave={() => setHoverSection("")}
        onClick={() => toggleSection("resume")}
        className="text-lg font-bold mb-4 mt-10 cursor-pointer select-none transition duration-300 bg-white ease-in-out hover:bg-white rounded-md p-2"
      >
        <div className="flex items-center gap-2">
          <FileText color="#80820d" />
          <h1>Resume Management</h1>
        </div>

        {(isOpen.resume || hoverSection === "resume") && (
          <div className="mx-5 my-3">
            <ul className="space-y-2 mx-5 my-3 items-center gap-5 text-gray-800 dark:text-gray-200">
              <li>
                <Link
                  to="/admin/companies"
                  className="text-base hover:text-red-600 text-green-800"
                >
                  resumes Management
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="flex mt-10 w-fit border-2 border-gray-500 bg-white rounded-sm items-center gap-2 cursor-pointer">
        <LogOut className="ml-2" />
        <Button variant="link" onClick={logoutHandler}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default AdminLeftBar;
