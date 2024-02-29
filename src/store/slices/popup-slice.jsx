import { createSlice} from "@reduxjs/toolkit"

const PopUpSlice = createSlice({
    name: "PopUpSlice",
    initialState: [],
    reducers: {
        storePopUpSetFunction(state, action) {
            state.push(action.payload);
        },
        removePopUpSetFunction(state) {
            state.pop();
        },
    }
})

export default PopUpSlice.reducer
export const {storePopUpSetFunction, removePopUpSetFunction} = PopUpSlice.actions;