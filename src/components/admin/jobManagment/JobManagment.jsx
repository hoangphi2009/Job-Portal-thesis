
import AdminLeftBar from "../AdminLeftbar";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import JobByAdmin from "./JobByAdmin";
import { Input } from "@/components/ui/input";
import { CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";

const JobManagment = () => {

  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
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
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };
  const handleDeleteJob = (jobId) => {
    setJobs((currentJobs) => currentJobs.filter((job) => job._id !== jobId));
  };

  const filteredJobs = jobs.filter((job) => {
    return (
      (job.title.toLowerCase().includes(searchQuery) ||
        job.description.toLowerCase().includes(searchQuery))
    );
  });
  return (
    <div className="flex min-h-screen">
      <AdminLeftBar />
      <div className="w-4/5 p-4">
        <div>
          <div className="flex items-center justify-between my-5">
            <Input
              className="w-full borde"
              placeholder="Search..."
              onChange={handleSearchChange}
            />
            <Button variant="outline">
              <CircleX className="h-16 w-16" />
            </Button>
            <Button onClick={() => navigate("/admin/jobs/create")}>
              New Jobs
            </Button>
          </div>
        </div>
        {filteredJobs.length === 0 ? (
          <span>Jobs Not found</span>
        ) : (
          <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
            <div className="grid grid-cols-3 gap-4">
              {filteredJobs.map((job) => (
                <motion.div
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  key={job?._id}
                >
                  <JobByAdmin
                    key={job?._id}
                    job={job}
                    onDelete={handleDeleteJob}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobManagment;
