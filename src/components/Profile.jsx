import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import LogoIU from "../assets/IU.png";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
const skills = ["html", "css", "JS"];
const Profile = () => {
  const isResume = true;
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto bg-orange-200 border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src={LogoIU} alt="profile" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">Full Name</h1>
              <p>decreption</p>
            </div>
          </div>
          <Button className="text-right" variant="outline">
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>ABC123@gmail.com</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>0123456789</span>
          </div>
        </div>
        <div className="my-5">
          <h1>Skills</h1>
          <div className="flex items-center gap-2">
            {skills.length > 0 ? (
              skills.map((item, index) => <Badge key={index}>{item}</Badge>)
            ) : (
              <span>No skills</span>
            )}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap-2">
          <Label className="text-md font-bold">Resume</Label>
          {isResume ? (
            <a target="blank" href="yotube.com" className="text-blue-600 w-full hover:underline cursor-pointer">Your Name </a>
          ) : (
            <span>No Resume</span>
          )}
        </div>
        <div className="max-w-4xl mx-auto bg-white rounded-2xl">
          <h1>Applied Jobs</h1>

        </div>
      </div>
    </div>
  );
};

export default Profile;
