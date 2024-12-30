import { useSelector } from "react-redux";
import LatestCompanyCards from "./LatestCompanyCards";
import { Sparkles } from "lucide-react";

const LatestCompanies = () => {
  const { companies } = useSelector((store) => store.company);
  return (
    <div className="max-w-7xl mx-auto my-20">
      <div className="flex items-start justify-start">
        <Sparkles size={70} color="#ffa200" strokeWidth={1.5} />
        <h1 className="text-4xl font-bold text-orange-500 dark:text-white mt-5 ml-2">
          Companies Opening
        </h1>
      </div>
      <div className="grid grid-cols-4 gap-4 my-5">
        {companies.length === 0 ? (
          <span className="text-gray-500 dark:text-gray-400">
            NO COMPANY AVAILABLE
          </span>
        ) : (
          companies
            .slice(0, 6)
            .map((company) => (
              <LatestCompanyCards key={company._id} company={company} />
            ))
        )}
      </div>
    </div>
  );
};

export default LatestCompanies;
