import { useSelector } from "react-redux";
import DOMPurify from "dompurify";

const ExperiencePreview = () => {
  const { singleCv } = useSelector((store) => store.cv); // Get Redux state

  const professionalExperience = singleCv?.cv?.professionalExperience || []; // Default to empty array if undefined
  console.log("Redux State in ExperiencePreview:", singleCv);

  // Custom configuration to allow certain tags
  const sanitizeConfig = {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "ul", "ol", "li", "p", "u"],
  };

  return (
    <div className="my-3">
      <h2 className="text-lg font-bold text-center">Professional Experience</h2>
      <hr className="my-2 border-gray-900 border-[1.5px]" />
      {professionalExperience.length > 0 ? (
        professionalExperience.map((item, index) => (
          <div key={index} className="mb-4">
            <h2 className="text-lg font-bold mb-2">{item.title}</h2>
            <h2 className="text-sm font-bold">{item.company}</h2>
            <h2 className="text-sm flex justify-between">
              {item.location}{" "}
              <span>
                {item.startDate} - {item.endDate}
              </span>
            </h2>
            <div
              className="text-sm my-2"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(item.description, sanitizeConfig),
              }}
            />
          </div>
        ))
      ) : (
        <div>No professional experience added yet.</div>
      )}
    </div>
  );
};

export default ExperiencePreview;
