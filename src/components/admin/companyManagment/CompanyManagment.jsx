import { useSelector } from "react-redux";
import AdminLeftBar from "../AdminLeftbar";
import LatestCompanyCards from "@/components/LatestCompanyCards";

const CompanyManagment = () => {
  const { companies , singleCompany } = useSelector((store) => store.company);
  const allCompanies = [...companies, singleCompany];
  return (
    <div className="flex min-h-screen">
      <AdminLeftBar />
      <div className="w-4/5 p-4">
        <div className="grid grid-cols-4 gap-4 my-5">
          {allCompanies.length === 0 ? (
            <span className="text-gray-500 dark:text-gray-400">
              NO COMPANY AVAILABLE
            </span>
          ) : (
            allCompanies
              .slice(0, 6)
              .map((company) => (
                <LatestCompanyCards key={company._id} company={company} />
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyManagment;
