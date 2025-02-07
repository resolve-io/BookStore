import { Modal, Button } from 'react-bootstrap';

const CommonModal = ({ show, onClose, title, children, onConfirm, confirmText = 'Confirm', showFooter = true }) => {
  return (
    <Modal show={show} onHide={onClose} dialogClassName="modal-40w">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children} {/* Render the dynamic content passed as children */}
      </Modal.Body>
      {showFooter && (
        <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>
            Close
            </Button>
            <Button variant="primary" onClick={onConfirm}>
            {confirmText} {/* The confirm button can have dynamic text */}
            </Button>
        </Modal.Footer>
      )}
    </Modal>
  );
};

export default CommonModal;
