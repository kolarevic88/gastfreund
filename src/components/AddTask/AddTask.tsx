import React from 'react';
import { useFormik } from 'formik';
import cx from 'classnames';

import {Header, Footer, CloseButton, Textarea} from './AddTask.style';
import {useDispatch} from "react-redux";
import { addTask, editTask } from '../../store/tasksSlice';
import {Task} from "../../interfaces/interfaces";
import {uui} from "../../utility/uui";

interface Data {
    data: string;
}
interface AddTaskInterface {
    data?: string;
    id?: string;
    status: string;
    onClose: (arg: boolean) => void
}
function AddTask({data, id, status, onClose}: AddTaskInterface) {
    const dispatch = useDispatch()

    const validate = (values: Data) => {
        const errors: any = {};
        if (!values.data) {
            errors.data = 'Field can not be empty!';
        }
        return errors;
    };
    const formik = useFormik({
        initialValues: {
            data: data || '',
        },
        validate,
        onSubmit: (values: Data) => {
            const payload: Task = {
                id: id || uui(),
                description: values.data,
                status
            }
            if(!!id){
                dispatch(editTask(payload));
            }else {
                dispatch(addTask(payload));
            }
            onClose(false);
        },
    });
    function handleClick(): void {
        onClose(false);
    }
    return (
        <form noValidate onSubmit={formik.handleSubmit}>
            <div
                className={cx("d-flex flex-column")}
            >
                <Header
                    className='d-flex justify-content-between align-items-center p-2 w-100'
                >
                    <h4>{id ? 'Edit Task' : 'Add Task'}</h4>
                    <CloseButton
                        type='button'
                        onClick={handleClick}
                    >
                        <i className="bi bi-x-lg"></i>
                    </CloseButton>
                </Header>
                <div className="form-floating p-2 w-100">
                    <Textarea
                        className={cx(formik?.errors?.data && 'is-invalid', 'form-control')}
                        id="data"
                        onChange={formik.handleChange}
                        value={formik.values.data}
                    />
                    <label htmlFor="data">Description</label>
                    {formik?.errors?.data &&
                        <div className="warning">
                            {formik.errors.data}
                        </div>
                    }
                </div>
                <Footer
                    className='d-flex justify-content-end align-items-center p-2 w-100'
                >
                    <button
                        type='submit'
                        className='btn btn-outline-primary'
                        disabled={formik.isSubmitting || !!formik?.errors?.data || !formik.dirty}
                    >
                        Save
                    </button>
                </Footer>
            </div>
        </form>
    );
}
export default AddTask;
