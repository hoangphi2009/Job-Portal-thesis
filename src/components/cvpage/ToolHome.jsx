import CvCreate from "./CvCreate";
import CvCard from "./CvCard";
import { useSelector } from "react-redux";
import useGetAllCvs from "@/hooks/useGetAllCvs";

const ToolHome = () => {
  const { cvs } = useSelector((stote) => stote.cv);
  useGetAllCvs();

  return (
    <div className="p-10 md:px-20 lg:px-32">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start creating your resume for your dream job</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10">
        <CvCreate />
        {cvs && cvs.length > 0 ? (
          cvs.map((cv) => <CvCard key={cv._id} cv={cv} />)
        ) : (
          <p>No resumes found. Create one now!</p>
        )}
      </div>
    </div>
  );
};

export default ToolHome;
