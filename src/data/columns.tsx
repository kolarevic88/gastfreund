import {Column} from "../interfaces/interfaces";
import {uui} from "../utility/uui";

const columns: Column[] = [
    {
        id: uui(),
        type: 'toDo',
        title: 'To Do',
    },
    {
        id: uui(),
        type: 'inProgress',
        title: 'In Progress',
    },
    {
        id: uui(),
        type: 'done',
        title: 'Done',
    }
]

export default columns;
