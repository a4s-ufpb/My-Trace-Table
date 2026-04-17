import { useNavigate } from "react-router-dom";
import "./HelpPopUp.css";

function HelpPopUp({ text, onClose }) {
    const navigate = useNavigate();
    return (
        <div className="help-overlay" data-testid="help-popup">
            <div className="help-popup">
                <div className="help-popup-header">
                    <span className="help-popup-title">Ajuda</span>
                    <button className="help-popup-close" onClick={onClose} data-testid="help-popup-close-button">X</button>
                </div>
                <p className="help-popup-text">{text}</p>
                <button className="help-popup-link" onClick={() => navigate("/help-page")} data-testid="help-popup-more-info">Mais informacoes</button>
            </div>
        </div> 
    );
}

export default HelpPopUp;
