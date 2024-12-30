import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import NoUser from "../assets/nouser.png";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const now = new Date();
    const diff = now.getTime() - createdAt.getTime();
    const daysAgo = Math.floor(diff / (1000 * 60 * 60 * 24));
    return daysAgo;
  };

  return (
    <div className="p-5 rounded-md shadow-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
      <div className="flex items-center justify-between text-gray-700 dark:text-gray-400">
        <p className="text-sm">{daysAgoFunction(job?.createdAt)} days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage
              src={job?.company?.logo || NoUser}
              alt="Company Logo"
            />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg text-gray-800 dark:text-gray-200">
            {job?.company?.name}
          </h1>
          <p className="text-sm text-red-500">{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2 text-gray-800 dark:text-gray-200">
          {job?.title}
        </h1>
        <p className="text-sm text-gray-700 dark:text-gray-400">
          {job?.description}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge
          key="position"
          className="text-blue-700 dark:text-blue-400 font-bold"
          variant="ghost"
        >
          Positions: {job?.position}
        </Badge>
        <Badge
          key="jobType"
          className="text-red-500 dark:text-red-400 font-bold"
          variant="ghost"
        >
          Time: {job?.jobType}
        </Badge>
        <Badge
          key="salary"
          className="text-pink-500 dark:text-pink-400 font-bold"
          variant="ghost"
        >
          Salary: {job?.salary}
        </Badge>
      </div>
      <div className="flex items-center gap-4 mt-4 dark:text-white">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
        >
          Details
        </Button>
        <Button className="bg-pink-400 hover:bg-teal-400 dark:bg-teal-600 dark:hover:bg-teal-500 text-white">
          Save
        </Button>
      </div>
    </div>
  );
};

Job.propTypes = {
  job: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    company: PropTypes.shape({
      name: PropTypes.string,
      logo: PropTypes.string,
    }),
    location: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    position: PropTypes.number,
    jobType: PropTypes.string,
    salary: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

export default Job;
