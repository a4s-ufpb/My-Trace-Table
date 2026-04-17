import ReactDOM from "react-dom"; // Importante para o Portal
import "./AttentionPopUp.css";

function AttentionPopUp({ text, confirmAction, cancelAction }) {
    const content = (
        <div className="attention-overlay">
            <div className="attention-popup">
                <span className="attention-popup-title">Atenção</span>
                <p className="attention-popup-text">{text}</p>
                <div className="attention-popup-actions">
                    <button className="attention-popup-confirm" onClick={confirmAction}>Confirmar</button>
                    <button onClick={cancelAction} className="attention-popup-cancel">Cancelar</button>
                </div>
            </div>
        </div>
    );

    // Renderiza fora da div da lista, direto no body
    return ReactDOM.createPortal(content, document.body);
}

export default AttentionPopUp;