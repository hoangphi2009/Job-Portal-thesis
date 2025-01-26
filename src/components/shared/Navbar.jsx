import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "../ui/button";
import { FilePlus, LogOut, User2, UserCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import { Badge } from "../ui/badge";
import NoUser from "../../assets/nouser.png";
import DarkMode from "../../DarkMode";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { ListItem } from "@mui/material";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold text-black dark:text-white">
            Job
            <span className="text-[#F83002] dark:text-[#FF5733]">Portal</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5 text-gray-800 dark:text-gray-200">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to="/recruiter/companies">Companies</Link>
                </li>
                <li>
                  <Link to="/recruiter/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li>
                  <Link to="/browse">Browse</Link>
                </li>
                <li className="mt-2">
                  <NavigationMenu className="text-black dark:text-white">
                    <NavigationMenuItem className="text-black dark:text-white">
                      <NavigationMenuTrigger className=" dark:text-white text-base text-orange-500">
                        Tools
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="flex flex-col gap-2 p-4 w-[300px]">
                          <ListItem
                            onClick={() => navigate("/tool")}
                            className="flex items-center gap-2 cursor-pointer hover:text-red-600 hover:bg-gray-50"
                          >
                            <FilePlus className="text-red-600" />
                            Create CV
                          </ListItem>
                          <ListItem
                            onClick={() => navigate("/")}
                            className="flex items-center gap-2 cursor-pointer hover:text-red-600 hover:bg-gray-50 "
                          >
                            <UserCheck className="text-green-600" />
                            Prepare for Interview
                          </ListItem>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenu>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div>
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="outline" className="dark:border-gray-700">
                    Login
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button className="bg-[#e24545] hover:bg-[#38d3cb] dark:bg-[#FF5733] dark:hover:bg-[#2ECC71]">
                    Signup
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto || NoUser} />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
                <div>
                  <div className="flex items-center gap-3 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto || NoUser}
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {user?.email}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Bio: {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col my-3 text-gray-600 dark:text-gray-300">
                    {user && user.role === "student" && (
                      <div>
                        <div className="flex items-center gap-2">
                          {user?.profile?.skills?.length > 0 ? (
                            <>
                              <h1 className="font-medium">Skills:</h1>
                              {user.profile.skills.map((item, index) => (
                                <Badge
                                  key={index}
                                  className="bg-[#f5814f] text-white uppercase"
                                >
                                  {item}
                                </Badge>
                              ))}
                            </>
                          ) : (
                            <span>No skills</span>
                          )}
                        </div>
                        <div className="flex w-fit items-center gap-2 cursor-pointer">
                          <User2 />
                          <Button variant="link">
                            <Link to="/profile">View Profile</Link>
                          </Button>
                        </div>
                      </div>
                    )}
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button variant="link" onClick={logoutHandler}>
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
          <DarkMode />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
