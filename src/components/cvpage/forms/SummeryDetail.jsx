import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CV_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import useGetCvById from "@/hooks/useGetCvById";
import { useEffect, useState } from "react";
import { updateSummery } from "@/redux/cvSlice";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";

const SummeryDetail = ({ onSuccess }) => {
  const params = useParams();
  const dispatch = useDispatch();
  const { singleCv } = useSelector((store) => store.cv);
  const [loading, setLoading] = useState(false);

  useGetCvById(params.id);

  const changeEventHandler = (e) => {
    const value = e.target.value;
    dispatch(updateSummery(value)); // Update Redux
    console.log("Summery in Detail:", singleCv?.cv?.personalDetails?.summery);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(
        `${CV_API_END_POINT}/update/${params.id}`,
        { summery: singleCv.cv.personalDetails.summery }, // Use Redux state
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        onSuccess();
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Ensures that summery is initialized in the Redux store when component mounts
    if (singleCv?.cv?.personalDetails?.summery === undefined) {
      dispatch(updateSummery(""));
    }
  }, [singleCv?.cv?.personalDetails?.summery, dispatch]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-slate-700 border-t-4 dark:bg-slate-600">
      <h2 className="font-bold text-lg">Summary Detail</h2>
      <p>Add your summary detail here</p>
      <form className="mt-6" onSubmit={submitHandler}>
        <div className="flex justify-between items-end">
          <Label htmlFor="summery">Add Summary</Label>
        </div>
        <div className="mt-5">
          <EditorProvider>
            <Editor
              name="summery"
              value={singleCv?.cv?.personalDetails?.summery || ""}
              onChange={changeEventHandler}
            >
              <Toolbar>
                <BtnBold />
                <BtnItalic />
                <BtnUnderline />
                <BtnStrikeThrough />
                <Separator />
                <BtnNumberedList />
                <Separator />
                <BtnLink />
              </Toolbar>
            </Editor>
          </EditorProvider>
        </div>
        <div>
          <Button className="mt-5" type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SummeryDetail;
