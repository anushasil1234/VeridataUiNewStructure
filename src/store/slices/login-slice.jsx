import { createSlice} from "@reduxjs/toolkit"

const LoggedinData = createSlice({
    name: "loggedinData",
    initialState: [],
    reducers: {
        storeLoggedinData(state, action) {
            state.push(action.payload);
        },
        removeLoggedinData(state, action) {
            state.pop();
        },
    }
})

export default LoggedinData.reducer
export const {storeLoggedinData, removeLoggedinData} = LoggedinData.actions;