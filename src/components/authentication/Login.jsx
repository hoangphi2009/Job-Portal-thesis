import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup } from "../ui/radio-group";
import { useEffect, useState } from "react";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import Footer from "../shared/Footer";

// const Login = () => {
//   const [input, setInput] = useState({
//     email: "",
//     password: "",
//     role: "",
//   });
//   const changEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };
//   const {loading, user} = useSelector(store => store.auth);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       dispatch(setLoading(true));
//       const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         dispatch(setUser(res.data.user));
//         navigate("/");
//         toast.success(res.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error(error.response.data.message);
//     } finally{
//       dispatch(setLoading(false));
//     }
//   };
//   useEffect(() => {
//     if(user){
//       navigate("/")
//     }
//   }, []);
//   return (
//     <div>
//       <Navbar />
//       <div className="flex items-center justify-center max-w-7xl mx-auto">
//         <form
//           className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
//           onSubmit={submitHandler}
//         >
//           <h1 className="font-bold text-xl mb-5">Login</h1>
//           <div className="my-2 ">
//             <Label>Email</Label>
//             <Input
//               type="text"
//               value={input.email}
//               name="email"
//               onChange={changEventHandler}
//               placeholder="ABC123@gmail.com"
//             />
//           </div>
//           <div className="my-2 ">
//             <Label>Password</Label>
//             <Input
//               type="password"
//               value={input.password}
//               name="password"
//               onChange={changEventHandler}
//               placeholder="Enter your Password"
//             />
//           </div>
//           <div className="flex justify-between items-center">
//             <RadioGroup className="flex items-center gap-4 my-5">
//               <div className="flex items-center space-x-2">
//                 <Input
//                   type="radio"
//                   className="cursor-pointer"
//                   name="role"
//                   value="student"
//                   checked={input.role === "student"}
//                   onChange={changEventHandler}
//                 />
//                 <Label htmlFor="option-one">Student</Label>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <Input
//                   type="radio"
//                   className="cursor-pointer"
//                   name="role"
//                   value="recruiter"
//                   checked={input.role === "recruiter"}
//                   onChange={changEventHandler}
//                 />
//                 <Label htmlFor="option-two">Recruiter</Label>
//               </div>
//             </RadioGroup>
//           </div>
//           {loading ? (
//             <Button className="w-full my-4">
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Please Waiting...
//             </Button>
//           ) : (
//             <Button
//               type="submit"
//               className="w-full my-4 bg-[#eb3232] hover:bg-[#45ea69]"
//             >
//               Login
//             </Button>
//           )}
//           <span className="text-sm">
//             Already have an account?
//             <Link to="/signup" className="text-blue-500 ml-2">
//               Sign up
//             </Link>
//           </span>
//         </form>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Login;


const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const changEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));

      let res;

      // Nếu là admin, gọi API loginByAdmin
      if (input.email === "admin123@gmail.com") {
        res = await axios.post(`${USER_API_END_POINT}/login/admin`, input, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
      } else {
        // Nếu không phải admin, gọi API login thông thường
        res = await axios.post(`${USER_API_END_POINT}/login`, input, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
      }

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/"); // Điều hướng về trang chính
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
          onSubmit={submitHandler}
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>
          <div className="my-2 ">
            <Label>Email</Label>
            <Input
              type="text"
              value={input.email}
              name="email"
              onChange={changEventHandler}
              placeholder="ABC123@gmail.com"
            />
          </div>
          <div className="my-2 ">
            <Label>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changEventHandler}
              placeholder="Enter your Password"
            />
          </div>

          {/* Chỉ hiển thị radio buttons khi không phải là admin */}
          {input.email !== "admin123@gmail.com" && (
            <div className="flex justify-between items-center">
              <RadioGroup className="flex items-center gap-4 my-5">
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    className="cursor-pointer"
                    name="role"
                    value="student"
                    checked={input.role === "student"}
                    onChange={changEventHandler}
                  />
                  <Label htmlFor="option-one">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    className="cursor-pointer"
                    name="role"
                    value="recruiter"
                    checked={input.role === "recruiter"}
                    onChange={changEventHandler}
                  />
                  <Label htmlFor="option-two">Recruiter</Label>
                </div>
              </RadioGroup>
            </div>
          )}

          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please Waiting...
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4 bg-[#eb3232] hover:bg-[#45ea69]"
            >
              Login
            </Button>
          )}
          <span className="text-sm">
            Already have an account?
            <Link to="/signup" className="text-blue-500 ml-2">
              Sign up
            </Link>
          </span>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
