import { useSelector } from "react-redux";

const SkillPreview = () => {
  // Get skills and languages from Redux store
  const { singleCv } = useSelector((store) => store.cv);
  const skills = singleCv?.cv?.skills || [];
  const languages = singleCv?.cv?.languages || [];

  return (
    <div className="my-5">
      <h2 className="font-bold text-lg text-center mb-2">
        Skills And Languages
      </h2>
      <hr className="my-2 border-gray-900 border-[1.5px]" />

      {/* Skills Section */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-4 text-slate-800">Skills</h3>
        <div className="flex flex-wrap gap-6">
          {skills.length > 0 ? (
            skills.map((item, idx) => (
              <div
                key={idx}
                className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg shadow-md flex items-center space-x-3 hover:bg-blue-200 transition-all"
              >
                <span className="font-medium">{item.skill}</span>
                <span className="text-sm text-blue-600">({item.level})</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No skills available</p>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-slate-800">Languages</h3>
        <div className="flex flex-wrap gap-6">
          {languages.length > 0 ? (
            languages.map((item, idx) => (
              <div
                key={idx}
                className="bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow-md flex items-center space-x-3 hover:bg-green-200 transition-all"
              >
                <span className="font-medium">{item.language}</span>
                <span className="text-sm text-green-600">({item.level})</span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No languages available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillPreview;
