import React, {useMemo} from 'react';
import {useDroppable} from "@dnd-kit/core";
import {SortableContext, verticalListSortingStrategy} from "@dnd-kit/sortable";
import _ from "lodash";

import KanbanHeader from "../KanbanHeader/KanbanHeader";
import {Task} from "../../interfaces/interfaces";
import {useSelector} from "react-redux";
import {RootState} from "../../store/store";
import {filteredState} from "../../store/tasksSlice";
import getBackgroundColor from "../../helpers/getBackgroundColor";
import KanbanTask from "../KanbanTask/KanbanTask";
import {TasksWrapper} from "./KanbanColumn.style";

interface KanbanColumnInterface {
    type: string;
    title: string;
    search: string;
}

function KanbanColumn({type, title, search}: KanbanColumnInterface): JSX.Element {
    const tasks: Task[] = useSelector((state: RootState) => filteredState(state, type));
    const { setNodeRef } = useDroppable({
        id: type
    });
    const tasksId = useMemo(()=> {
        return _.map(tasks, (task)=> task.id)
    }, [tasks])

    const filteredTasks = useMemo(() =>
        _.filter(tasks, (task) => _.toLower(task.description).includes(_.toLower(search)))
        , [search, tasks])

    const total: number = filteredTasks.length;

    const tasksRender = useMemo(() => {
        return _.map(filteredTasks, (item : Task)=>
            <KanbanTask
                key={item.id}
                description={item.description}
                id={item.id}
                status={item.status}
            />
        )
    }, [filteredTasks]);

    return (
        <SortableContext
            id={type}
            items={tasksId}
            strategy={verticalListSortingStrategy}
        >
            <div
                ref={setNodeRef}
                className="col-sm d-flex flex-column"
            >
                <KanbanHeader
                    total={total}
                    title={title}
                    type={type}
                />
                <TasksWrapper
                    $bgc={getBackgroundColor(type)}
                    className="d-flex flex-column flex-grow-1 p-3 m-1"
                >
                    {tasksRender}
                </TasksWrapper>
            </div>
        </SortableContext>
    );
}
export default KanbanColumn;
