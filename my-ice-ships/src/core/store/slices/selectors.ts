import {RootState} from "..";

export const selectApp = (state: RootState) => state.app;

export const selectUser = (state: RootState) => state.user;