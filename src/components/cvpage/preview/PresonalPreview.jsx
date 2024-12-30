import { useSelector } from "react-redux";

const PersonalPreview = () => {
  const { singleCv } = useSelector((store) => store.cv);
  
  const personalDetails = singleCv?.cv?.personalDetails || {};
  return (
    <div>
      <h2 className="font-bold text-xl text-center">
        {personalDetails.firstName} {personalDetails.lastName}
      </h2>
      <h2 className="font-medium text-sm text-center">
        {personalDetails.jobTitle}
      </h2>
      <h2 className="font-normal text-center text-xs">
        {personalDetails.address}
      </h2>
      <div className="flex justify-between">
        <h2 className="font-normal text-xs">
          Phone Number: {personalDetails.phone}
        </h2>
        <h2 className="font-normal text-xs">{personalDetails.email}</h2>
      </div>
      <hr className="my-2 border-gray-900 border-[1.5px]" />
    </div>
  );
};

export default PersonalPreview;
