import Footer from "../shared/Footer";
import Navbar from "../shared/Navbar";
import ToolHome from "./ToolHome";

const Tool = () => {
  return (
    <div>
      <div className="sticky top-0 z-50 border-b bg-gray-200 shadow-md">
        <Navbar />
      </div>
      <ToolHome />
      <Footer />
    </div>
  );
};

export default Tool;
