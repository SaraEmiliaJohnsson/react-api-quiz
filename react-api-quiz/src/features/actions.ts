import { createAction } from "@reduxjs/toolkit";


const setCategory = createAction<number>('set category');
const resetCategory = createAction('reset category');

export { setCategory, resetCategory };