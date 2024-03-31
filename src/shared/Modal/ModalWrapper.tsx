import React from 'react';
import ReactModal from 'react-modal';

function ModalWrapper({children, isOpenModal}: any) {
    return (
        <ReactModal
            isOpen={isOpenModal}
            ariaHideApp={false}
            shouldCloseOnOverlayClick={false}
            style={{
                overlay: {
                    backgroundColor: '#284B6440',
                    backdropFilter: 'blur(2px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                },
                content: {
                    inset: 'inherit',
                    width: '100%',
                    maxWidth: '720px',
                    height: 'auto',
                    maxHeight: 'calc(100vh - 4rem)',
                    transition: 'all 0.5s ease-in-out',
                    position: 'relative',
                    padding: '0',
                    border: 'none',
                    borderRadius: '8px',
                    marginLeft: '8px',
                    marginRight: '8px'
                }
            }}
        >
            {children}
        </ReactModal>
    );
}
export default ModalWrapper;
