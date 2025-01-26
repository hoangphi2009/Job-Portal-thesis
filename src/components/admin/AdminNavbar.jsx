import { useDispatch, useSelector } from "react-redux";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import NoUser from "../../assets/nouser.png";
import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import DarkMode from "@/DarkMode";

const AdminNavbar = () => {
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
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
        <h1 className="text-xl font-bold ">Admin Dashboard</h1>
        
        <div className="flex items-center ">
          <Popover>
            <PopoverTrigger>
              <Avatar className="cursor-pointer mx-4">
                <AvatarImage src={user?.profile?.profilePhoto || NoUser} />
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-80 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
              <div className="flex items-center gap-3 space-y-2">
                <Avatar className="cursor-pointer">
                  <AvatarImage src={user?.profile?.profilePhoto || NoUser} />
                </Avatar>
                <div>
                  <h4 className="font-medium">{user?.fullname}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="flex w-fit items-center gap-2 cursor-pointer">
                <LogOut />
                <Button variant="link" onClick={logoutHandler}>
                  Logout
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <DarkMode />
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
