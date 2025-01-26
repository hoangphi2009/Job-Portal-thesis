import React, { useState, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import "chart.js/auto"; // for Chart.js 3
import axios from "axios";
import { JOB_API_END_POINT, USER_API_END_POINT } from "@/utils/constant";

const AdminGraph = () => {
  const [recruitersCount, setRecruitersCount] = useState(0);
  const [jobs, setJobs] = useState([]);
  const [studentsCount, setStudentsCount] = useState(0);
  const [jobsByMonth, setJobsByMonth] = useState(Array(12).fill(0));
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const getRecruiters = axios.get(
        `${USER_API_END_POINT}/recruiters/admin`,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const getStudents = axios.get(`${USER_API_END_POINT}/students/admin`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      try {
        const [recruitersRes, studentsRes] = await Promise.all([
          getRecruiters,
          getStudents,
        ]);
        if (recruitersRes.data.success) {
          setRecruitersCount(recruitersRes.data.recruiters.length);
        } else {
          setError("Failed to fetch recruiters");
        }
        if (studentsRes.data.success) {
          setStudentsCount(studentsRes.data.students.length);
        } else {
          setError("Failed to fetch students");
        }
      } catch (error) {
        console.error(error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const data = {
    labels: ["Recruiters", "Students"],
    datasets: [
      {
        label: " of Accounts",
        data: [recruitersCount, studentsCount],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)", // Changed opacity to 0.8 for a darker shade
          "rgba(54, 162, 235, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // Kept full opacity for borders
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to expand fully in the div
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20, // Increase the padding around labels for more space
        },
      },
    },
  };

  if (error) {
    return <div>Error: {error}</div>;
  }
  const getAllJobs = async () => {
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/gets`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        processJobData(res.data.jobs);
        setJobs(res.data.jobs);
      } else {
        setError("Failed to fetch jobs");
      }
    } catch (error) {
      console.error(error);
      setError(error.message || "An error occurred while fetching jobs");
    }
  };
  // Process job data to count jobs per month
  const processJobData = (jobs) => {
    const monthCounts = Array(12).fill(0); // Initialize an array with 12 zeros for each month
    jobs.forEach((job) => {
      const month = new Date(job.createdAt).getMonth(); // Extract month from createdAt
      monthCounts[month]++;
    });
    setJobsByMonth(monthCounts);
  };

  useEffect(() => {
    getAllJobs(); // Call this function on component mount
  }, [ setError]); // eslint-disable-line react-hooks/exhaustive-deps

  // Data for the line chart
  const lineData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Jobs per Month",
        data: jobsByMonth,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,

      },
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom", // Moves the legend below the chart
        labels: {
          boxWidth: 20,
          padding: 20,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 1,
        max: 10,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="p-4 grid grid-cols-2 gap-4">
      <div className="text-white rounded-lg shadow-lg flex flex-col items-center p-4">
        <div className="flex items-center text-gray-950 justify-between w-full px-4">
          <h2>Total Accounts</h2>
          <h1 className="font-bold text-red-600 text-3xl">
            {recruitersCount + studentsCount}
          </h1>
        </div>
        <div className="w-full h-64">
          <Pie data={data} options={options} />
        </div>
        <h1 className="text-center text-lg font-normal text-gray-950 mt-2">
          Pie Chart of Account Numbers
        </h1>
      </div>
      <div className="text-white rounded-lg shadow-lg flex flex-col items-center p-4">
        <div className="flex items-center text-gray-950 justify-between w-full px-4">
          <h2>Total Jobs</h2>
          <h1 className="font-bold text-red-600 text-3xl">
            {jobs.length}
          </h1>
        </div>
        <div className="w-full h-64">
          <Line data={lineData} options={lineOptions} />
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Note: 1-10 represent the total number of jobs per month.
        </p>
        <h1 className="text-center text-lg font-normal text-gray-950 mt-2">
          Line Chart of Jobs Numbers
        </h1>
      </div>
    </div>
  );
};

export default AdminGraph;
