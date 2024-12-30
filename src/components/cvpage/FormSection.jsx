import { useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import PersonalDetail from "./forms/PersonalDetail";
import SummeryDetail from "./forms/SummeryDetail";
import ExperienceDetail from "./forms/ExperienceDetail";
import EducationDetail from "./forms/EducationDetail";
import SkillDetail from "./forms/SkillDetail";
import { Navigate, useParams } from "react-router-dom";
import useGetCvById from "@/hooks/useGetCvById";

const FormSection = () => {
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  const [enableNext, setEnableNext] = useState(true);
  const params = useParams();
  console.log(params.id); // Log the correct parameter
  useGetCvById(params.id); // Use params.id instead of params.cvId

  const handleSuccess = () => {
    if (activeFormIndex < 7) {
      setActiveFormIndex(activeFormIndex + 1);
    }
  };

  return (
    <div>
      <div className="flex gap-2 justify-between my-2">
        {activeFormIndex > 1 && (
          <Button
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex - 1)}
          >
            <ArrowLeft />
            Back
          </Button>
        )}
        <Button
          disabled={!enableNext}
          className="flex gap-2"
          size="sm"
          onClick={handleSuccess} // Fix: Remove the unnecessary arrow function
        >
          Next
          <ArrowRight />
        </Button>
      </div>
      {activeFormIndex === 1 ? (
        <PersonalDetail
          enabledNext={(v) => setEnableNext(v)}
          onSuccess={handleSuccess}
        />
      ) : activeFormIndex === 2 ? (
        <SummeryDetail
          enabledNext={(v) => setEnableNext(v)}
          onSuccess={handleSuccess}
        />
      ) : activeFormIndex === 3 ? (
        <ExperienceDetail
          enabledNext={(v) => setEnableNext(v)}
          onSuccess={handleSuccess}
        />
      ) : activeFormIndex === 4 ? (
        <EducationDetail
          enabledNext={(v) => setEnableNext(v)}
          onSuccess={handleSuccess}
        />
      ) : activeFormIndex === 5 ? (
        <SkillDetail
          enabledNext={(v) => setEnableNext(v)}
          onSuccess={handleSuccess}
        />
      ) : activeFormIndex === 6 ? (
        <Navigate to={"/cv/" + params.id + "/view"} />
      ) : null}
    </div>
  );
};

export default FormSection;
