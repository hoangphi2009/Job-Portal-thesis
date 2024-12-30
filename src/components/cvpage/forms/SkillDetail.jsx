import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetCvById from "@/hooks/useGetCvById";
import { CV_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { updateLanguages, updateSkills } from "@/redux/cvSlice";

const levelOptions = ["Beginner", "Intermediate", "Advanced", "Proficiency"];

const SkillDetail = ({ onSuccess }) => {
  const params = useParams();
  const dispatch = useDispatch();

  // Fetch CV data using custom hook
  useGetCvById(params.id);

  // Get CV data from Redux store
  const { singleCv } = useSelector((store) => store.cv);

  // Extract skills and languages from CV
  const skills = singleCv?.cv?.skills || [];
  const languages = singleCv?.cv?.languages || [];

  // Handle input change for skills and languages
  const handleChange = (e, index, type) => {
    const { name, value } = e.target;
    const updatedList = type === "skills" ? [...skills] : [...languages];

    updatedList[index] = {
      ...updatedList[index],
      [name]: value,
    };

    // Update Redux store
    if (type === "skills") {
      dispatch(updateSkills(updatedList));
    } else {
      dispatch(updateLanguages(updatedList));
    }
  };

  // Add a new skill
  const addNewSkill = () => {
    const updatedSkills = [
      ...skills,
      { skillId: Date.now(), skill: "", level: "" }, // New skill object with a unique ID and level
    ];
    dispatch(updateSkills(updatedSkills));
  };

  // Remove a skill
  const removeSkill = (index) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    dispatch(updateSkills(updatedSkills));
  };

  // Add a new language
  const addNewLanguage = () => {
    const updatedLanguages = [
      ...languages,
      { languageId: Date.now(), language: "", level: "" }, // New language object with a unique ID and level
    ];
    dispatch(updateLanguages(updatedLanguages));
  };

  // Remove a language
  const removeLanguage = (index) => {
    const updatedLanguages = languages.filter((_, i) => i !== index);
    dispatch(updateLanguages(updatedLanguages));
  };

  // Save changes to the server
  const handleSave = async (e) => {
    e.preventDefault();

    // Validate fields
    const hasEmptySkills = skills.some(
      (skill) => !skill?.skill?.trim() || !skill?.level?.trim()
    );
    const hasEmptyLanguages = languages.some(
      (lang) => !lang?.language?.trim() || !lang?.level?.trim()
    );

    if (hasEmptySkills || hasEmptyLanguages) {
      toast.error("Please fill out all required fields.");
      return;
    }

    // Ensure payload matches the expected format
    const payload = {
      skills: skills.map((item) => ({
        skillId: item.skillId,
        skill: item?.skill?.trim() || "", // Safely access and trim the skill
        level: item?.level?.trim() || "", // Safely access and trim the level
      })),
      languages: languages.map((item) => ({
        languageId: item.languageId,
        language: item?.language?.trim() || "", // Safely access and trim the language
        level: item?.level?.trim() || "", // Safely access and trim the level
      })),
    };

    try {
      const response = await axios.put(
        `${CV_API_END_POINT}/updateSkill/${params.id}`,
        payload,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        dispatch(updateSkills(response.data.cv.skills));
        dispatch(updateLanguages(response.data.cv.languages));
        toast.success("Skills and languages updated successfully!");
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "An error occurred while saving data."
      );
    }
  };

  return (
    <div className="p-6 shadow-lg rounded-lg border-t-4 border-t-slate-700 dark:bg-slate-600">
      <h2 className="font-bold text-2xl mb-4">
        Personal Skills and Language Detail
      </h2>
      <p className="text-sm mb-6">
        Start by entering your personal skills and language information.
      </p>

      <form onSubmit={handleSave}>
        {/* Skills Section */}
        <div className="mb-6">
          <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">List of Skills</h3>
            <div className="space-y-4">
              {skills.length > 0 ? (
                skills.map((item, index) => (
                  <div
                    key={item?.skillId || index} // Use fallback if skillId is missing
                    className="flex items-center space-x-4"
                  >
                    <div className="w-full max-w-md">
                      <Label htmlFor="skill" className="font-medium w-20">
                        Skill
                      </Label>
                      <Input
                        type="text"
                        name="skill"
                        value={item?.skill || ""} // Safely access the skill property
                        onChange={(e) => handleChange(e, index, "skills")}
                        className="w-full max-w-md p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="w-full max-w-md">
                      <Label htmlFor="level" className="font-medium w-20">
                        Level
                      </Label>
                      <select
                        name="level"
                        value={item?.level || ""}
                        onChange={(e) => handleChange(e, index, "skills")}
                        className="w-full max-w-md p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select Level</option>
                        {levelOptions.map((level, idx) => (
                          <option key={idx} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Button
                      variant="outline"
                      className="text-red-500"
                      type="button"
                      onClick={() => removeSkill(index)}
                    >
                      - Remove Skill
                    </Button>
                  </div>
                ))
              ) : (
                <div>No skills found. Add a new skill.</div>
              )}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  className="text-green-500"
                  type="button"
                  onClick={addNewSkill}
                >
                  + Add More Skill
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Languages Section */}
        <div>
          <div className="border border-gray-300 rounded-lg p-4 shadow-sm">
            <h3 className="text-xl font-semibold mb-4">List of Languages</h3>
            <div className="space-y-4">
              {languages.length > 0 ? (
                languages.map((item, index) => (
                  <div
                    key={item?.languageId || index} // Use fallback if languageId is missing
                    className="flex items-center space-x-4"
                  >
                    <div className="w-full max-w-md">
                      <Label htmlFor="language" className="font-medium w-20">
                        Language
                      </Label>
                      <Input
                        id="language"
                        type="text"
                        name="language"
                        value={item?.language || ""} // Safely access the language property
                        onChange={(e) => handleChange(e, index, "languages")}
                        className="w-full max-w-md p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                    <div className="w-full max-w-md">
                      <Label htmlFor="level" className="font-medium w-20">
                        Level
                      </Label>
                      <select
                        name="level"
                        value={item?.level || ""}
                        onChange={(e) => handleChange(e, index, "languages")}
                        className="w-full max-w-md p-2 border border-gray-300 rounded-md"
                      >
                        <option value="">Select Level</option>
                        {levelOptions.map((level, idx) => (
                          <option key={idx} value={level}>
                            {level}
                          </option>
                        ))}
                      </select>
                    </div>
                    <Button
                      variant="outline"
                      className="text-red-500"
                      type="button"
                      onClick={() => removeLanguage(index)}
                    >
                      - Remove Language
                    </Button>
                  </div>
                ))
              ) : (
                <div>No languages found. Add a new language.</div>
              )}
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  className="text-green-500"
                  type="button"
                  onClick={addNewLanguage}
                >
                  + Add More Language
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end mt-4">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};

export default SkillDetail;
