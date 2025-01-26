import { useSelector } from "react-redux";
import Navbar from "../shared/Navbar";
import CvPreview from "./CvPreview";
import FormSection from "./FormSection";

const PersonalCvSetup = () => {
  const { singleCv } = useSelector((store) => store.cv);
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        <FormSection />
        <CvPreview cv={singleCv} />
      </div>
    </div>
  );
};

export default PersonalCvSetup;
