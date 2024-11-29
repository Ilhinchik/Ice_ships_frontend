import {createSlice, PayloadAction} from "@reduxjs/toolkit";
export interface IAppData {
    searchShipTitle: string;
}
const initialState: IAppData = {
    searchShipTitle: "",
};
export const appSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        refreshApp: (state) => {
            state.searchShipTitle = "";
        },
        saveSearchShipTitle: (state, action: PayloadAction<string>) => {
            state.searchShipTitle = action.payload;
        },
    },
});
export const {
    refreshApp,
    saveSearchShipTitle
} = appSlice.actions;