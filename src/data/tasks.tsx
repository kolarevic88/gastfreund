import {Task} from "../interfaces/interfaces";
import {uui} from "../utility/uui";

const tasks: Task[] = [

        {
            id: uui(),
            description: 'Review request for proposal',
            status: 'toDo'
        },
        {
            id: uui(),
            description: 'Develop BIM model of wind shear impact',
            status: 'toDo'
        },
        {
            id: uui(),
            description: 'Prepare for client meeting with Addisons',
            status: 'inProgress'
        },
        {
            id: uui(),
            description: 'Addison client meeting Thursday 11 a.m.',
            status: 'inProgress'
        },
        {
            id: uui(),
            description: 'Write speech on housing trends',
            status: 'inProgress'
        },
        {
            id: uui(),
            description: 'Speak to realtors dinner Wed 7 p.m.',
            status: 'inProgress'
        },
        {
            id: uui(),
            description: 'Write meeting minutes from client meeting',
            status: 'done'
        },
    ]



export default tasks;
