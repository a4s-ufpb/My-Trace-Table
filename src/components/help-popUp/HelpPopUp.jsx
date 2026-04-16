import { useNavigate } from "react-router-dom";
import "./HelpPopUp.css";

function HelpPopUp({ text, onClose }) {
    const navigate = useNavigate();
    return (
        <div className="overlay" data-testid="help-popup">
            <div className="popUp">
                <div className="header">
                    <span className="title">Ajuda</span>
                    <button className="closeBtn" onClick={onClose} data-testid="help-popup-close-button">×</button>
                </div>
                <p className="textPopUp">{text}</p>
                <button className="btnNext" onClick={() => navigate("/help-page")} data-testid="help-popup-more-info">Mais informações</button>
            </div>
        </div> 
    );
}

export default HelpPopUp;
