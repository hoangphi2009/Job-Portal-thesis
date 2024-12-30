import { createSlice } from "@reduxjs/toolkit";

const cvSlice = createSlice({
    name: "cv",
    initialState: {
        singleCv: {
            summery: "", // Default value
            professionalExperience: [], // Default value
            education: [],
            skills: [],
            languages: [],
        },
        cvs: [],
    },
    reducers: {
        // Update the entire singleCv object
        setSingleCv: (state, action) => {
            state.singleCv = action.payload || {
                personalDetails: { summery: "" },
                professionalExperience: [],
                education: [],
                skills: [],
                languages: [],
            };
        },

        // Cập nhật danh sách CV
        setCvs: (state, action) => {
            state.cvs = action.payload;
        },

        removeCv: (state, action) => {
            state.cvs = state.cvs.filter(cv => cv._id !== action.payload); // Remove CV based on ID
        },

        // Update the summary field in personalDetails
        updateSummery: (state, action) => {
            if (state.singleCv?.cv?.personalDetails) {
                state.singleCv.cv.personalDetails.summery = action.payload;
            }
        },

        // Update the professionalExperience array
        updateProfessionalExperience: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.singleCv = {
                    ...state.singleCv,
                    cv: {
                        ...state.singleCv.cv,
                        professionalExperience: action.payload, // Update the array
                    },
                };
            }
        },

        updateEducation: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.singleCv = {
                    ...state.singleCv,
                    cv: {
                        ...state.singleCv.cv,
                        education: action.payload, // Update the array
                    },
                };
            }
        },

        // Update the skills array
        updateSkills: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.singleCv = {
                    ...state.singleCv,
                    cv: {
                        ...state.singleCv.cv,
                        skills: action.payload, // Update the array
                    },
                };
            }
        },

        // Update the languages array
        updateLanguages: (state, action) => {
            if (Array.isArray(action.payload)) {
                state.singleCv = {
                    ...state.singleCv,
                    cv: {
                        ...state.singleCv.cv,
                        languages: action.payload, // Update the array
                    },
                };
            }
        },


        // Clear personal details
        clearPersonalDetails: (state) => {
            state.singleCv.personalDetails = {
                // summery: "",
            };
        },
    },
});

export const {
    setSingleCv,
    setCvs,
    updateSummery,
    updateProfessionalExperience,
    clearPersonalDetails,
    updateEducation,
    updateSkills,
    removeCv,
    updateLanguages,
} = cvSlice.actions;

export default cvSlice.reducer;
