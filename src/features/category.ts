import { createReducer } from "@reduxjs/toolkit";
import { setCategory, resetCategory } from "./actions";
import { setCategoryId, setSelectedCategory, Category } from "./actions";

interface State {
    selectedCategoryId: number | null;
    categoryId: number | null;
    setSelectedCategory: Category | null;
}

const initialState: State = {
    selectedCategoryId: null,
    categoryId: null,
    setSelectedCategory: null
};

const categoryReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setCategory, (state, action) => {
            state.selectedCategoryId = action.payload;
        })
        .addCase(resetCategory, (state) => {
            state.selectedCategoryId = null;
        })
        .addCase(setCategoryId, (state, action) => {
            state.categoryId = action.payload;
        })
        .addCase(setSelectedCategory, (state, action) => {
            state.setSelectedCategory = action.payload;
        });
});

export { categoryReducer };