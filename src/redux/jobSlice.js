import { createSlice } from "@reduxjs/toolkit";
const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        singleJob: null,
        allRecruiterJob: [],
        searchJobByText: "",
        allAppliedJobs: [],
        searchedQuery: "",
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload
        },
        setAllRecruiterJob: (state, action) => {
            state.allRecruiterJob = action.payload
        },
        setSearchJobByText: (state, action) => {
            state.searchJobByText = action.payload
        },
        setAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload
        },
        deleteJob: (state, action) => {
            state.allJobs = state.allJobs.filter(job => job._id !== action.payload);
            state.allRecruiterJob = state.allRecruiterJob.filter(job => job._id !== action.payload);
        },
    }
});
export const { setAllJobs, setSingleJob, setAllRecruiterJob, setSearchJobByText, setAppliedJobs, setSearchedQuery, deleteJob } = jobSlice.actions;
export default jobSlice.reducer;