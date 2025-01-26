import { Company } from "../models/company.model.js";

import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required",
                success: false
            })
        };
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "Company already exists",
                success: false
            })
        };
        company = await Company.create({
            name: companyName,
            userId: req.id
        });
        return res.status(201).json({
            message: "Company created successfully",
            company,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}
export const getCompany = async (req, res) => {
    try {
        const userId = req.id;
        //findOne = find only one
        //find = find all
        const companies = await Company.find({ userId })
        if (!companies) {
            return res.status(400).json({
                message: "Company not found",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
//admin
export const getAllCompanies = async (req, res) => {
    try {
        // Check if the user is an admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                message: "You are not authorized to view all companies.",
                success: false,
            });
        }

        // Retrieve all companies from the database
        const companies = await Company.find({});

        // Check if there are any companies found
        if (!companies || companies.length === 0) {
            return res.status(404).json({
                message: "No companies found.",
                success: false,
            });
        }

        // Return the list of all companies
        return res.status(200).json({
            message: "All companies retrieved successfully.",
            companies,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while retrieving the companies.",
            success: false,
        });
    }
};

//get company by ID
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(400).json({
                message: "Company not found",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error)
    }
}
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;

        const file = req.file;
        // idhar cloudinary ayega
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;

        const updateData = { name, description, website, location, logo };

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            message: "Company information updated.",
            success: true
        })

    } catch (error) {
        console.log(error);
    }
}
//delete company by id
export const deleteCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id; // Get the company ID from the route parameters
        const userId = req.id; // Assuming the authenticated user's ID is available in req.id

        // Find the company by its ID
        const company = await Company.findById(companyId);

        // Check if the company exists
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false,
            });
        }

        // Check if the authenticated user is the recruiter who created the company
        if (company.userId.toString() !== userId) {
            return res.status(403).json({
                message: "You are not authorized to delete this company.",
                success: false,
            });
        }

        // Proceed to delete the company
        await Company.findByIdAndDelete(companyId);

        return res.status(200).json({
            message: "Company deleted successfully.",
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "An error occurred while deleting the company.",
            success: false,
        });
    }
};
