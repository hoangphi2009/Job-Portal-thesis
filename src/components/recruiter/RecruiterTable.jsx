import  { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Delete, Edit2, Eye, MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { JOB_API_END_POINT } from "@/utils/constant";
import DeleteJobDialog from "./DeleteJobDialog";

const RecruiterTable = () => {
  const { allRecruiterJob = [], searchJobByText } = useSelector(
    (store) => store.job
  );
  const [searchJobs, setSearchJobs] = useState([]);
  const [open, setOpen] = useState(false);
  const [jobIdToDelete, setJobIdToDelete] = useState(null);

  useEffect(() => {
    const searchedCompany = allRecruiterJob.filter((job) =>
      job?.title?.toLowerCase().includes(searchJobByText?.toLowerCase() || "")
    );
    console.log("Filtered jobs:", searchedCompany);
    setSearchJobs(searchedCompany);
  }, [searchJobByText, allRecruiterJob]);

  const navigate = useNavigate();

  const handleOpenDialog = (jobId) => {
    setJobIdToDelete(jobId);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setJobIdToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      setOpen(false);
      axios.defaults.withCredentials = true;
      const res = await axios.delete(
        `${JOB_API_END_POINT}/delete/${jobIdToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message || "Job deleted successfully!");
        setSearchJobs((prevJobs) =>
          prevJobs.filter((job) => job._id !== jobIdToDelete)
        );
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while deleting the job."
      );
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {searchJobs.map((job) => {
            console.log("Job Object:", job);
            return (
              <TableRow key={job._id}>
                <TableCell>{job.title || "N/A"}</TableCell>
                <TableCell>{job.description || "N/A"}</TableCell>
                <TableCell>{job.salary ? `$${job.salary}` : "N/A"}</TableCell>
                <TableCell>{job.location || "N/A"}</TableCell>
                <TableCell>{job.createdAt?.split("T")[0] || "N/A"}</TableCell>
                <TableCell>{job.company ? job.company.name : "N/A"}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button>
                        <MoreHorizontal />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div className="flex items-center gap-2 w-fit cursor-pointer">
                        <Edit2 className="w-4 h-4 mr-2" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/recruiter/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer mt-2"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                      <div
                        onClick={() => handleOpenDialog(job._id)}
                        className="flex items-center gap-2 w-fit cursor-pointer mt-2"
                      >
                        <Delete className="w-4 " />
                        <span>Delete</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <DeleteJobDialog
        open={open}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default RecruiterTable;
