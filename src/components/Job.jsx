import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import LogoIU from "../assets/IU.png";
import { Badge } from "./ui/badge";
const Job = () => {
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100">
      <div className="flex items-center justify-between">
        <p className="text-sm ">2 days ago</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={LogoIU} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">Company</h1>
          <p className="text-sm text-red-500">VietNam</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">Title</h1>
        <p className="text-sm text-gray-700">decreption</p>
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
      <div className="flex items-center gap-4 mt-4">
        <Button variant="outline">Details</Button>
        <Button className="bg-[#f462ea] hover:bg-[#38d3cb] text-white">
          Save
        </Button>
      </div>
    </div>
  );
};

export default Job;
