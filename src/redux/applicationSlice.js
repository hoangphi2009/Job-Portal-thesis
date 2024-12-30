import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: 'application',
    initialState: {
        applicants: { applications: [] },  // Set a default structure with an empty array
    },
    reducers: {
        setAllApplicants: (state, action) => {
            state.applicants = action.payload || { applications: [] };  // Ensure it always has a valid structure
        }
    }
});

export const { setAllApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;
