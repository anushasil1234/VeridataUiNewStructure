import { createSlice} from "@reduxjs/toolkit"

const FunctionSlice = createSlice({
    name: "functionSlice",
    initialState: [],
    reducers: {
        storeFunction(state, action) {
            state.push(action.payload);
        },
        removeFunction(state, action) {
            state.pop();
        },
    }
})

export default FunctionSlice.reducer
export const {storeFunction, removeFunction} = FunctionSlice.actions;