import "./AttentionPopUp.css";

function AttentionPopUp({ text, confirmAction, cancelAction}) {
    return (
        <div className="overlay">
            <div className="popUp">
                <span className="popUpTitle">Atenção</span>
                <p className="textPopUp">{text}</p>
                <div className="btnContainer">
                    <button className="btnNext" onClick={confirmAction}>Confirmar</button>
                    <button onClick={cancelAction} className="btnCancel">Cancelar</button>
                </div>
            </div>
        </div>
    )
} 

export default AttentionPopUp;