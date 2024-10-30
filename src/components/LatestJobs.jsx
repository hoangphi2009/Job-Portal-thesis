import LatestJobCards from "./LatestJobCards";

const ramdomJobs = [1, 2, 3, 4, 5, 6, 7, 8];
const LatestJobs = () => {
  return (
    <div className="max-w-7xl mx-auto my-20">
      <h1 className="text-4xl font-bold">Jobs Opening</h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {ramdomJobs.slice(0, 6).map((job) => (
          <LatestJobCards key={job} />
        ))}
      </div>
    </div>
  );
};

export default LatestJobs;
