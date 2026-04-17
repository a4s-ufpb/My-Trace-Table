import { useEffect, useState } from "react";
import ReactDOM from "react-dom"; // Importe o ReactDOM
import "./MessagePopUp.css";

function MessagePopUp({ message, showPopUp }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                setVisible(false);
                showPopUp(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [message, showPopUp]);

    if (!visible) return null;

    // Criamos o conteúdo do popup
    const popupContent = (
        <div className="invalidPopUp" data-testid="message-popup">
            {Array.isArray(message) ? (
                <ul>
                    {message.map((msg, index) => (
                        <li key={index}>{msg}</li>
                    ))}
                </ul>
            ) : (
                <span>{message}</span>
            )}
        </div>
    );

    // Usamos o Portal para renderizar no document.body
    return ReactDOM.createPortal(popupContent, document.body);
}

export default MessagePopUp;