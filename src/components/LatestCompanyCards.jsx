
import NoUser from "../assets/nouser.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Bookmark } from "lucide-react";

const LatestCompanyCards = ({ company }) => {
//   const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 0.5 }}
      //   onClick={() => navigate(`/company/${company._id}`)}
      className="p-5 rounded-md shadow-xl bg-white border border-gray-300 cursor-pointer dark:bg-gray-800 dark:border-gray-700"
    >
      <div className="flex items-center justify-between mb-2">
        {company?.logo ? (
          <img
            src={company?.logo}
            className="w-14 h-14 rounded-2xl"
            alt="Company Logo"
          />
        ) : (
          <img
            src={NoUser}
            className="w-16 h-16 rounded-2xl"
            alt="No company logo available"
          />
        )}
        <button aria-label="Bookmark company" className="p-2">
          <Bookmark />
        </button>
      </div>
      <div>
        <h1 className="font-bold text-lg dark:text-white">{company?.name}</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {company?.location}
        </p>
      </div>
      <div>
        <a
          href={company?.website}
          className="font-medium text-base my-2 text-blue-600 hover:text-red-500 dark:text-white "
          target="_blank"
          rel="noopener noreferrer"
        >
          {company?.website}
        </a>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {company?.description}
        </p>
      </div>
    </motion.div>
  );
};

export default LatestCompanyCards;
