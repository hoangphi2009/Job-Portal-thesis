import {
  ArrowRight,
  Building2,
  FilePlus,
  MessagesSquare,
  SearchCheck,
} from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";

const ToolSection = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto relative z-10 hidden max-h-[186px] justify-center gap-8 overflow-hidden rounded-[8px] bg-pink-100 p-4 align-middle font-sans shadow-md md:flex">
      <div
        onClick={() => navigate("/tool")}
        className="group relative cursor-pointer items-center gap-3 p-4 text-left hover:rounded-[8px] hover:bg-white hover:transition hover:duration-150 hover:ease-linear"
      >
        <a className="flex flex-col">
          <FilePlus className="text-red-600" />
          <span className="mt-[7px] text-[18px] font-bold leading-6 tracking-[0.09px] text-[#424242]">
            Create CV
          </span>
          <span className="mt-1 text-[14px] leading-5 tracking-[0.14px] text-[#757575]">
            Create an impressive CV with just one easy step
          </span>
          <div className="mt-2 flex items-center gap-2 text-left group-hover:visible group-hover:transition group-hover:duration-150 group-hover:ease-linear">
            <Button
              className="justify-center text-center text-[14px] font-semibold leading-5 tracking-[0.14px] text-red-500 underline"
              variant="link"
            >
              CREATE CV
            </Button>
            <ArrowRight className="self-center text-red-500" />
          </div>
        </a>
      </div>
      <div
        onClick={() => navigate("/jobs")}
        className="group relative cursor-pointer items-center gap-3 p-4 text-left hover:rounded-[8px] hover:bg-white hover:transition hover:duration-150 hover:ease-linear"
      >
        <a className="flex flex-col">
          <SearchCheck className="text-red-600" />
          <span className="mt-[7px] text-[18px] font-bold leading-6 tracking-[0.09px] text-[#424242]">
            Finding a job
          </span>
          <span className="mt-1 text-[14px] leading-5 tracking-[0.14px] text-[#757575]">
            Finding a new job with job search easy for freshers
          </span>
          <div className="mt-2 flex items-center gap-2 text-left group-hover:visible group-hover:transition group-hover:duration-150 group-hover:ease-linear">
            <Button
              className="justify-center text-center text-[14px] font-semibold leading-5 tracking-[0.14px] text-red-500 underline"
              variant="link"
            >
              JOB SEARCH
            </Button>
            <ArrowRight className="self-center text-red-500" />
          </div>
        </a>
      </div>
      <div className="group relative cursor-pointer items-center gap-3 p-4 text-left hover:rounded-[8px] hover:bg-white hover:transition hover:duration-150 hover:ease-linear">
        <a className="flex flex-col">
          <Building2 className="text-red-600" />
          <span className="mt-[7px] text-[18px] font-bold leading-6 tracking-[0.09px] text-[#424242]">
            Finding a company
          </span>
          <span className="mt-1 text-[14px] leading-5 tracking-[0.14px] text-[#757575]">
            Explore famous companies in many fields of work.
          </span>
          <div className="mt-2 flex items-center gap-2 text-left group-hover:visible group-hover:transition group-hover:duration-150 group-hover:ease-linear">
            <Button
              className="justify-center text-center text-[14px] font-semibold leading-5 tracking-[0.14px] text-red-500 underline"
              variant="link"
            >
              COMPANIES SEARCH
            </Button>
            <ArrowRight className="self-center text-red-500" />
          </div>
        </a>
      </div>
      <div className="group relative cursor-pointer items-center gap-3 p-4 text-left hover:rounded-[8px] hover:bg-white hover:transition hover:duration-150 hover:ease-linear">
        <a className="flex flex-col">
          <MessagesSquare className="text-red-600" />
          <span className="mt-[7px] text-[18px] font-bold leading-6 tracking-[0.09px] text-[#424242]">
            Mock test and Question
          </span>
          <span className="mt-1 text-[14px] leading-5 tracking-[0.14px] text-[#757575]">
            Get ready for your interview
          </span>
          <div className="mt-2 flex items-center gap-2 text-left group-hover:visible group-hover:transition group-hover:duration-150 group-hover:ease-linear">
            <Button
              className="justify-center text-center text-[12px] font-semibol leading-5 tracking-[0.14px] text-red-500 underline"
              variant="link"
            >
              READ MORE
            </Button>
            <ArrowRight className="self-center text-red-500" />
          </div>
        </a>
      </div>
    </div>
  );
};

export default ToolSection;
