// import { createSlice} from "@reduxjs/toolkit"

// const FunctionSlice = createSlice({
//     name: "functionSlice",
//     initialState: [],
//     reducers: {
//         storeFunction(state, action) {
//             state.push(action.payload);
//         },
//         removeFunction(state, action) {
//             state.pop();
//         },
//     }
// })

// export default FunctionSlice.reducer
// export const {storeFunction, removeFunction} = FunctionSlice.actions;
import { createSlice } from "@reduxjs/toolkit";

const FunctionSlice = createSlice({
    name: "functionSlice",
    initialState: [{}], // Ensure the initial state is always an array with an object
    reducers: {
        storeFunction(state, action) {
            state[0] = { ...state[0], ...action.payload }; // Merge new properties into index 0
        },
        removeFunction(state) {
            state[0] = {}; // Reset the object at index 0
        },
    }
});

export default FunctionSlice.reducer;
export const { storeFunction, removeFunction } = FunctionSlice.actions;

