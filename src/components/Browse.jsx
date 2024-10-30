import Job from "./Job";
import Navbar from "./shared/Navbar";

const ramdomJobs = [1, 2, 3, 4, 5];
const Browse = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10">Search Results ({ramdomJobs.length})</h1>
        <div className="grid grid-cols-3 gap-4 ">
          {ramdomJobs.map((item, index) => {
            return <Job key={index} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Browse;
