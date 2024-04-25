import { createReducer } from "@reduxjs/toolkit";
import { createAction } from "@reduxjs/toolkit";


const setCategory = createAction<number>('set category');

const actions = { setCategory };

interface State {
    selectedCategoryId: number | null;
}

const initialState: State = {
    selectedCategoryId: null
};

const reducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setCategory, (state, action) => {
            state.selectedCategoryId = action.payload;
        });
});

export { reducer, actions };