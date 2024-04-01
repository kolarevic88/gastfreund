import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

import {Task} from "../../interfaces/interfaces";
import getBackgroundColor from "../../helpers/getBackgroundColor";
import {Close, Container} from './KanbanTask.style';
import { removeTask } from '../../store/tasksSlice'
import ModalWrapper from "../../shared/Modal/ModalWrapper";
import AddTask from "../AddTask/AddTask";


function KanbanTask({description, id, status}: Task): JSX.Element {
    const [isOpenModal, setIsOpenModal] = useState(false)
    const dispatch = useDispatch()

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({
        id,
        data: {
            task: {
                description,
                id,
                status,
            },
            type: 'Task'
        },
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };
    function handleClick(): void {
        dispatch(removeTask(id));
    }
    function handleDoubleClick(): void{
        setIsOpenModal(true)
    }
    return (
        <>
            <div
                ref={setNodeRef}
                {...attributes}
                {...listeners}
                style={style}
                className="d-flex justify-content-center align-items-center mb-3 w-100"
            >
                <Container
                    data-testid="kanban-task-item"
                    $bgc={getBackgroundColor(status)}
                    className="d-flex justify-content-center align-items-center fs-5 fw-bold h-100 default-cursor"
                    onDoubleClick={handleDoubleClick}
                >
                    <Close
                        data-testid = "kanban-task-remove-item"
                        onClick={handleClick}
                    >
                        <i
                            className="bi bi-x pointer"
                        />
                    </Close>
                    <div
                        className="p-3"
                    >
                        {description}
                    </div>
                </Container>
            </div>
            {isOpenModal &&
                <ModalWrapper
                    isOpenModal={isOpenModal}
                >
                    <AddTask
                        data={description}
                        id={id}
                        onClose={setIsOpenModal}
                        status={status}
                    />
                </ModalWrapper>
            }
        </>
    );
}
export default KanbanTask;
