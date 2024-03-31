import { configureStore } from '@reduxjs/toolkit'
import columnsSlice from './columnSlice';
import tasksSlice from './tasksSlice'




export const store = configureStore({
    reducer: {
        columns: columnsSlice,
        tasks: tasksSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
