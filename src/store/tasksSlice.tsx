import {createSelector, createSlice} from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import _ from "lodash";

import tasks from "../data/tasks";
import {Task} from "../interfaces/interfaces";
import {RootState} from "./store";
import {moveArray} from "../helpers/moveArray";
import {getDataFromLS, setDataFromLS} from "../helpers/localStorageAction";


const LSData = getDataFromLS('tasks');
const initialState: Task[] = LSData || tasks;

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            const newState = _.cloneDeep(state);
            newState.push(action.payload);
            setDataFromLS('tasks', newState);
            return newState;
        },
        editTask: (state, action: PayloadAction<Task>) => {
            const newState =  _.map(state, (task)=>{
                if(task.id === action.payload.id) {
                    task = action.payload
                }
                return task;
            })
            setDataFromLS('tasks', newState);
            return newState;
        },
        moveTask: (state, action: PayloadAction<any>) => {
            const fromIndex = _.findIndex(state, (task)=> task.id === action.payload.id);
            let toIndex = _.findIndex(state, (task)=> task.id === action.payload.overId)
            let status;
            if(toIndex === -1){
                status = action.payload.overId;
                toIndex = action.payload.isUnder ? 0 : state.length;
            }else{
                status = state[toIndex]?.status
            }
            state[fromIndex].status = status;
            return moveArray(fromIndex, toIndex, state);
        },
        removeTask: (state, action: PayloadAction<string>) => {
            const newState = _.filter(state, (task)=> task.id !== action.payload);
            setDataFromLS('tasks', newState);
            return newState;
        },
        updateStore: (state) => {
            setDataFromLS('tasks', state);
        },
    },
})

// Action creators are generated for each case reducer function
export const {
    addTask,
    editTask,
    moveTask,
    removeTask,
    updateStore
} = tasksSlice.actions

const items = (state: RootState) => state.tasks;
export  const filteredState = createSelector([items, (items, type: string)=> type],
    (items, type) => {
        return _.filter(items, (item) => item.status === type)
    })
export default tasksSlice.reducer


