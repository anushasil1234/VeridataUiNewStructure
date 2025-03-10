
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPageNo: 1, // Default page number
};

const CandidatePageSlice = createSlice({
  name: "CandidatePageSlice",
  initialState,
  reducers: {
    storeCurrentPageNo: (state, action) => {
      state.currentPageNo = action.payload;
    },
  },
});

export const { storeCurrentPageNo } = CandidatePageSlice.actions;
export default CandidatePageSlice.reducer;
