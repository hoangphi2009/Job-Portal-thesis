import { Job } from "../models/job.model.js";
export const postJob = async (req, res) => {
    try {
        const { title, description, requirements, salary, experience, jobType, location, position, companyId } = req.body;
        const userId = req.id;
        if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
            return res.status(400).json({
                message: "Somethin is missing.",
                success: false
            })
        };
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId
        });

        return res.status(201).json({
            message: "Job created successfully",
            job,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
        };

        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            jobs,
            success: true,
            message: jobs.length ? "Jobs found." : "No jobs found for the specified keyword."
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while fetching jobs.",
            success: false
        });
    }
};


//user
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
        });
        console.log(job);
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            })
        };
        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}
// admin
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ created_by: adminId })
            .sort({ createdAt: -1 })  // Apply sorting by creation date
            .populate('company');

        // Return an empty list if no jobs found, rather than a 404 error
        return res.status(200).json({
            jobs: jobs || [],  // Default to an empty array if no jobs found
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while retrieving jobs.",
            success: false,
        });
    }
};

//delete job by id
export const deleteJobById = async (req, res) => {
    try {
        const jobId = req.params.id; // Get the job ID from the route parameters
        const userId = req.id; // Assuming the authenticated user's ID is available in req.id

        // Find the job by its ID
        const job = await Job.findById(jobId);

        // Check if the job exists
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false,
            });
        }

        // Check if the authenticated user is the creator of the job
        if (job.created_by.toString() !== userId) {
            return res.status(403).json({
                message: "You are not authorized to delete this job.",
                success: false,
            });
        }

        // Delete the job
        await Job.findByIdAndDelete(jobId);

        return res.status(200).json({
            message: "Job deleted successfully.",
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while deleting the job.",
            success: false,
        });
    }
};

