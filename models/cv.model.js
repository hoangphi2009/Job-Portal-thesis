import mongoose from "mongoose";

const cvSchema = new mongoose.Schema({
    title: String,
    personalDetails: {
        firstName: String,
        lastName: String,
        jobTitle: String,
        address: String,
        phone: String,
        email: String,
        summery: String
    },
    professionalExperience: [
        {
            title: String,
            company: String,
            location: String,
            startDate: Date,
            endDate: Date,
            description: String,
        },
    ],
    education: [{
        degree: String,
        school: String,
        location: String,
        startDate: Date,
        endDate: Date,
    }],
    skills: [
        {
            skill: String,
            level: String
        }
    ],
    languages: [
        {
            language: String,
            level: String
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, { timestamps: true });
export const Cv = mongoose.model("Cv", cvSchema);


