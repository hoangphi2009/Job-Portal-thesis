import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import NoUser from "@/assets/nouser.png";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import DeleteJobDialog from "@/components/recruiter/DeleteJobDialog";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useState } from "react";

const JobByAdmin = ({ job, onDelete }) => {
  const navigate = useNavigate();
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const now = new Date();
    const diff = now.getTime() - createdAt.getTime();
    const daysAgo = Math.floor(diff / (1000 * 60 * 60 * 24));
    return daysAgo;
  };
  const [open, setOpen] = useState(false);
  const [jobIdToDelete, setJobIdToDelete] = useState(null);
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
        `${JOB_API_END_POINT}/delete/admin/${jobIdToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message || "Job deleted successfully!");
        onDelete(jobIdToDelete);
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
    <div className="p-5 rounded-md shadow-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between text-gray-700 dark:text-gray-400">
        <p className="text-sm">{daysAgoFunction(job?.createdAt)} days ago</p>
        <div>
          <Button
            onClick={() => handleOpenDialog(job._id)}
            variant="outline"
            className="rounded-full"
            size="icon"
          >
            <Trash2Icon />
          </Button>
        </div>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage
              src={job?.company?.logo || NoUser}
              alt="Company Logo"
            />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg text-gray-800 dark:text-gray-200">
            {job?.company?.name}
          </h1>
          <p className="text-sm text-red-500">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2 text-gray-800 dark:text-gray-200">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-700 dark:text-gray-400">
          {job?.description}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge
          key="position"
          className="text-blue-700 dark:text-blue-400 font-bold"
          variant="ghost"
        >
          Positions: {job?.position}
        </Badge>
        <Badge
          key="jobType"
          className="text-red-500 dark:text-red-400 font-bold"
          variant="ghost"
        >
          Time: {job?.jobType}
        </Badge>
        <Badge
          key="salary"
          className="text-pink-500 dark:text-pink-400 font-bold"
          variant="ghost"
        >
          Salary: {job?.salary}
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4 dark:text-white">
        <Button
          onClick={() => navigate(`/admin/description/${job?._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button
          className="  dark:bg-teal-600 dark:hover:bg-teal-500"
          variant="outline"
        >
          Edit Job
        </Button>
      </div>
      <DeleteJobDialog
        open={open}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default JobByAdmin;
