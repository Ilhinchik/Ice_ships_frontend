import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {v4 as uuidv4} from "uuid";

export interface INotification {
    id: string;
    message: string;
    isError: boolean;
}

export interface IAppData {
    searchShipTitle: string;
    filterIStatus?: string;
    filterIStartDate?: string;
    filterIEndDate?: string;
    notifications: INotification[];
}

const initialState: IAppData = {
    searchShipTitle: "",
    filterIStatus: undefined,
    filterIStartDate: undefined,
    filterIEndDate: undefined,
    notifications: [],
};

export const appSlice = createSlice({
    name: "appSlice",
    initialState,
    reducers: {
        refreshApp: (state) => {
            state.searchShipTitle = "";
            state.filterIStatus = undefined;
            state.filterIStartDate = undefined;
            state.filterIEndDate = undefined;
        },
        saveSearchShipTitle: (state, action: PayloadAction<string>) => {
            state.searchShipTitle = action.payload;
        },
        saveFilterIStatus: (state, action: PayloadAction<string>) => {
            state.filterIStatus = action.payload;
        },
        saveFilterIStartDate: (state, action: PayloadAction<string>) => {
            state.filterIStartDate = action.payload;
        },
        saveFilterIEndDate: (state, action: PayloadAction<string>) => {
            state.filterIEndDate = action.payload;
        },
        addNotification: (
            state,
            action: PayloadAction<{ message: string; isError?: boolean }>
        ) => {
            state.notifications.push({
                message: action.payload.message,
                id: uuidv4(),
                isError: action.payload.isError || false,
            });
        },
        deleteNotification: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            const queue = state.notifications;
            state.notifications = queue.filter((item) => item.id !== id);
        },
    },
});

export const {
    refreshApp,
    saveSearchShipTitle,
    saveFilterIStatus,
    saveFilterIStartDate,
    saveFilterIEndDate,
    addNotification,
    deleteNotification,
} = appSlice.actions;