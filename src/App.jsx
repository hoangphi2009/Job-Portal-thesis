import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/authentication/Login";
import Signup from "./components/authentication/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";
import JobDescription from "./components/JobDescription";
import Companies from "./components/recruiter/Companies";
import CompanyCreate from "./components/recruiter/CompanyCreate";
import CompanySetup from "./components/recruiter/CompanySetup";
import RecruiterJobs from "./components/recruiter/RecruiterJobs";
import PostJob from "./components/recruiter/PostJob";
import Applicants from "./components/recruiter/Applicants";
import ProtectedRoute from "./components/recruiter/ProtectedRoute";
import { ThemeProvider } from "./components/ThemeProvider";
import Tool from "./components/cvpage/Tool";
import PersonalCvSetup from "./components/cvpage/PersonalCvSetup";
import ViewCV from "./components/cvpage/ViewCV";
import ChatBox from "./components/chatbox/ChatBox";
import AdminPage from "./components/admin/AdminPage";
import StudentManagment from "./components/admin/userManagment/StudentManagment";
import JobManagment from "./components/admin/jobManagment/JobManagment";
import JobDescriptionByAdmin from "./components/admin/jobManagment/JobDescriptionByAdmin";
import PostJobByAdmin from "./components/admin/jobManagment/PostJobByAdmin";
import UserManagment from "./components/admin/userManagment/UserManagment";
import CompanyManagment from "./components/admin/companyManagment/CompanyManagment";
import RecruiterManagment from "./components/admin/userManagment/RecruiterManagment";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/jobs",
    element: <Jobs />,
  },
  {
    path: "/description/:id",
    element: <JobDescription />,
  },
  {
    path: "/browse",
    element: <Browse />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  //CV Page
  {
    path: "/tool",
    element: <Tool />,
  },
  {
    path: "/cv/:id",
    element: <PersonalCvSetup />,
  },
  {
    path: "/cv/:id/view",
    element: <ViewCV />,
  },

  //admin
  {
    path: "/admin",
    element: <AdminPage />,
  },
  {
    path: "/admin/students",
    element: <StudentManagment />,
  },
  {
    path: "/admin/recruiters",
    element: <RecruiterManagment />,
  },
  {
    path: "/admin/users",
    element: <UserManagment />,
  },
  {
    path: "/admin/jobs",
    element: <JobManagment />,
  },
  {
    path: "/admin/companies",
    element: <CompanyManagment />,
  },
  {
    path: "/admin/description/:id",
    element: <JobDescriptionByAdmin />,
  },
  {
    path: "/admin/jobs/create",
    element: <PostJobByAdmin />,
  },

  //recruiter
  {
    path: "/recruiter/companies",
    element: (
      <ProtectedRoute>
        <Companies />
      </ProtectedRoute>
    ),
  },
  {
    path: "/recruiter/companies/create",
    element: (
      <ProtectedRoute>
        <CompanyCreate />
      </ProtectedRoute>
    ),
  },
  {
    path: "/recruiter/companies/:id",
    element: (
      <ProtectedRoute>
        <CompanySetup />{" "}
      </ProtectedRoute>
    ),
  },
  {
    path: "/recruiter/jobs",
    element: (
      <ProtectedRoute>
        <RecruiterJobs />
      </ProtectedRoute>
    ),
  },
  {
    path: "/recruiter/jobs/create",
    element: (
      <ProtectedRoute>
        <PostJob />{" "}
      </ProtectedRoute>
    ),
  },
  {
    path: "/recruiter/jobs/:id/applicants",
    element: (
      <ProtectedRoute>
        <Applicants />{" "}
      </ProtectedRoute>
    ),
  },
]);
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="relative">
        <ChatBox />
      </div>
      <RouterProvider router={appRouter} />
    </ThemeProvider>
  );
}

export default App;
