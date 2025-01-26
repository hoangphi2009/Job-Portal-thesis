import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import sendMail from "../mail/mail.js";
export const applyJob = async (req,res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        };
        // check if the user has already applied for the job
        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: userId
        });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job.",
                success: false
            })
        };
        // check if the jobs exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        // create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });

        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message: "Job applied successfully.",
            success: true
        })
    } catch (error) {
        console.log(error)
    }
};

export const getAppliedJobs = async (req,res) =>{
    try {
        const userId = req.id;
        const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options: {sort:{ createdAt: -1 }},
            populate:{
                path:'company',
                options: { sort: { createdAt: -1 } },
            }
        });
        if(!application){
            return res.status(404).json({
                message: "No application found.",
                success: false
            })
        }
        return res.status(200).json({
            application,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
//recruiter
export const getApplicants = async (req,res)=>{
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant',
            }
        })
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            })
        }
        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateStatus = async (req,res)=>{
    try {
        const {status} =  req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({
                message: "Status is required.",
                success: false
            })
        }
        const application = await Application.findById(applicationId);
        if(!application){
            return res.status(404).json({
                message: "Application not found.",
                success: false
            })
        }
        // Store the previous status for the email notification
        const previousStatus = application.status; 

        application.status = status.toLowerCase();
        await application.save();

        const user = await User.findById(application.applicant);
        
        await sendMail({
            email: user?.email,
            subject: "Application Status Update",
            html: `
                <h1>Your application status has been updated!</h1>
                <p>Previous Status: ${previousStatus}</p>
                <p>New Status: ${status}</p>
            `
        });

        return res.status(200).json({
            message: "Application status updated successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// admin
export const getAllApplicantsByAdmin = async (req, res) => {
    try {
        // Kiểm tra xem người dùng có phải là admin không
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                message: "Access denied. Only admins can perform this action.",
                success: false
            });
        }

        // Truy vấn tìm tất cả người dùng có role là 'student'
        const students = await User.find({ role: 'student' }).sort({ createdAt: -1 });

        if (students.length === 0) {
            return res.status(404).json({
                message: "No students found.",
                success: false
            });
        }
        return res.status(200).json({
            students,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while retrieving students.",
            success: false
        });
    }
};
export const getAppliedByAdmin = async (req, res) => {
    try {
        // Kiểm tra xem người dùng có phải là admin không
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                message: "Access denied. Only admins can perform this action.",
                success: false
            });
        }

        // Tìm tất cả các công việc và lấy thông tin chi tiết của ứng viên cho mỗi công việc
        const jobs = await Job.find().populate({
            path: 'applications',
            populate: {
                path: 'applicant',
                select: 'fullname' // Thay đổi để lấy tên đầy đủ của ứng viên
            }
        });

        // Tạo một mảng với thông tin về số lượng ứng viên và thông tin chi tiết cho mỗi công việc
        const jobApplicantDetails = jobs.map(job => {
            const applicants = job.applications.map(application => {
                return {
                    fullName: application.applicant.fullname, // Lấy tên đầy đủ của ứng viên
                    appliedDate: application.createdAt // Lấy thời gian ứng tuyển
                };
            });
            return {
                jobId: job._id,
                jobTitle: job.title,
                numberOfApplicants: job.applications.length, // Đếm số lượng ứng viên
                applicants: applicants // Thông tin chi tiết về từng ứng viên
            };
        });

        return res.status(200).json({
            jobApplicantDetails,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "An error occurred while retrieving the job applicants details.",
            success: false
        });
    }
};

