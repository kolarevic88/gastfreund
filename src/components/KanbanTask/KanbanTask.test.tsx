import React from 'react';
import { render, screen } from '@testing-library/react';
import configureStore from 'redux-mock-store'
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";
import KanbanTask from "./KanbanTask";
import {Provider} from "react-redux";
import {removeTask} from "../../store/tasksSlice";
import {act} from "react-dom/test-utils";

const initState: any = [
    {
        id: '123',
        description: 'Develop BIM model of wind shear impact',
        status: 'toDo'
    }
]
const mockStore = configureStore([])
describe('Search component', () => {
    let store: any;
    beforeEach(()=> {
        store = mockStore(initState);
    })

    test('renders', async () => {
        const { container } = render(
            <Provider store={store}>
                <KanbanTask
                    id='123'
                    description= 'Develop BIM model of wind shear impact'
                    status= 'toDo'
                />
            </Provider>
        );
        expect(container).toBeInTheDocument();
    });
    test('opens modal on item double-click', async () => {
        const { findByTestId } = render(
            <Provider store={store}>
                <KanbanTask
                    id='123'
                    description= 'Develop BIM model of wind shear impact'
                    status= 'toDo'
                />
            </Provider>
        );
        const kanbanItemElement = await findByTestId("kanban-task-item")

        act(() => {
            userEvent.dblClick(kanbanItemElement);
        });

        const modalElement = screen.getByTestId('add-task-modal')
        expect(modalElement).toBeInTheDocument();
    });
    test('remove task', async () => {
        const taskId = '123';
        const { findByTestId } = render(
            <Provider store={store}>
                <KanbanTask
                    id={taskId}
                    description= 'Develop BIM model of wind shear impact'
                    status= 'toDo'
                />
            </Provider>
        );
        const kanbanTaskRemoveButton = await findByTestId("kanban-task-remove-item")
        await userEvent.click(kanbanTaskRemoveButton);
        expect(store.getActions()).toContainEqual(removeTask(taskId));
    });
});
