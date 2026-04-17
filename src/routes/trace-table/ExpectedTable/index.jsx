import { useContext, useEffect, useState } from "react"
import "../TraceTable.css";
import { useNavigate } from "react-router-dom";
import { BsQuestionCircleFill } from "react-icons/bs";
import AttentionPopUp from "../../../components/AttentionPopUp";
import HelpPopUp from "../../../components/help-popUp/HelpPopUp";
import { TraceTableContext } from "../../../contexts/TraceTableContext";
import { TraceTableService } from "../../../service/TraceTableService";
import MessagePopUp from "../../../components/MessagePopUp";
import { useUnloadWarning } from "../../../hooks/useUnloadWarning";
import { getValidTypesForValue, normalizeTypeTableForAPI } from "../../../utils/typeGuesser";
import ImageModal from "../../../components/image-modal/index";

export default function ExpectedTable() {
    const [expectedTableData, setExpectedTableData] = useState([]);
    const [typeTableData, setTypeTableData] = useState([]);
    const [tableInfo, setTableInfo] = useState(null);
    const [isValid, setIsValid] = useState(false)
    const [openPopUpCancel, setOpenPopUpCancel] = useState(false);
    const [openPopUpEdit, setOpenPopUpEdit] = useState(false);
    const [openHelpPopUp, setOpenHelpPopUp] = useState(false);
    const [showValueType, setShowValueType] = useState(false);
    const [helpText, setHelpText] = useState("");

    const [showMessagePopUp, setShowMessagePopUp] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState("");

    const [imageURL, setImageURL] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useUnloadWarning(true);

    const navigate = useNavigate();

    const { traceData, clearExerciseDraft } = useContext(TraceTableContext);
    const traceService = new TraceTableService();
    const defaultString = traceData.programmingLanguage === "java" ? "String" : "str";

    useEffect(() => {
        setExpectedTableData(traceData.shownTable || []);
        setTableInfo(traceData);

        const linhaIndex = (traceData.headerTable || []).findIndex(h => h.toLowerCase().includes("linha"));
        const linhaDataIndex = traceData.showSteps ? linhaIndex - 1 : linhaIndex;
        const isInteger = /^-?\d+$/;

        const initializedTypeTable = (traceData.shownTable || []).map(row =>
            row.map((cell, colIndex) => {
                if (cell === "#") return "#";
                if (colIndex === linhaDataIndex && isInteger.test(cell)) return "int";
                return defaultString;
            })
        );

        setTypeTableData(initializedTypeTable);
    }, [traceData]);

    useEffect(() => {
        const allFilled = expectedTableData.every(row =>
            row.every(cell => cell.trim() !== "" && cell !== "?")
        );

        setIsValid(allFilled)
    }, [expectedTableData]);

    useEffect(() => {
        if (traceData.image) {
            const url = URL.createObjectURL(traceData.image);
            setImageURL(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [traceData.image]);

    const handleInputChange = (rowIndex, colIndex, value) => {
        setExpectedTableData(prevData => {
            return prevData.map((row, rIndex) =>
                rIndex === rowIndex
                    ? row.map((cell, cIndex) => (cIndex === colIndex ? value : cell))
                    : row
            );
        });

        setTypeTableData(prevData => {
            const bestGuessType = getValidTypesForValue(value, traceData.programmingLanguage)[0];

            return prevData.map((row, rIndex) =>
                rIndex === rowIndex
                    ? row.map((cellType, cIndex) => (cIndex === colIndex ? bestGuessType : cellType))
                    : row
            );
        });
    };

    const handleSelectChange = (rowIndex, colIndex, newType) => {
        setTypeTableData(prevData => {
            const newTableData = prevData.map(r => [...r]);

            for (let i = rowIndex; i < newTableData.length; i++) {
                if (traceData.shownTable[i][colIndex] !== "#") {
                    const cellValue = expectedTableData[i][colIndex];
                    const possibleTypes = getValidTypesForValue(cellValue, traceData.programmingLanguage);

                    if (possibleTypes.includes(newType)) {
                        newTableData[i][colIndex] = newType;
                    }
                }
            }

            return newTableData;
        });
    };

    const saveTableData = async () => {
        const normalizedTypeTable = normalizeTypeTableForAPI(typeTableData);

        const newTable = {
            exerciseName: traceData.exerciseName,
            header: traceData.headerTable,
            shownTraceTable: traceData.shownTable,
            expectedTraceTable: expectedTableData,
            typeTable: normalizedTypeTable,
            programmingLanguage: traceData.programmingLanguage
        };

        const response = await traceService.addTraceTable(
            newTable,
            traceData.image,
            traceData.themesIds
        );

        if (response.success) {
            clearExerciseDraft();

            setPopUpMessage("Exercicio salvo com sucesso!");
            setShowMessagePopUp(true);
            setTimeout(() => {
                navigate("/");
            }, 1200);
        } else {
            setPopUpMessage(response.message || "Erro ao salvar exercicio");
            setShowMessagePopUp(true);
        }
    };

    const showHelpPopUp = (text) => {
        setHelpText(text);
        setOpenHelpPopUp(true);
    };

    const getColumnClasses = (columnName) => {
        const lowerCaseName = columnName.toLowerCase();
        const classes = [];

        if (lowerCaseName.includes("passo") || lowerCaseName.includes("linha")) {
            classes.push("metadata-column");
        }

        if (lowerCaseName.includes("linha")) {
            classes.push("metadata-column-divider");
        }

        return classes.join(" ");
    };

    return (
        <div className="background">
            <div className="trace-editor-shell">
                {imageURL && (
                    <div className="img-container">
                        <img
                            src={imageURL}
                            alt="Codigo do exercicio"
                            onClick={() => setIsModalOpen(true)}
                        />
                    </div>
                )}
                <div className="trace-container">
                    <div className="title-container">
                        <div className="content-with-help">
                            <h2>Tabela Esperada</h2>
                            <BsQuestionCircleFill className="icon-question" onClick={() => showHelpPopUp("Preencha a tabela com os valores esperados para a resposta do aluno.")} />
                        </div>
                        <span className="table-subtitle">Defina as respostas corretas para a atividade.</span>
                    </div>
                    {tableInfo && (
                        <table>
                            <thead>
                                <tr>
                                    {tableInfo?.headerTable?.map((variable, variableIndex) => (
                                        <th key={variableIndex} className={getColumnClasses(variable)}>{variable}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {expectedTableData?.map((row, i) => (
                                    <tr key={i}>
                                        {traceData.showSteps &&
                                            <td className={`step-cell ${getColumnClasses("Passo")}`}>{i + 1}o</td>
                                        }
                                        {row.map((cell, j) => {
                                            const columnName = tableInfo?.headerTable[j + (traceData.showSteps ? 1 : 0)];
                                            const isDisabled = cell === "#";

                                            const cellClasses = [
                                                getColumnClasses(columnName),
                                                isDisabled ? "disabled-cell" : ""
                                            ].join(" ").trim();

                                            return (
                                                <td key={j} className={cellClasses}>
                                                    {(traceData.shownTable[i][j] === "?") ? (
                                                        <input
                                                            type="text"
                                                            value={cell === "?" ? "" : cell}
                                                            maxLength={10}
                                                            onChange={(e) => handleInputChange(i, j, e.target.value)}
                                                        />
                                                    ) : cell === "#" ? "" : cell}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
                <div>
                    <div className="content-with-help">
                        <label htmlFor="showValueType" className="checkbox-label">
                            <input
                                type="checkbox"
                                name="showValueType"
                                id="showValueType"
                                checked={showValueType}
                                onChange={() => setShowValueType(!showValueType)}
                            />
                            Preencher tabela com o tipo do valor de cada celula
                            <BsQuestionCircleFill className="icon-question" onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
                                showHelpPopUp("A tabela de tipos ajuda a validar se o aluno enviou um valor no tipo esperado.")
                            }} />
                        </label>
                    </div>
                </div>
                {tableInfo && showValueType && (
                    <div className="trace-container">
                        <div className="title-container">
                            <h2>Tabela de Tipos</h2>
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    {tableInfo?.headerTable?.map((variable, variableIndex) => (
                                        <th key={variableIndex} className={getColumnClasses(variable)}>{variable}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {typeTableData?.map((row, i) => (
                                    <tr key={i}>
                                        {traceData.showSteps &&
                                            <td className={`step-cell ${getColumnClasses("Passo")}`}>{i + 1}o</td>
                                        }
                                        {row.map((cell, j) => {
                                            const columnName = tableInfo?.headerTable[j + (traceData.showSteps ? 1 : 0)];
                                            const isDisabled = cell === "#";
                                            const cellClasses = [
                                                getColumnClasses(columnName),
                                                isDisabled ? "disabled-cell" : ""
                                            ].join(" ").trim();

                                            return (
                                                <td key={j} className={cellClasses}>
                                                    {traceData.shownTable[i][j] !== "#" ? (
                                                        <select
                                                            name="valueType"
                                                            id="valueType"
                                                            value={cell === "?" ? "" : cell}
                                                            onChange={(e) => handleSelectChange(i, j, e.target.value)}
                                                        >
                                                            {getValidTypesForValue(expectedTableData[i][j], tableInfo.programmingLanguage)
                                                                .map((type, index) => (
                                                                    <option key={index} value={type}>
                                                                        {type}
                                                                    </option>
                                                                ))}
                                                        </select>
                                                    ) : cell === "#" ? "" : cell}
                                                </td>
                                            )
                                        })}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="btn-container">
                <button onClick={saveTableData} disabled={!isValid} className="btn btn-next">Salvar</button>
                <button onClick={() => setOpenPopUpEdit(true)} className="btn">Editar</button>
                <button onClick={() => setOpenPopUpCancel(true)} className="btn">Cancelar</button>
            </div>
            {openPopUpCancel && (
                <AttentionPopUp
                    text="Tem certeza que deseja cancelar a operacao? Seus dados nao serao salvos."
                    confirmAction={() => navigate("/")}
                    cancelAction={() => setOpenPopUpCancel(false)}
                />
            )}
            {openPopUpEdit && (
                <AttentionPopUp
                    text="Tem certeza que deseja voltar para a tela da tabela mostrada? Seus dados da tela atual nao serao salvos."
                    confirmAction={() => navigate("/showntable")}
                    cancelAction={() => setOpenPopUpEdit(false)}
                />
            )}
            {openHelpPopUp && (
                <HelpPopUp
                    text={helpText}
                    onClose={() => setOpenHelpPopUp(false)}
                />
            )}
            {showMessagePopUp && (
                <MessagePopUp
                    message={popUpMessage}
                    showPopUp={setShowMessagePopUp}
                />
            )}
            <ImageModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                imageSrc={imageURL}
            />
        </div>
    )
}
