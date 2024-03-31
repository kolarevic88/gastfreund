import { createSlice } from '@reduxjs/toolkit'
import columns from "../data/columns";
import {Column} from "../interfaces/interfaces";

const initialState: Column[] = columns

const columnsSlice = createSlice({
    name: 'columns',
    initialState,
    reducers: {},
})
export default columnsSlice.reducer
