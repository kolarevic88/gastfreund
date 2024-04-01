import React, {useState} from 'react';

import {Add, Wrapper} from './KanbanHeader.style';
import getBackgroundColor from "../../helpers/getBackgroundColor";
import ModalWrapper from "../../shared/Modal/ModalWrapper";
import AddTask from "../AddTask/AddTask";

interface KanbanHeaderInterface {
    total: number;
    title: string;
    type: string;
}
function KanbanHeader({total, title, type}: KanbanHeaderInterface): JSX.Element {
    const [isOpenModal, setIsOpenModal] = useState(false)
    function handleClick(): void{
        setIsOpenModal(true)
    }
    return (
        <>
            <Wrapper
                $bgc={getBackgroundColor(type)}
                className="d-flex justify-content-between align-items-center p-3 m-1"
            >
                <div className="d-flex flex-column pe-2 w-100">
                    <div className="d-flex justify-content-center fw-bold fs-4">
                        <div
                            className="ellipsis"
                            title={title}
                        >
                            {title}
                        </div>
                    </div>
                    <div
                        className="d-flex justify-content-center fw-bold fs-5"
                    >
                        ({total})
                    </div>
                </div>
                <div>
                    <Add
                        onClick={handleClick}
                    >
                        <i
                            className="bi bi-plus-lg fs-4 pointer"
                        />
                    </Add>
                </div>
            </Wrapper>
            {isOpenModal &&
                <ModalWrapper
                    isOpenModal={isOpenModal}
                >
                    <AddTask
                        onClose={setIsOpenModal}
                        status={type}
                    />
                </ModalWrapper>
            }
        </>
    );
}
export default KanbanHeader;
