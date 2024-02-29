import { createSlice} from "@reduxjs/toolkit"

const ActionRouteSlice = createSlice({
    name: "ActionRouteSlice",
    initialState: [],
    reducers: {
        storeActionRoute(state, action) {
            state.push(action.payload);
        },
        removeActionRoute(state, action) {
            state.pop();
        },
    }
})

export default ActionRouteSlice.reducer
export const {storeActionRoute, removeActionRoute} = ActionRouteSlice.actions;