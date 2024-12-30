import { setCvs } from "@/redux/cvSlice";
import { CV_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllCvs = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAllCvs = async () => {
      try {
        const res = await axios.get(`${CV_API_END_POINT}/cvs`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setCvs(res.data.cvs));
        }
      } catch (error) {
        console.error("Error fetching CVs:", error);
      }
    };

    fetchAllCvs();
  }, [dispatch]);
};

export default useGetAllCvs;
