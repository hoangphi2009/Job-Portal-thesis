import { RWebShare } from "react-web-share";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import CvPreview from "./CvPreview";
import { useParams } from "react-router-dom";
import useGetCvById from "@/hooks/useGetCvById";
import { useSelector } from "react-redux";

const ViewCV = () => {
    const params = useParams();
    useGetCvById(params.id);
    const {singCv} = useSelector((store) => store.cv);
    const title = singCv?.cv?.personalDetails || [];
  const handleDownload = () => {
    window.print();
  };
  return (
    <div>
      <div id="no-print">
        <Navbar />
        <div className="my-10 mx-10 md:mx-20 lg:mx-32">
          <h2 className="text-center text-2xl font-medium">
            Congrats! Your CV is ready.
          </h2>
          <p className="text-center text-gray-600 text-xl">
            Now you are ready to download and share your CV url with your
            recuiter
          </p>
          <div className="flex justify-between px-44 my-10 mx-10">
            <Button
              onClick={handleDownload}
              className="text-xl bg-blue-100 text-blue-800 px-4 py-2 rounded-lg shadow-md flex items-center space-x-3 hover:bg-blue-200 transition-all"
            >
              Download
            </Button>
            <RWebShare
              data={{
                text: `This is my resume (CV) about ${title?.jobTitle}.`,
                url: `http://localhost:5173/cv/${params.id}/view`,
                title: title?.firstName + " " + title?.lastName + " " + title?.jobTitle,
              }}
              onClick={() => console.log("shared successfully!")}
            >
              <Button className="text-xl bg-blue-100 text-blue-800 px-4 py-2 rounded-lg shadow-md flex items-center space-x-3 hover:bg-blue-200 transition-all">
                Share
              </Button>
            </RWebShare>
          </div>
        </div>
      </div>
      <div id="print-area" className="my-10 mx-10 md:mx-25 lg:mx-32">
        <CvPreview />
      </div>
    </div>
  );
};

export default ViewCV;
