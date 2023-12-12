import Modal from 'react-modal';

Modal.setAppElement('#__next');

interface IModal {
    isOpen: boolean;
    closeModal: () => void;
}

export function ModalComponent({ isOpen, closeModal }: IModal) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={closeModal}
        >
            <h2>Hello Modal!</h2>
            <button type="button" className="bg-blue-500 mt-4 px-4 py-2 rounded text-white" onClick={closeModal}>Close</button>
        </Modal>
    );
}
