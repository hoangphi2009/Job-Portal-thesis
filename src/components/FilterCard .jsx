import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Button } from "./ui/button";

const FilterCard = () => {
  // const companies = useSelector((store) => store.company.companies);
  const { allJobs } = useSelector((store) => store.job);
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
  };

  const resetFilters = () => {
    setSelectedValue(""); 
    dispatch(setSearchedQuery("")); 
  };

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  
  const locations = [...new Set(allJobs.flatMap((job) => job.location))];
  const titles = [...new Set(allJobs.flatMap((job) => job.title || []))];
  const salaries = [
    ...new Set(allJobs.flatMap((company) => company.salary || [])),
  ];
  const jobTypes = [...new Set(allJobs.flatMap((job) => job.jobType || []))];

  const filterSections = [
    { category: "Location", options: locations },
    { category: "Name of Job", options: titles },
    { category: "Salary", options: salaries },
    { category: "Type of Job", options: jobTypes },
  ];

  return (
    <div className="w-full max-w-2xl bg-white p-5 rounded-md dark:bg-gray-800">
      <h1 className="font-bold text-lg text-black dark:text-white">
        Filter Jobs
      </h1>
      <hr className="my-4 border-gray-700 dark:border-gray-400" />
      {filterSections.map((section, index) => (
        <div key={index}>
          <h2 className="font-bold text-md text-black dark:text-white">
            {section.category}
          </h2>
          <RadioGroup value={selectedValue} onValueChange={changeHandler}>
            {section.options.map((option, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div key={itemId} className="flex items-center space-x-2 my-2">
                  <RadioGroupItem
                    value={option}
                    id={itemId}
                    className="text-red-500"
                  />
                  <Label
                    htmlFor={itemId}
                    className="text-black dark:text-white"
                  >
                    {option}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
        </div>
      ))}
      <Button
        onClick={resetFilters}
        className="mt-4 w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Reset
      </Button>
    </div>
  );
};

export default FilterCard;
