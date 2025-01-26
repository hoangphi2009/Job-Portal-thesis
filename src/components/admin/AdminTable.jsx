import {
  APPLICATION_API_END_POINT,
  USER_API_END_POINT,
} from "@/utils/constant";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
const AdminTable = () => {
  const [jobApplicantDetails, setJobApplicantDetails] = useState([]);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const getAppliedByAdmin = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/gets/admin/applied`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success && res.data.jobApplicantDetails) {
        setJobApplicantDetails(res.data.jobApplicantDetails);
      } else {
        setError("Failed to fetch applicants");
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };
  const getAllUsers = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/users`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res?.data?.success) {
        setUsers(res.data.users);
      } else {
        setError("Failed to fetch users");
      }
    } catch (error) {
      console.error(error);
      setError(error.message || "An error occurred while fetching users");
    }
  };
  useEffect(() => {
    getAppliedByAdmin();
    getAllUsers();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }
  // Prepare data for the chart
  const chartData = jobApplicantDetails.map((job) => ({
    name: job.jobTitle,
    Applicants: job.numberOfApplicants,
  }));
  console.log(chartData);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredApplicants = jobApplicantDetails.map((job) => ({
    ...job,
    applicants: job.applicants.filter((applicant) =>
      applicant.fullName.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  }));
  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      <div className="bg-white border border-gray-100 p-4 rounded-lg shadow-lg">
        <div className="flex items-center text-gray-950 justify-between w-full px-4">
          <h2>Total Applicants</h2>
          <Input
            className="w-40"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <h1 className="font-bold text-red-600 text-3xl">
            {jobApplicantDetails.reduce(
              (acc, job) => acc + job.numberOfApplicants,
              0
            )}
          </h1>
        </div>
        <table className="w-full block mt-4 text-sm text-left text-black dark:text-whie-500">
          <thead className="w-full block text-xs text-black uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                Job Title
              </th>
              <th scope="col" className="px-28 py-3">
                Applicants
              </th>
              <th scope="col" className="px-4 py-3">
                Applied Date
              </th>
            </tr>
          </thead>
          <tbody className=" block w-full max-h-[400px] overflow-y-auto">
            {filteredApplicants.map((job) =>
              job.applicants.length > 0 ? (
                job.applicants.map((applicant) => (
                  <tr key={applicant.fullName} className="bg-white border-b">
                    <td className="px-6 py-4">{job.jobTitle}</td>
                    <td className="px-6 py-4">{applicant.fullName}</td>
                    <td className="px-16 py-4">
                      {new Date(applicant.appliedDate).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr key={job.jobId} className="bg-white border-b">
                  <td className="px-6 py-4">{job.jobTitle}</td>
                  <td className="px-6 py-4 text-red-500">No applicants</td>
                  <td className="px-6 py-4">-</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <div className="bg-white border border-gray-200 p-6 rounded-lg shadow-xl">
        <div className="flex flex-col items-center justify-center">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f1f1" />
              <XAxis
                dataKey="name"
                tick={{
                  fontSize: 12,
                  fill: "#333",
                  angle: -45,
                  textAnchor: "end",
                }}
                height={100}
                interval={0}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 14, fill: "#333" }}
                domain={[0, users.length]}
              />
              <Tooltip
                wrapperStyle={{
                  fontSize: "14px",
                  backgroundColor: "#ffffff",
                  border: "1px solid #ddd",
                  borderRadius: "5px",
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: "14px", fontWeight: "bold", top: 0 }}
              />
              <Bar dataKey="Applicants" fill="#4a90e2" barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h1>X-Axis: Name of Jobs</h1>
          <h1>Y-Axis: Number of Users</h1>
          <h1>Legend: Number of Applicants</h1>
          <h1 className="text-center text-lg font-normal text-gray-950 mt-2">
            Bar Chart of Applicants
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AdminTable;
