import { createSlice} from "@reduxjs/toolkit"

const SetDropDownFunctionSlice = createSlice({
    name: "setDropDownFunctionSlice",
    initialState: [],
    reducers: {
        storeSetDropDownFunction(state, action) {
            state.push(action.payload);
        },
        removeSetDropDownFunction(state, action) {
            state.pop();
        },
    }
})

export default SetDropDownFunctionSlice.reducer
export const {storeSetDropDownFunction, removeSetDropDownFunction} = SetDropDownFunctionSlice.actions;