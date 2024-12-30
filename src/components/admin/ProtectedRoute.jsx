import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === null || user.role !== "recruiter") {
      navigate("/");
    }
  }, [user, navigate]); // Add user and navigate to the dependency array

  return <>{children}</>;
};

// PropTypes validation
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Validate that 'children' is passed and is a valid React node
};

export default ProtectedRoute;
