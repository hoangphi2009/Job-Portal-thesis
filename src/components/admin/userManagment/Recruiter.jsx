import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2Icon } from "lucide-react";

const Recruiter = ({ recruiter }) => {
  const isResume = true;
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const now = new Date();
    const diff = now.getTime() - createdAt.getTime();
    const daysAgo = Math.floor(diff / (1000 * 60 * 60 * 24));
    return daysAgo;
  };
  return (
    <div>
      <div className="p-5 rounded-md shadow-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700">
        <div className="flex items-center justify-between text-gray-700 dark:text-gray-400">
          <p className="text-sm">
            Register {daysAgoFunction(recruiter?.createdAt)} days ago
          </p>
          <div>
            <Button variant="outline" className="rounded-full" size="icon">
              <Trash2Icon />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2 my-2">
          <Button className="p-6" variant="outline" size="icon">
            <Avatar>
              <AvatarImage
                src={recruiter?.profile?.profilePhoto}
                alt="Company Logo"
              />
            </Avatar>
          </Button>
          <div>
            <h1 className="font-medium text-lg text-gray-800 dark:text-gray-200">
              {recruiter?.role} Name: {recruiter?.fullname}
            </h1>
            <p className="text-sm text-red-500">{recruiter?.email}</p>
          </div>
        </div>
        <div>
          <h1 className="font-bold text-lg my-2 text-red-800 dark:text-gray-200">
            Role: {recruiter?.role}
          </h1>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            Phone Number: {recruiter?.phoneNumber}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            {recruiter?.profile?.bio}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Recruiter;
