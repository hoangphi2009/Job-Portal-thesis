import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CV_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { updateProfessionalExperience } from "@/redux/cvSlice";
import useGetCvById from "@/hooks/useGetCvById";
import { toast } from "sonner";
import {
  BtnBold,
  BtnBulletList,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnStrikeThrough,
  BtnUnderline,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from "react-simple-wysiwyg";

const ExperienceDetail = ({ onSuccess }) => {
  const params = useParams();
  useGetCvById(params.id); // Hook để load dữ liệu CV
  const dispatch = useDispatch();
  const { singleCv } = useSelector((store) => store.cv); // Lấy singleCv từ Redux store

  // Hiển thị trạng thái loading khi chưa có dữ liệu
  if (!singleCv) {
    return <div>Loading...</div>; // Có thể thay thế bằng spinner hoặc skeleton loader
  }

  // Nếu professionalExperience chưa được khởi tạo, đảm bảo nó là mảng trống
  const professionalExperience = singleCv?.cv?.professionalExperience || [];

  // Xử lý thay đổi trên từng trường của form
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const updatedExperienceList = [...professionalExperience];
    updatedExperienceList[index] = {
      ...updatedExperienceList[index],
      [name]: value,
    };

    // Cập nhật dữ liệu vào Redux store
    dispatch(updateProfessionalExperience(updatedExperienceList));
  };

  // Thêm một mục kinh nghiệm mới
  const addNewExperience = () => {
    const updatedExperienceList = [
      ...professionalExperience,
      {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ];
    // Cập nhật vào Redux store
    dispatch(updateProfessionalExperience(updatedExperienceList));
  };
  const removeExperience = (index) => {
    const updatedExperienceList = professionalExperience.filter(
      (_, i) => i !== index
    );
    console.log("Updated Experience List:", updatedExperienceList);

    dispatch(updateProfessionalExperience(updatedExperienceList));
  };

  // Xử lý lưu dữ liệu lên API
  const handleSave = async (e) => {
    e.preventDefault();

    // Kiểm tra trường trống
    const hasEmptyFields = professionalExperience.some(
      (experience) =>
        !experience.title ||
        !experience.company ||
        !experience.startDate ||
        !experience.endDate
    );

    if (hasEmptyFields) {
      toast.error("Please fill out all required fields.");
      return;
    }

    try {
      const response = await axios.put(
        `${CV_API_END_POINT}/updateProfExp/${params.id}`,
        {
          professionalExperience,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        // Cập nhật Redux Store với dữ liệu từ API hoặc local state
        dispatch(updateProfessionalExperience(professionalExperience));
        toast.success("Experience updated successfully!");
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("API error:", error);
      toast.error("An error occurred while saving experience.");
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-slate-700 border-t-4 dark:bg-slate-600">
      <h2 className="font-bold text-lg">Professional Experience Detail</h2>
      <p>Add your professional experience detail here</p>

      <form onSubmit={handleSave}>
        <div>
          {professionalExperience.length > 0 ? (
            professionalExperience.map((item, index) => (
              <div
                key={index}
                className="border-2 border-gray-700 rounded-lg p-4 my-4 "
              >
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-sm">Position Title</Label>
                    <Input
                      type="text"
                      name="title"
                      value={item.title}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>

                  <div>
                    <Label className="text-sm">Company Name</Label>
                    <Input
                      type="text"
                      name="company"
                      value={item.company}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>

                  <div className="col-span-2">
                    <Label className="text-sm">Location</Label>
                    <Input
                      type="text"
                      name="location"
                      value={item.location}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>

                  <div>
                    <Label className="text-sm">Start Date</Label>
                    <Input
                      type="date"
                      name="startDate"
                      value={item.startDate}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>

                  <div>
                    <Label className="text-sm">End Date</Label>
                    <Input
                      type="date"
                      name="endDate"
                      value={item.endDate}
                      onChange={(e) => handleChange(e, index)}
                    />
                  </div>

                  <div className="col-span-2">
                    <Label className="text-sm">Description</Label>
                    <EditorProvider>
                      <Editor
                        type="text"
                        name="description"
                        value={item.description}
                        onChange={(e) => handleChange(e, index)}
                      >
                        <Toolbar>
                          <BtnBold />
                          <BtnItalic />
                          <BtnUnderline />
                          <BtnStrikeThrough />
                          <Separator />
                          <BtnNumberedList />
                          <BtnBulletList />
                          <Separator />
                          <BtnLink />
                        </Toolbar>
                      </Editor>
                    </EditorProvider>
                  </div>
                </div>
                <div className="mt-4">
                  <Button
                    variant="outline"
                    className="text-red-500"
                    type="button"
                    onClick={() => removeExperience(index)} // Truyền đúng index
                  >
                    - Delete experience
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div>No professional experience found. Add a new one.</div>
          )}
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="text-green-500"
              type="button"
              onClick={addNewExperience}
            >
              + Add more experience
            </Button>
          </div>
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default ExperienceDetail;
