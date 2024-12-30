import { PlusSquare } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { setSingleCv } from "@/redux/cvSlice";
import axios from "axios";
import { CV_API_END_POINT } from "@/utils/constant";  


const CvCreate = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [cvTitle, setCvTitle] = useState(""); 
  const registerNewCv = async () => {
    if (!cvTitle.trim()) {
      // Basic validation to ensure a title is entered
      toast.error("Title is required.");
      return;
    }

    try {
      const res = await axios.post(
        `${CV_API_END_POINT}/register`,
        { title: cvTitle }, // Include the title in the request body
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res?.data?.success) {
        dispatch(setSingleCv(res.data.cv));
        toast.success(res.data.message);
        navigate(`/cv/${res.data.cv._id}`);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred during registration."
      );
    }
  };

  return (
    <div>
      <div
        className="p-14 py-24 border items-center flex justify-center bg-gray-200 
      rounded-lg h-[280px] w-[270px] hover:scale-110 transition-all hover:shadow-md cursor-pointer border-dashed"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare className="dark:bg-slate-500" />
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create new Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your resume</p>
              <Input className="w-full my-3" placeholder="Resume Title" onChange={(e) => setCvTitle(e.target.value)} />
            </DialogDescription>
            <div className="flex justify-end space-x-2 gap-5">
              <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button onClick={registerNewCv}>Create</Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      
    </div>

  );
};

export default CvCreate;
