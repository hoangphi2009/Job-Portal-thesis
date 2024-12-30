import { BookMarkedIcon, MoreHorizontal, Trash } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import useGetCvById from "@/hooks/useGetCvById";
import { useDispatch, useSelector } from "react-redux";
import DeleteCvDialog from "./DeleteCvDialog";
import axios from "axios";
import { CV_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useState } from "react";
import { removeCv, setSingleCv } from "@/redux/cvSlice";

const CvCard = ({ cv }) => {
  const params = useParams();
  useGetCvById(params.cvId);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [CvIdToDelete, setCvIdToDelete] = useState(null);
  const handleOpenDialog = (cvId) => {
    setCvIdToDelete(cvId);
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
    setCvIdToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      setOpen(false);
      axios.defaults.withCredentials = true;
      const res = await axios.delete(
        `${CV_API_END_POINT}/delete/${CvIdToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message || "CV deleted successfully!");
        dispatch(removeCv(CvIdToDelete));
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "An error occurred while deleting the CV."
      );
      console.error("Error deleting company:", error);
    }
  };
  return (
    <div className="relative">
      <div onClick={() => navigate(`/cv/${cv._id}`)}>
        <div className="p-14 bg-blue-200 flex items-center justify-center h-[280px] rounded-md w-[270px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed dark:bg-green-300">
          <h3 className="text-xl dark:text-black">
            {cv?.personalDetails?.jobTitle}
          </h3>
          <BookMarkedIcon className="dark:text-black" />
        </div>
      </div>
      <h2 className="font-bold text-lg my-5 items-center justify-center flex dark:text-white">
        {cv.title}
      </h2>

      {/* Popover for delete button */}
      <Popover>
        <PopoverTrigger>
          <div onClick={() => handleOpenDialog(cv._id)}>
            <Trash className="absolute top-3 right-3 cursor-pointer text-red-600" />
          </div>
        </PopoverTrigger>
      </Popover>
      <DeleteCvDialog
        open={open}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default CvCard;
