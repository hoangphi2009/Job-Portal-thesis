import { Cv } from "../models/cv.model.js";

export const registerCV = async (req, res) => {
    const { title } = req.body;
    const userId = req.id;

    if (!userId) {
        return res.status(400).json({
            message: "User ID is required",
            success: false
        });
    }

    if (!title) {
        return res.status(400).json({
            message: "Title is required",
            success: false
        });
    }

    try {
        let cv = await Cv.findOne({ title, userId });
        if (cv) {
            return res.status(400).json({
                message: "CV already exists",
                success: false
            });
        }

        cv = new Cv({
            title,
            userId
        });

        await cv.save();

        return res.status(201).json({
            message: "CV created successfully",
            cv,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error creating CV",
            success: false
        });
    }
};
export const updatePersonalDetailsCV = async (req, res) => {
    const cvId = req.params.cvId;
    const { firstName, lastName, jobTitle, address, phone, email, summery } = req.body;

    if (!cvId) {
        return res.status(400).json({
            message: "CV ID is required",
            success: false
        });
    }

    try {
        const cv = await Cv.findById(cvId);
        if (!cv) {
            return res.status(404).json({
                message: "CV not found",
                success: false
            });
        }


        cv.personalDetails.firstName = firstName || cv.personalDetails.firstName;
        cv.personalDetails.lastName = lastName || cv.personalDetails.lastName;
        cv.personalDetails.jobTitle = jobTitle || cv.personalDetails.jobTitle;
        cv.personalDetails.address = address || cv.personalDetails.address;
        cv.personalDetails.phone = phone || cv.personalDetails.phone;
        cv.personalDetails.email = email || cv.personalDetails.email;
        cv.personalDetails.summery = summery ?? cv.personalDetails.summery;


        await cv.save();

        return res.status(200).json({
            message: "Personal details updated successfully",
            cv,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error updating CV",
            success: false
        });
    }

};
export const updateProfeExpCV = async (req, res) => {
    const cvId = req.params.cvId;
    const { professionalExperience } = req.body;  // Array of professional experiences

    // Ensure CV ID is provided
    if (!cvId) {
        return res.status(400).json({
            message: "CV ID is required",
            success: false
        });
    }

    // Ensure the professionalExperience is an array
    if (!Array.isArray(professionalExperience)) {
        return res.status(400).json({
            message: "Professional experiences must be an array",
            success: false
        });
    }

    try {
        const cv = await Cv.findById(cvId);
        if (!cv) {
            return res.status(404).json({
                message: "CV not found",
                success: false
            });
        }

        // Validate the individual entries in professionalExperience array
        const updatedExperience = professionalExperience.map(exp => {
            if (typeof exp.title !== "string" || typeof exp.company !== "string") {
                throw new Error("Invalid title or company name format");
            }

            const startDate = exp.startDate ? new Date(exp.startDate) : null;
            const endDate = exp.endDate ? new Date(exp.endDate) : null;

            if (startDate && isNaN(startDate)) {
                throw new Error("Invalid start date format");
            }
            if (endDate && isNaN(endDate)) {
                throw new Error("Invalid end date format");
            }

            // Ensure description is a string (default to empty string if missing)
            return {
                title: exp.title || '',
                company: exp.company || '',
                location: exp.location || '',
                startDate: startDate,
                endDate: endDate,
                description: typeof exp.description === "string" ? exp.description : ''
            };
        });

        // Update the professionalExperience field in the CV document
        cv.professionalExperience = updatedExperience;

        // Save the updated CV
        await cv.save();

        return res.status(200).json({
            message: "Professional experiences updated successfully",
            professionalExperience: cv.professionalExperience, // Return the updated professionalExperience array
            success: true
        });
    } catch (error) {
        console.error("Error updating professional experiences:", error);
        return res.status(500).json({
            message: `Error updating professional experiences: ${error.message}`,
            success: false
        });
    }
};



export const updateEducationCV = async (req, res) => {
    const cvId = req.params.cvId; // CV ID from URL parameter
    const educationEntries = req.body.education; // Education array from request body

    if (!cvId) {
        return res.status(400).json({
            message: "CV ID is required",
            success: false
        });
    }

    try {
        const cv = await Cv.findById(cvId);
        if (!cv) {
            return res.status(404).json({
                message: "CV not found",
                success: false
            });
        }

        // Iterate over each education entry from the request
        educationEntries.forEach(entry => {
            const { educationId, degree, school, location, startDate, endDate } = entry;

            if (educationId) {
                // Update existing education entry if `educationId` is provided
                const educationEntry = cv.education.id(educationId);
                if (educationEntry) {
                    educationEntry.degree = degree || educationEntry.degree;
                    educationEntry.school = school || educationEntry.school;
                    educationEntry.location = location || educationEntry.location;
                    educationEntry.startDate = startDate ? new Date(startDate) : educationEntry.startDate;
                    educationEntry.endDate = endDate ? new Date(endDate) : educationEntry.endDate;
                } else {
                    return res.status(404).json({
                        message: `Education entry with ID ${educationId} not found`,
                        success: false
                    });
                }
            } else {
                // Add new education entry if `educationId` is not provided
                cv.education.push({
                    degree,
                    school,
                    location,
                    startDate: new Date(startDate),
                    endDate: new Date(endDate)
                });
            }
        });

        await cv.save();
        return res.status(200).json({
            message: "Education details updated successfully",
            cv,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error updating education details",
            success: false
        });
    }
};


export const updateSkillCV = async (req, res) => {
    const cvId = req.params.cvId;
    const { skills, languages } = req.body;

    if (!cvId) {
        return res.status(400).json({
            message: "CV ID is required",
            success: false
        });
    }

    console.log('Received data:', { cvId, skills, languages });

    try {
        const cv = await Cv.findById(cvId);
        if (!cv) {
            return res.status(404).json({
                message: "CV not found",
                success: false
            });
        }

        // Ensure skills and languages are always arrays (in case they're null in DB)
        cv.skills = cv.skills || [];
        cv.languages = cv.languages || [];

        // Update skills: append new skills ensuring no duplicates based on both skill and level
        skills.forEach(skillItem => {
            const existingSkill = cv.skills.find(existing => existing.skill === skillItem.skill);
            if (existingSkill) {
                // If the skill already exists, update its level
                existingSkill.level = skillItem.level;
            } else {
                // If the skill does not exist, add it
                cv.skills.push(skillItem);
            }
        });

        // Update languages: append new languages ensuring no duplicates based on both language and level
        languages.forEach(languageItem => {
            const existingLanguage = cv.languages.find(existing => existing.language === languageItem.language);
            if (existingLanguage) {
                // If the language already exists, update its level
                existingLanguage.level = languageItem.level;
            } else {
                // If the language does not exist, add it
                cv.languages.push(languageItem);
            }
        });

        await cv.save();  // Save changes to DB

        return res.status(200).json({
            message: "Skills and languages updated successfully",
            cv,
            success: true
        });
    } catch (error) {
        console.error('Error updating skills and languages:', error);
        return res.status(500).json({
            message: "Error updating skills and languages",
            success: false
        });
    }
};




export const deleteCV = async (req, res) => {
    const cvId = req.params.cvId;

    if (!cvId) {
        return res.status(400).json({
            message: "CV ID is required",
            success: false
        });
    }

    try {
        const result = await Cv.findByIdAndDelete(cvId);
        if (!result) {
            return res.status(404).json({
                message: "CV not found",
                success: false
            });
        }

        return res.status(200).json({
            message: "CV deleted successfully",
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error deleting CV",
            success: false
        });
    }
};

export const getAllCVs = async (req, res) => {
    const userId = req.id; // Assuming `req.id` contains the authenticated user's ID

    if (!userId) {
        return res.status(400).json({
            message: "User ID is required",
            success: false
        });
    }

    try {
        // Find all CVs that belong to the authenticated user
        const cvs = await Cv.find({ userId }).exec();

        if (!cvs || cvs.length === 0) {
            return res.status(404).json({
                message: "No CVs found for this user",
                success: false
            });
        }

        return res.status(200).json({
            message: "Cvs fetched successfully",
            cvs,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error fetching CVs",
            success: false
        });
    }
};
export const getCVById = async (req, res) => {
    const userId = req.id; 
    const cvId = req.params.cvId;

    if (!userId) {
        return res.status(400).json({
            message: "User ID is required",
            success: false
        });
    }
    try {
        // Find the CV by ID
        const cv = await Cv.findById(cvId).exec();
        if (!cv) {
            return res.status(404).json({
                message: "CV not found",
                success: false
            });
        }
        return res.status(200).json({
            message: "CV fetched successfully",
            cv,
            success: true
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Error fetching CV",
            success: false
        });
    }
};

export const getAllCVsForAdmin = async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({
            message: "Access denied. Admin privileges required.",
            success: false
        });
    }

    try {
        // Fetch all CVs from the database without filtering by userId
        const allCVs = await Cv.find({}).exec();

        if (!allCVs || allCVs.length === 0) {
            return res.status(404).json({
                message: "No CVs found",
                success: false
            });
        }

        return res.status(200).json({
            message: "All CVs fetched successfully",
            cvs: allCVs,
            success: true
        });
    } catch (error) {
        console.error("Error fetching all CVs:", error);
        return res.status(500).json({
            message: "Error fetching all CVs",
            success: false
        });
    }
};