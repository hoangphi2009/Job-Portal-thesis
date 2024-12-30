import { useSelector } from "react-redux";
import LatestJobCards from "./LatestJobCards";
import { Flame } from "lucide-react";

const LatestJobs = () => {
  const { allJobs } = useSelector((stote) => stote.job);
  return (
    <div className="max-w-7xl mx-auto my-20">
      <div className="flex items-start justify-start">
        <Flame size={70} color="#b3194f" strokeWidth={1.75} />
        <h1 className="text-4xl font-bold dark:text-white mt-4 text-red-500">Jobs Opening</h1>
      </div>
      <div className="grid grid-cols-3 gap-4 my-5">
        {allJobs.length === 0 ? (
          <div>
            <span className="text-gray-500 dark:text-gray-400">
              NO JOBS AVAILABLE
            </span>
          </div>
        ) : (
          allJobs
            ?.slice(0, 6)
            .map((job) => (
              <LatestJobCards key={job._id} job={job} company={job.company} />
            ))
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
