import "./ImageModal.css";

function ImageModal({ isOpen, onClose, imageSrc}) {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <button className="close" onClick={onClose} type="button" aria-label="Fechar imagem ampliada">
        X
      </button>
      <img className="modal-content" src={imageSrc} alt="Imagem ampliada" />
    </div>
  );
}

export default ImageModal;
