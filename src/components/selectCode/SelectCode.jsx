/* eslint-disable react/prop-types */
import "./SelectCode.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TraceTableService } from "./../../service/TraceTableService";
import AlertBox from "../alertBox/AlertBox";
import MultiSelect from "../MultiSelect";
import { UserService } from "../../service/UserService";

function SelectCode({ setSelectCode }) {
    const [themeName, setThemeName] = useState("");
    const [showAlertBoxThemeNotFound, setAlertBoxThemeNotFound] = useState(false);
    const [showAlertBoxNoUser, setAlertBoxNoUser] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [allUsers, setAllUsers] = useState([])

    const traceTableService = new TraceTableService();

    const navigate = useNavigate();

    const userService = new UserService();

    useEffect(() => {
        const fetchThemes = async () => {
            const response = await userService.findAllUsers();
            if (response.success) {
                setAllUsers(response.data.content || []);;
            }
        };
        fetchThemes();
    }, []);

    const handleButtonClick = async (e) => {
        e.preventDefault();

        if (selectedUser == null) {
            setAlertBoxNoUser(true);
            return;
        }

        try {
            const creatorId = selectedUser.id;

            const traceTableResponse =
                await traceTableService.findAllTraceTablesByThemeName(themeName, 0, 1000, creatorId);

            if (!traceTableResponse.success) {
                setAlertBoxThemeNotFound(true);
                return;
            }

            navigate(`/exercices/${themeName}`, {
                state: { creatorId: creatorId }
            });
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
                <MultiSelect
                    items={allUsers}
                    title={"Selecionar Professor(a)"}
                    typeItem={"professores"}
                    setSelectedItems={setSelectedUser}
                    selectedItems={selectedUser}
                />
                <button
                    className="insert-button"
                    type="submit"
                >
                    Buscar
                </button>
            </form>

            {showAlertBoxThemeNotFound && (
                <AlertBox setAlertBox={setAlertBoxThemeNotFound} text="Tema não encontrado!" />
            )}

            {showAlertBoxNoUser && (
                <AlertBox setAlertBox={setAlertBoxNoUser} text="Selecione um professor!" />
            )}
        </div>
    );
}

export default SelectCode;