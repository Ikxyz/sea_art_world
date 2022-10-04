import { createSlice } from '@reduxjs/toolkit';




interface INavigationState {
    isNaveOpen: boolean;
}


const initialState: INavigationState = {
    isNaveOpen: false
}

const navigationSlice = createSlice({
    name: "navigation",
    initialState: initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.isNaveOpen = !state.isNaveOpen;
        }
    }
});


export const { toggleSidebar } = navigationSlice.actions;

export default navigationSlice.reducer;
