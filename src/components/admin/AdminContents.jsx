import { JOB_API_END_POINT, USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { Briefcase, Building2, NotepadText, User2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AdminContents = () => {
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [ setError] = useState("");
  const { companies, singleCompany } = useSelector((store) => store.company);
  const allCompanies = [...companies, singleCompany];
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
  const getAllJobs = async () => {
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/gets`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res?.data?.success) {
        setJobs(res.data.jobs);
      } else {
        setError("Failed to fetch users");
      }
    } catch (error) {
      console.error(error);
      setError(error.message || "An error occurred while fetching users");
    }
  };
  useEffect(() => {
    getAllJobs();
  }, []);
  return (
    <div className="p-4 grid grid-cols-4 gap-4">
      <div className="bg-gradient-to-br from-red-400 to-red-500 text-white rounded-lg shadow-lg flex flex-col items-center justify-center py-4 px-2">
        <div className="flex items-center justify-between w-full px-4">
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold">{users.length}</span>
            <span className="text-xl">Users</span>
          </div>
          <User2Icon className="h-10 w-10 text-white" />
        </div>
        <Link to="/admin/users">
          <Button className="mt-3 bg-white text-red-500 hover:bg-pink-200 rounded px-6 py-2 text-sm shadow-lg font-medium">
            Show Users
          </Button>
        </Link>
      </div>
      <div className="bg-gradient-to-br from-green-400 to-green-500 text-white rounded-lg shadow-lg flex flex-col items-center justify-center py-4 px-2">
        <div className="flex items-center justify-between w-full px-4">
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold">{jobs.length}</span>
            <span className="text-xl">Jobs</span>
          </div>
          <Briefcase className="h-10 w-10 text-white" />
        </div>
        <Link to="/admin/jobs">
          <Button className="mt-3 bg-white text-green-500 hover:bg-pink-200 rounded px-6 py-2 text-sm shadow-lg font-medium">
            Show Jobs
          </Button>
        </Link>
      </div>
      <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 text-white rounded-lg shadow-lg flex flex-col items-center justify-center py-4 px-2">
        <div className="flex items-center justify-between w-full px-4">
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold">{allCompanies.length}</span>
            <span className="text-xl">Companies</span>
          </div>
          <Building2 className="h-10 w-10 text-white" />
        </div>
        <Link to="/admin/companies">
          <Button className="mt-3 bg-white text-yellow-500 hover:bg-pink-200 rounded px-6 py-2 text-sm shadow-lg font-medium">
            Show Companies
          </Button>
        </Link>
      </div>
      <div className="bg-gradient-to-br from-blue-400 to-blue-500 text-white rounded-lg shadow-lg flex flex-col items-center justify-center py-4 px-2">
        <div className="flex items-center justify-between w-full px-4">
          <div className="flex flex-col items-center gap-1">
            <span className="text-3xl font-bold">5</span>
            <span className="text-xl">Resumes</span>
          </div>
          <NotepadText className="h-10 w-10 text-white" />
        </div>
        <Link to="/admin/resumes">
          <Button className="mt-3 bg-white text-blue-500 hover:bg-pink-200 rounded px-6 py-2 text-sm shadow-lg font-medium">
            Show Resumes
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AdminContents;
