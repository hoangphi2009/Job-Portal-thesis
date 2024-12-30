
import { setSingleCv } from "@/redux/cvSlice";
import {  CV_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetCvById = (cvId) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchSingleCv = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage
        const res = await axios.get(`${CV_API_END_POINT}/get/${cvId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add the authorization header
          },
          withCredentials: true,
        });
        if (res.data) {
          dispatch(setSingleCv(res.data));
        }
      } catch (error) {
        console.error("Fetching single CV failed:", error);
      }
    };

    if (cvId) fetchSingleCv();
  }, [cvId, dispatch]);
};


export default useGetCvById;
