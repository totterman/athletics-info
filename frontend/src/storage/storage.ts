import { configureStore } from "@reduxjs/toolkit";
import questionReducer from './questionSlice';

export const storage = configureStore({
    reducer: { question: questionReducer },
});

export type RootState = ReturnType<typeof storage.getState>;