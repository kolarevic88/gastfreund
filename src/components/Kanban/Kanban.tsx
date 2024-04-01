import React, {ChangeEvent, useState} from 'react';
import _ from 'lodash';
import {useDispatch, useSelector} from "react-redux";

import KanbanColumn from "../KanbanColumn/KanbanColumn";
import {Wrapper} from './Kanban.style';
import {Column, Task} from '../../interfaces/interfaces';
import {RootState} from "../../store/store";
import {DndContext, DragOverlay, KeyboardSensor, MouseSensor, useSensor, useSensors} from "@dnd-kit/core";
import KanbanTask from "../KanbanTask/KanbanTask";
import {moveTask, updateStore} from "../../store/tasksSlice";
import {eventOptions} from "../../helpers/eventOptions";
import useDebounce from "../../hooks/useDebounce";
import Search from "../Search/Search";


function Kanban(): JSX.Element {
    const columns: Column[] = useSelector((state: RootState) => state.columns);
    const [activeTask, setActiveTask] = useState({} as Task);
    const [search, setSearch] = useState('');
    const debounceSearch = useDebounce(search, 300);
    const dispatch = useDispatch()
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        },
    })
    const keyboardSensor = useSensor(KeyboardSensor);
    const sensors = useSensors(mouseSensor, keyboardSensor);
    function handleDragStart(event: any): void {
        if (event?.active.data.current?.task) {
            setActiveTask(event.active.data.current?.task)
        }
    }

    function handleDragOver(event: any): void {
        const eventObject = eventOptions(event);
        if(!eventObject.id || !eventObject.overId || eventObject.isOverSameColumn){
            return
        }
        dispatch(moveTask({
            overId: eventObject.overId,
            id: eventObject.id,
            isUnder: eventObject.isUnder
        }))
    }
    function handleDragEnd(event: any): void{
        const eventObject = eventOptions(event);
        if(eventObject.id && eventObject.overId && eventObject.isOverSameColumn){
            dispatch(moveTask({
                overId: eventObject.overId,
                id: eventObject.id,
                isUnder: eventObject.isUnder
            }))
        }
        dispatch(updateStore())
    }
    const onSearch = (params: ChangeEvent<HTMLInputElement>): void => {
        setSearch(params.target.value);
    };

    return (
        <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
        >
            <Wrapper className="d-flex flex-column">
                <Search onSearch={onSearch}/>
                <div className='row d-flex flex-grow-1'>
                    { _.map(columns, (item: Column)=>
                        <KanbanColumn
                            key={item.id}
                            type={item.type}
                            title={item.title}
                            search={debounceSearch}
                        />
                    )}
                </div>
            </Wrapper>
            <DragOverlay>
                {!!activeTask &&
                    <KanbanTask
                        description={activeTask.description}
                        id={activeTask.id}
                        status = {activeTask.status}
                    />
                }

            </DragOverlay>
        </DndContext>
    );
}
export default Kanban;
