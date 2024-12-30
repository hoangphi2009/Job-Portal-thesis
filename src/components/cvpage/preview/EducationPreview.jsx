import React from 'react'
import { useSelector } from 'react-redux';

const EducationPreview = () => {
  const { singleCv } = useSelector((store) => store.cv); // Get Redux state
  const education = singleCv?.cv?.education || []; // Default to empty array if undefined
  return (
    <div className="my-6">
      <h2 className="text-center font-bold text-lg mb-2">Education</h2>
      <hr className="my-2 border-gray-900 border-[1.5px]" />
      {education.length > 0 ? (
        education.map((item, index) => (
          <div key={index} className='mb-4' >
            <h2 className="text-lg font-bold mb-2">{item.degree}</h2>
            <h2 className="text-sm font-bold">{item.school}</h2>
            <h2 className="text-sm flex justify-between">
              {item.location}{" "}
              <span>
                {item.startDate} - {item.endDate}
              </span>
            </h2>
          </div>
        ))
      ) : (
        <div>No education found</div>
      )}
    </div>
  );
}

export default EducationPreview