import { useSelector } from "react-redux";
import EducationPreview from "./preview/EducationPreview";
import ExperiencePreview from "./preview/ExperiencePreview";
import PresonalPreview from "./preview/PresonalPreview";
import SkillPreview from "./preview/SkillPreview";
import SummeryPreview from "./preview/SummeryPreview";

const CvPreview = () => {
  const { singleCv } = useSelector((stote) => stote.cv);
  return (
    <div className="shadow-lg h-full p-14 border-t-[20px] border-t-[#e93939] dark:bg-slate-600">
      <PresonalPreview cv={singleCv} />
      <SummeryPreview />
      <ExperiencePreview />
      <EducationPreview/>
      <SkillPreview/>
    </div>
  );
};

export default CvPreview;
