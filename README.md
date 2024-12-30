# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RecruiterTable = () => {
  const { allRecruiterJob = [], searchJobByText } = useSelector(
    (store) => store.job
  );
  const [searchJobs, setSearchJobs] = useState([]);

  useEffect(() => {
    
    const searchedCompany = allRecruiterJob.filter((job) =>
      job?.title?.toLowerCase().includes(searchJobByText?.toLowerCase() || "")
    );
    console.log("Filtered jobs:", searchedCompany); // Debugging
    setSearchJobs(searchedCompany);
  }, [searchJobByText, allRecruiterJob]);

  const navigate = useNavigate();

  return (
    <div>
      <Table>
        <TableCaption>A list of posted Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Company</TableHead> {/* Added Company Column */}
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {searchJobs.map((job) => {
            console.log("Job Object:", job); // Debugging
            return (
              <TableRow key={job._id}>
                <TableCell>{job.title || "N/A"}</TableCell>
                <TableCell>{job.description || "N/A"}</TableCell>
                <TableCell>{job.salary ? `$${job.salary}` : "N/A"}</TableCell>
                <TableCell>{job.location || "N/A"}</TableCell>
                <TableCell>{job.createdAt?.split("T")[0] || "N/A"}</TableCell>
                {/* Displaying Company Name or "N/A" if it's null */}
                <TableCell>{job.company ? job.company.name : "N/A"}</TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button>
                        <MoreHorizontal />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div
                        // onClick={() => navigate(`/admin/jobs/${job._id}`)} // No Function updated jobs
                        className="flex items-center gap-2 w-fit cursor-pointer"
                      >
                        <Edit2 className="w-4 h-4 mr-2" />
                        <span>Edit</span>
                      </div>
                      <div
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                        className="flex items-center gap-2 w-fit cursor-pointer mt-2"
                      >
                        <Eye className="w-4" />
                        <span>Applicants</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default RecruiterTable;
