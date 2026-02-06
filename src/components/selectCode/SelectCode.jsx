import "./SelectCode.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TraceTableService } from "./../../service/TraceTableService";
import AlertBox from "../alertBox/AlertBox";

function SelectCode({ setSelectCode }) {
    const [themeName, setThemeName] = useState("");
    const [showAlertBox, setAlertBox] = useState(false);

    const traceTableService = new TraceTableService();

    const navigate = useNavigate();

    const handleButtonClick = async (e) => {
        e.preventDefault();
        try {
            const traceTableResponse =
                await traceTableService.findAllTraceTablesByThemeName(themeName);

            if (!traceTableResponse.success) {
                setAlertBox(true);
                return;
            }

            navigate(`/exercices/${themeName}`);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container-select-code">
            <form className="select-code-content" onSubmit={handleButtonClick}>
                <button className="close-button" onClick={() => setSelectCode(false)} type="button">
                    &times;
                </button>
                <h2>Digite o nome do tema</h2>
                <input
                    min={1}
                    type="text"
                    placeholder="Insira o nome do tema aqui"
                    value={themeName}
                    required
                    onChange={(e) => setThemeName(e.target.value)}
                />
                <button
                    className="insert-button"
                    type="submit"
                >
                    Buscar
                </button>
            </form>

            {showAlertBox && (
                <AlertBox setAlertBox={setAlertBox} text="Tema não encontrado!" />
            )}
        </div>
    );
}

export default SelectCode;