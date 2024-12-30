import PropTypes from "prop-types";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import NoUser from "../assets/nouser.png";
import { Bookmark } from "lucide-react";
const LatestJobCards = ({ job, company }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.5 }}
      onClick={() => navigate(`/description/${job._id}`)}
      className="p-5 rounded-md shadow-xl bg-white border border-gray-300 cursor-pointer dark:bg-gray-800 dark:border-gray-700"
    >
      <div>
        <div className="flex items-center justify-between">
          {company?.logo ? (
            <img
              src={company?.logo}
              className="w-16 h-16 rounded-2xl"
              alt="Company Logo"
            />
          ) : (
            <img
              src={NoUser}
              className="w-16 h-16 rounded-2xl"
              alt="No company logo available"
            />
          )}
          <Bookmark />
        </div>
        <h1 className="font-medium text-lg dark:text-white">
          {job?.company?.name}
        </h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {job?.location}
        </p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2 dark:text-white">{job?.title}</h1>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {job?.description}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge
          className="text-blue-700 font-bold dark:text-blue-400"
          variant="ghost"
        >
          Positions: {job?.position}
        </Badge>
        <Badge
          className="text-red-600 font-bold dark:text-red-400"
          variant="ghost"
        >
          Time: {job?.jobType}
        </Badge>
        <Badge
          className="text-pink-500 font-bold dark:text-pink-300"
          variant="ghost"
        >
          Salary: {job?.salary}
        </Badge>
      </div>
    </motion.div>
  );
};

LatestJobCards.propTypes = {
  job: PropTypes.shape({
    _id: PropTypes.string.isRequired, // Add _id validation
    company: PropTypes.shape({
      name: PropTypes.string,
    }),
    
    location: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    position: PropTypes.string,
    jobType: PropTypes.string,
    salary: PropTypes.string,

  }),
};

export default LatestJobCards;
