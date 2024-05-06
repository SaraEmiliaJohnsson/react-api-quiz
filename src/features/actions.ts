import { createAction } from "@reduxjs/toolkit";

export interface Category {
    id: number;
    name: string;
}

const setSelectedCategory = createAction<Category>('set selected category');

const setCategory = createAction<number>('set category');
const resetCategory = createAction('reset category');
const setCategoryId = createAction<number>('set categoryId');


export { setSelectedCategory, setCategory, resetCategory, setCategoryId };