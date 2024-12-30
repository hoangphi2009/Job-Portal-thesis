import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetCvById from "@/hooks/useGetCvById";
import { CV_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import { toast } from "sonner";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";


const PersonalDetail = ({ onSuccess }) => {
  const params = useParams(); // Get the CV ID from the URL
  useGetCvById(params.id); // Get CV data using the custom hook with `params.id`

  const [input, setInput] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    address: "",
    email: "",
    phone: "", // Renamed from phoneNumber to phone
  });

  const { singleCv } = useSelector((store) => store.cv);
 // Accessing CV data from Redux

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      const res = await axios.put(
        `${CV_API_END_POINT}/update/${params.id}`,
        // formData,
        input,
        {
          headers: {
            "Content-Type": "application/json", // Correct header for file upload
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
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (singleCv) {
      setInput({
        firstName: singleCv.firstName || "",
        lastName: singleCv.lastName || "",
        jobTitle: singleCv.jobTitle || "",
        address: singleCv.address || "",
        email: singleCv.email || "",
        phone: singleCv.phone || "", 
      });
    }
  }, [singleCv]);

  return (
    <div  >
      <h2 className="font-bold text-lg">Personal Detail</h2>
      <p>Started with basic information about yourself</p>
      <form onSubmit={submitHandler}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <Label className="text-sm mx-2">First Name</Label>
            <Input
              type="text"
              required
              placeholder="First Name"
              name="firstName"
              value={input.firstName}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label className="text-sm mx-2">Last Name</Label>
            <Input
              type="text"
              required
              placeholder="Last Name"
              name="lastName"
              value={input.lastName}
              onChange={changeEventHandler}
            />
          </div>
          <div className="col-span-2">
            <Label className="text-sm mx-2">Job Title</Label>
            <Input
              type="text"
              required
              placeholder="Job Title"
              name="jobTitle"
              value={input.jobTitle}
              onChange={changeEventHandler}
            />
          </div>
          <div className="col-span-2">
            <Label className="text-sm mx-2">Address</Label>
            <Input
              type="text"
              required
              placeholder="Your Address"
              name="address"
              value={input.address}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label className="text-sm mx-2">Phone Number</Label>
            <Input
              type="text"
              required
              placeholder="Phone Number"
              name="phone" // Changed from phoneNumber to phone
              value={input.phone}
              onChange={changeEventHandler}
            />
          </div>
          <div>
            <Label className="text-sm mx-2">Email</Label>
            <Input
              type="email"
              required
              placeholder="Type your Email"
              name="email"
              value={input.email}
              onChange={changeEventHandler}
            />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          {loading ? (
            <Button>
              <Loader2 />
              Please Waiting...
            </Button>
          ) : (
            <Button className="bg-red-500 hover:bg-green-500" type="submit">
              Submit
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PersonalDetail;
