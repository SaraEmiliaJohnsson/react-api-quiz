import { createReducer } from "@reduxjs/toolkit";
import { setCategory, resetCategory } from "./actions";

interface State {
    selectedCategoryId: number | null;
}

const initialState: State = {
    selectedCategoryId: null
};

const categoryReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setCategory, (state, action) => {
            state.selectedCategoryId = action.payload;
        })
        .addCase(resetCategory, (state) => {
            state.selectedCategoryId = null;
        });
});

export { categoryReducer };