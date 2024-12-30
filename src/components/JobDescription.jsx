import { useParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import OtherJobCards from "./OtherJobCards";

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  // Track application status
  const [isApplied, setIsApplied] = useState(false);

  // Fetch job details and set application status
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          const jobData = res.data.job;
          dispatch(setSingleJob(jobData));

          // Set `isApplied` based on current user's application status
          const userHasApplied = jobData.applications.some(
            (application) => application.applicant === user?._id
          );
          setIsApplied(userHasApplied);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  // Handle job application
  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl mx-auto">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className={"text-blue-700 font-bold "} variant="ghost">
              Positions: {singleJob?.position}
            </Badge>
            <Badge className={"text-[red] font-bold "} variant="ghost">
              Time: {singleJob?.jobType}
            </Badge>
            <Badge className={"text-[#df3fca] font-bold "} variant="ghost">
              Salary: {singleJob?.salary}
            </Badge>
          </div>
        </div>

        <Button
          disabled={isApplied}
          onClick={!isApplied ? applyJobHandler : null}
          className={`rounded-lg text-white ${
            isApplied
              ? "bg-black cursor-not-allowed"
              : "bg-[#f43252] hover:bg-[#8beba9]"
          }`}
          variant="outline"
        >
          {isApplied ? "Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-gray-300 my-5 font-bold py-4">
        {singleJob?.description}
      </h1>
      <div className="my-4">
        <h1 className="font-bold my-1">
          Role:{" "}
          <span className="text-gray-800 pl-4 font-normal dark:text-white ">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:{" "}
          <span className="text-gray-800 pl-4 font-normal dark:text-white">
            {singleJob?.location}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Description:{" "}
          <span className="text-gray-800 pl-4 font-normal dark:text-white ">
            {singleJob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:{" "}
          <span className="text-gray-800 pl-4 font-normal dark:text-white ">
            {singleJob?.experience}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:{" "}
          <span className="text-gray-800 pl-4 font-normal dark:text-white ">
            {singleJob?.salary}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:{" "}
          <span className="text-gray-800 pl-4 font-normal dark:text-white ">
            {singleJob?.applications?.length}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:{" "}
          <span className="text-gray-800 pl-4 font-normal dark:text-white ">
            {singleJob?.createdAt.split("T")[0]}
          </span>
        </h1>
      </div>
      <div>
        <OtherJobCards />
      </div>
    </div>
  );
};

export default JobDescription;
