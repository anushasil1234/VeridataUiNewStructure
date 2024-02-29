import { createSlice} from "@reduxjs/toolkit"

const CommonHooksFunctionSlice = createSlice({
    name: "CommonHooksFunctionSlice",
    initialState: [],
    reducers: {
        storeCommonHooksFunction(state, action) {
            state.push(action.payload);
        },
        removeCommonHooksFunction(state) {
            state = []
        },
    }
})


export default CommonHooksFunctionSlice.reducer
export const {storeCommonHooksFunction, removeCommonHooksFunction} = CommonHooksFunctionSlice.actions;