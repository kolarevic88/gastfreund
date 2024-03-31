import React, {useState} from 'react';

import {Wrapper} from './KanbanHeader.style';
import getBackgroundColor from "../../helpers/getBackgroundColor";
import ModalWrapper from "../../shared/Modal/ModalWrapper";
import AddTask from "../AddTask/AddTask";

interface KanbanHeaderInterface {
    total: number;
    title: string;
    type: string;
}
function KanbanHeader({total, title, type}: KanbanHeaderInterface) {
    const [isOpenModal, setIsOpenModal] = useState(false)
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
                    <i
                        onClick={()=>setIsOpenModal(true)}
                        className="bi bi-plus-lg fs-4 pointer"
                    />
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
