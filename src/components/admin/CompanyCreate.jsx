import { useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import axios from "axios";
import { useState } from "react";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

const CompanyCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [companyName, setCompanyName] = useState("");

   const registerNewCompany = async () => {
     try {
       const res = await axios.post(
         `${COMPANY_API_END_POINT}/register`,
         { companyName },
         {
           headers: {
             "Content-Type": "application/json",
           },
           withCredentials: true,
         }
       );
       if (res?.data?.success) {
         dispatch(setSingleCompany(res.data.company));
         toast.success(res.data.message);
         const companyId = res?.data?.company?._id;
         navigate(`/admin/companies/${companyId}`);
       }
     } catch (error) {
       console.log(error);
       toast.error(error.response?.data?.message || "An error occurred");
     }
   };
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create Company
          </h1>
          <p className="text-gray-700 dark:text-gray-300">
            Create a new company
          </p>
        </div>
        <Label>Company Name</Label>
        <Input
          type="text"
          placeholder="Company Name"
          onChange={(e) => setCompanyName(e.target.value)}
          className="border border-gray-600 my-2"
        />
        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            className="bg-red-500 text-white"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button
            variant="outline"
            className="bg-[#030c06] hover:bg-[#6be68a] text-white"
            onClick={registerNewCompany}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CompanyCreate;
