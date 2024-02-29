import { createSlice} from "@reduxjs/toolkit"

const LoggedinTokenData = createSlice({
    name: "loggedinTokenData",
    initialState: [],
    reducers: {
        storeLoggedinTokenData(state, action) {
            state.push(action.payload);
        },
        removeLoggedinTokenData(state, action) {
            state.pop();
        },
    }
})

export default LoggedinTokenData.reducer
export const {storeLoggedinTokenData, removeLoggedinTokenData} = LoggedinTokenData.actions;