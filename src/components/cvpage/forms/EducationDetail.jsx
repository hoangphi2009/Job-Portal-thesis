import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useGetCvById from "@/hooks/useGetCvById";
import { updateEducation } from "@/redux/cvSlice";
import { CV_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const EducationDetail = ({ onSuccess }) => {
  const params = useParams();
  useGetCvById(params.id);
  const dispatch = useDispatch();
  const { singleCv } = useSelector((store) => store.cv);
  const education = singleCv?.cv?.education || [];

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedEducationList = [...education];
    updatedEducationList[index] = {
      ...updatedEducationList[index],
      [name]: value,
    };

    // Cập nhật dữ liệu vào Redux store
    dispatch(updateEducation(updatedEducationList));
  };

  const addNewEducation = () => {
    const updatedEducationList = [
      ...education,
      {
        educationId: null, // Để trống để phân biệt mục mới thêm
        degree: "",
        school: "",
        location: "",
        startDate: "",
        endDate: "",
      },
    ];
    dispatch(updateEducation(updatedEducationList));
  };

  const removeEducation = (index) => {
    const updatedEducationList = education.filter((_, i) => i !== index);
    dispatch(updateEducation(updatedEducationList));
  };

  const handleSave = async (e) => {
    e.preventDefault();

    // Kiểm tra các trường còn trống
    const hasEmptyFields = education.some(
      (edu) =>
        !edu.degree ||
        !edu.school ||
        !edu.location ||
        !edu.startDate ||
        !edu.endDate
    );

    if (hasEmptyFields) {
      toast.error("Please fill out all required fields.");
      return;
    }

    // Chuyển đổi định dạng ngày trước khi gửi lên
    const formattedEducation = education.map((edu) => ({
      educationId: edu._id || edu.educationId, // Nếu `_id` đã có thì dùng để cập nhật, nếu không thì để null để thêm mới
      degree: edu.degree,
      school: edu.school,
      location: edu.location,
      startDate: new Date(edu.startDate).toISOString().split("T")[0],
      endDate: new Date(edu.endDate).toISOString().split("T")[0],
    }));

    try {
      const response = await axios.put(
        `${CV_API_END_POINT}/updateEdu/${params.id}`,
        { education: formattedEducation },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        // Cập nhật lại Redux với dữ liệu từ server
        dispatch(updateEducation(response.data.cv.education));
        toast.success(
          response.data.message || "Education updated successfully!"
        );
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("API error:", error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while saving education."
      );
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-slate-700 border-t-4 dark:bg-slate-600">
      <h2 className="font-bold text-lg">Professional Education Detail</h2>
      <p>Add your professional education detail here</p>
      <form onSubmit={handleSave}>
        <div>
          {education.length > 0 ? (
            education.map((item, index) => (
              <div
                key={index}
                className="border-2 border-gray-700 rounded-lg p-4 my-4"
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Education Degree</Label>
                    <Input
                      type="text"
                      name="degree"
                      value={item.degree}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div>
                    <Label>Education School</Label>
                    <Input
                      type="text"
                      name="school"
                      value={item.school}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div className="col-span-2">
                    <Label>Education Location</Label>
                    <Input
                      type="text"
                      name="location"
                      value={item.location}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div>
                    <Label>Education Start Date</Label>
                    <Input
                      type="date"
                      name="startDate"
                      value={item.startDate}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                  <div>
                    <Label>Education End Date</Label>
                    <Input
                      type="date"
                      name="endDate"
                      value={item.endDate}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="text-red-500"
                    type="button"
                    onClick={() => removeEducation(index)}
                  >
                    - Remove Education
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div>No education found. Add a new Education</div>
          )}
          <div className="flex justify-between mt-4">
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="text-green-500"
                type="button"
                onClick={addNewEducation}
              >
                + Add New Education
              </Button>
            </div>
            <Button type="submit">Save</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EducationDetail;
