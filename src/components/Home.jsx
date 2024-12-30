import CategoryCarousel from "./CategoryCarousel";
import Footer from "./shared/Footer";
import HeroSection from "./HeroSection";
import LatestJobs from "./LatestJobs";
import Navbar from "./shared/Navbar";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LatestCompanies from "./LatestCompanies";
import ToolSection from "./ToolSection";


const Home = () => {
  useGetAllJobs();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user?.role === "recruiter") {
      navigate("/admin/companies");
    }
  }, []);
  return (
    <div>
      <div className="sticky top-0 z-50 border-b bg-gray-200 shadow-md">
        <Navbar />
      </div>
      <HeroSection />
      <CategoryCarousel />
      <ToolSection />
      <LatestJobs />
      <LatestCompanies />
      <Footer />
    </div>
  );
};

export default Home;
