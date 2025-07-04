import './AlertBox.css';

function AlertBox({ text, setAlertBox }) {
    const handleClose = () => {
        setAlertBox(false);
    };

    return (
        <div className="alert-box">
            <div className="alert-content">
                <p>{text}</p>
                <button onClick={handleClose} className="alert-button">OK</button>
            </div>
        </div>
    );
}

export default AlertBox;