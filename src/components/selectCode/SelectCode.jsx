import "./SelectCode.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TraceTableService } from "./../../service/TraceTableService";
import AlertBox from "../alertBox/AlertBox";

function SelectCode({ setSelectCode }) {
    const [themeId, setThemeId] = useState("");
    const [showAlertBox, setAlertBox] = useState(false);

    const traceTableService = new TraceTableService();

    const navigate = useNavigate();

    const handleButtonClick = async () => {
        try {
            const traceTableResponse =
                await traceTableService.findAllTraceTablesByTheme(themeId);

            if (!traceTableResponse.success) {
                setAlertBox(true);
                return;
            }

            navigate(`/exercices/${themeId}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container-select-code">
            <form className="select-code-content">
                <button className="close-button" onClick={() => setSelectCode(false)}>
                    &times;
                </button>
                <h2>Digite o código do tema</h2>
                <input
                    min={1}
                    type="number"
                    placeholder="Insira o código aqui"
                    value={themeId}
                    required
                    onChange={(e) => setThemeId(e.target.value)}
                />
                <button
                    className="insert-button"
                    onClick={handleButtonClick}
                    type="submit"
                >
                    Inserir
                </button>
            </form>

            {showAlertBox && (
                <AlertBox setAlertBox={setAlertBox} text="Tema não encontrado!" />
            )}
        </div>
    );
}

export default SelectCode;