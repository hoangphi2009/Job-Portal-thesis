import { Badge } from "./ui/badge";

const LatestJobCards = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white boder border-gray-300 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">Company Name</h1>
        <p className="text-sm text-gray-500">VietNam</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Job Title</h1>
        <p className="text-sm text-gray-600">decreption</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold "} variant="ghost">
          Positions
        </Badge>
        <Badge className={"text-[red] font-bold "} variant="ghost">
          Time
        </Badge>
        <Badge className={"text-[#df3fca] font-bold "} variant="ghost">
          Address
        </Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
