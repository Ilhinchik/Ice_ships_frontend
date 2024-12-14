import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IUser {
    username: string;
    isManager: boolean;
}

const initialState: IUser = {
    isManager: false,
    username: "",
};

export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        refreshUser: (state) => {
            state.isManager = false;
            state.username = "";
        },
        saveUser: (state, action: PayloadAction<IUser>) => {
            state.username = action.payload.username;
            state.isManager = action.payload.isManager;
        },
    },
});

export const {
    saveUser,
    refreshUser,
} = userSlice.actions;