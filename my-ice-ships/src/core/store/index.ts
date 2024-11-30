import {configureStore, combineReducers} from '@reduxjs/toolkit'
import {
    TypedUseSelectorHook,
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector,
} from "react-redux";
import {appSlice} from './slices/appSlice';
const rootReducer = combineReducers({
    app: appSlice.reducer,
})
export const store = configureStore({
    reducer: rootReducer,
})
export type RootState = ReturnType<typeof store.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<typeof store.dispatch>();