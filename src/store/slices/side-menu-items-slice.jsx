import { createSlice} from "@reduxjs/toolkit"

const sideMenuItemsSlice = createSlice({
    name: "SideMenuItemsSlice",
    initialState: [],
    reducers: {
        storeSideMenuItems(state, action) {
            state.push(action.payload);
        },
        removeSideMenuItems(state) {
            state.pop();

        }
    }
})


export default sideMenuItemsSlice.reducer
export const {storeSideMenuItems, removeSideMenuItems} = sideMenuItemsSlice.actions;