import { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/jobSlice";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    if (!query.trim()) {
      alert("Please enter a job title to search.");
      return;
    }
    dispatch(setSearchedQuery(query.trim()));
    console.log("Query dispatched:", query);
    navigate("/browse");
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 text-center">
      <div className="flex flex-col gap-5 my-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold">
          Search, Apply & <br />
          Get Your <span className="text-[#6A36C2]">Dream Jobs</span>
        </h1>
        <p className="text-lg">
          Job Portal is a platform where you can find your dream jobs. You can
          apply for jobs and get your dream job.
        </p>
        <div className="flex w-full md:w-[60%] lg:w-[40%] shadow-lg  pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Search Your Job"
            onChange={(e) => setQuery(e.target.value)}
            className="w-full py-2 pl-4 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#F83002] dark:bg-gray-800 dark:text-white dark:placeholder-gray-500 dark:border-gray-600"
          />
          <Button
            type="submit"
            onClick={searchJobHandler}
            title="Search for jobs"
            className="rounded-r-full bg-[#F83002] hover:bg-[#3874c3] focus:ring-2 focus:ring-offset-2 focus:ring-[#F83002]"
          >
            <Search className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
