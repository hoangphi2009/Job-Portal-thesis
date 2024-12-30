import { useSelector } from 'react-redux';
import LatestJobCards from './LatestJobCards';

const OtherJobCards = () => {
    const { allJobs } = useSelector((stote) => stote.job);
  return (
    <div className="my-10">
      <h1 className="text-2xl font-medium text-red-500 dark:text-white">Other Jobs</h1>
      <div className="grid grid-cols-4 gap-4 my-5">
        {allJobs.length === 0 ? (
          <span className="text-gray-500 dark:text-gray-400">
            NO JOBS AVAILABLE
          </span>
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
}

export default OtherJobCards