import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { JOB_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const JobDescriptionByAdmin = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          const jobData = res.data.job;
          dispatch(setSingleJob(jobData));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);
  return (
    <div>
      <div>
        <div className="max-w-7xl mx-auto my-10">
          <div className="flex items-center justify-between">
            <div>
              <div className="my-4">
                <Button
                  className="mb-2 bg-red-600 text-white rounded-xl hover:bg-green-600"
                  onClick={() => navigate("/admin/jobs")}
                >
                  <ArrowLeft />
                  Previous
                </Button>
              </div>
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
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionByAdmin;
