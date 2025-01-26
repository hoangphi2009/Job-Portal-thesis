import { useDispatch, useSelector } from "react-redux";
import Job from "./Job";
import Footer from "./shared/Footer";
import Navbar from "./shared/Navbar";
import { useEffect } from "react";
import { motion } from "framer-motion";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { setSearchedQuery } from "@/redux/jobSlice";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, [dispatch]);

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-gray-200 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="font-bold text-xl my-10 sticky top-0 z-50 ">
          Search Results ({allJobs.length})
        </h1>
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {allJobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default Browse;
