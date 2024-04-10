import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Question } from "../types/question"

interface QaState {
    qaList: Question[];
}

const initialState = {
    qaList: []
} as QaState;

export const questionSlice = createSlice({
    name: 'questions',
    initialState,
    reducers: {
        add: (state, action: PayloadAction<Question>) => {
            if (action.payload.prompt !== undefined) {
                if (state.qaList.length === 1 && state.qaList.at(0)?.prompt === undefined) {
                    state.qaList.pop();
                }
                state.qaList.push(action.payload);
            }
            console.log('add:', state.qaList.length);
        },
        pop: (state) => {
            state.qaList.pop();
            console.log('pop:',state.qaList.length);
        },
        clear: () => initialState,
    }
});

export const { add, clear, pop } = questionSlice.actions;
export default questionSlice.reducer;