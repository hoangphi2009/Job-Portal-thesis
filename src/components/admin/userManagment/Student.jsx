import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Trash2Icon } from "lucide-react";

const Student = ({ student }) => {
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
            Register {daysAgoFunction(student?.createdAt)} days ago
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
                src={student?.profile?.profilePhoto}
                alt="Company Logo"
              />
            </Avatar>
          </Button>
          <div>
            <h1 className="font-medium text-lg text-gray-800 dark:text-gray-200">
              {student?.role} Name: {student?.fullname}
            </h1>
            <p className="text-sm text-red-500">{student?.email}</p>
          </div>
        </div>
        <div>
          <h1 className="font-bold text-lg my-2 text-red-800 dark:text-gray-200">
            Role: {student?.role}
          </h1>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            Phone Number: {student?.phoneNumber}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-400">
            {student?.profile?.bio}
          </p>
        </div>
        <div className="my-2">
          <h1 className="dark:text-white font-bold">Skills</h1>
          <div className="flex items-center gap-2 mt-2">
            {student?.profile?.skills.length > 0 ? (
              student?.profile?.skills.map((item, index) => (
                <Badge key={index} className="text-white dark:text-gray-900">
                  {item}
                </Badge>
              ))
            ) : (
              <span className="dark:text-gray-400">No skills</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-2 mt-2">
          <Label className="text-md font-bold dark:text-white">Resume</Label>
          {isResume ? (
            <a
              target="blank"
              href={student?.profile?.resume}
              className="text-blue-600 dark:text-blue-400 w-full hover:underline cursor-pointer"
            >
              {student?.profile?.resumeOriginalName}
            </a>
          ) : (
            <span className="dark:text-gray-400">No Resume</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Student