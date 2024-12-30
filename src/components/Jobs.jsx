import { useSelector } from "react-redux";
import FilterCard from "./FilterCard ";
import Job from "./Job";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Jobs = () => {
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);

  useEffect(() => {
    if (searchedQuery) {
      const query = (searchedQuery || "").toString().toLowerCase(); // Ensure searchedQuery is a string

      const filteredJobs = allJobs.filter((job) => {
        
        const salaryMatch = (salary) => {
          if (isNaN(salary)) return false;
          return salary.toString().includes(query); 
        };

        return (
          job.title.toLowerCase().includes(query) ||
          job.description.toLowerCase().includes(query) ||
          job.location.toLowerCase().includes(query) ||
          job.jobType.toLowerCase().includes(query) ||
          salaryMatch(job.salary)
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs); // Reset filter when no search query is present
    }
  }, [allJobs, searchedQuery]);
  return (
    <div>
      <div className="sticky top-0 z-50 border-b bg-gray-200 shadow-md">
        <Navbar />
      </div>
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCard />
          </div>
          {filterJobs.length === 0 ? (
            <span>Jobs Not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-3 gap-4">
                {filterJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    key={job?._id}
                  >
                    <Job key={job?._id} job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;
