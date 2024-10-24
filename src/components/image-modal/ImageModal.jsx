import "./ImageModal.css";

function ImageModal({ isOpen, onClose, imageSrc}) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <span className="close" onClick={onClose}>
        X
      </span>
      <img className="modal-content" src={imageSrc}/>
    </div>
  );
}

export default ImageModal;

