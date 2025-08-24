import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TraceTable.css";
import ImageModal from "../../components/image-modal/ImageModal";
import FeedbackBox from "../../components/feedback-box/FeedbackBox";
import {
  BsArrowLeftCircleFill,
  BsArrowRepeat,
  BsArrowRightCircleFill,
} from "react-icons/bs";
import { TraceTableService } from "../../service/TraceTableService";
import AttentionPopUp from "../../components/attention-popUp/AttentionPopUp";

function TraceTable() {
  const exercices = JSON.parse(localStorage.getItem("exercices")) || [];
  const [currentExerciceIndex, setCurrentExerciceIndex] = useState(
    parseInt(localStorage.getItem("currentExerciceIndex")) || 0
  );

  const exerciceJson = exercices[currentExerciceIndex];
  const [hasStep, setHasStep] = useState(false);

  const [userTraceTable, setUserTraceTable] = useState(
    exerciceJson.shownTraceTable
  );
  const [submitted, setSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [cellErrors, setCellErrors] = useState([]);

  const [placeholders, setPlaceholders] = useState(
    userTraceTable.map((row) => row.map(() => "?"))
  );

  const [openPopUp, setOpenPopUp] = useState(false);
  const [isValid, setIsValid] = useState(false);


  const navigate = useNavigate();

  const traceTableService = new TraceTableService();

  const valueError = "Valor incorreto";
  const typeError = "Tipo inválido";

  useEffect(() => {
    if (exerciceJson) {
      const hasStep = exerciceJson.header.some(h => h.toLowerCase().includes("passo"));
      setHasStep(hasStep);
    } else {
      navigate("/exercices");
    }
  }, [exerciceJson, navigate]);

  useEffect(() => {
    const allFilled = userTraceTable.every(row =>
      row.every(cell => cell.trim() !== '' && cell !== '?')
    );

    setIsValid(allFilled);
  }, [userTraceTable]);

  const handleInputChange = (rowIndex, colIndex, value) => {
    if (value.includes("#")) {
      return;
    }

    const newTable = userTraceTable.map((row, rIdx) =>
      row.map((col, cIdx) =>
        rIdx === rowIndex && cIdx === colIndex ? value : col
      )
    );
    setUserTraceTable(newTable);
  };

  const handleFocus = (rowIndex, colIndex) => {
    setPlaceholders((prevPlaceholders) =>
      prevPlaceholders.map((row, rIdx) =>
        row.map((placeholder, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex ? "" : placeholder
        )
      )
    );
  };

  const handleBlur = (rowIndex, colIndex) => {
    setPlaceholders((prevPlaceholders) =>
      prevPlaceholders.map((row, rIdx) =>
        row.map((placeholder, cIdx) =>
          rIdx === rowIndex && cIdx === colIndex ? "?" : placeholder
        )
      )
    );
  };

  const handleSubmit = async () => {
    const response = await traceTableService.checkUserAnswer(
      exerciceJson.id,
      userTraceTable
    );

    setSubmitted(true);

    if (response.success) {
      setIsCorrect(true);
      setErrorMessage("");
      setCellErrors([]);
    } else {
      setIsCorrect(false);

      if (Array.isArray(response.data)) {
        setCellErrors(response.data);

        const typeErrors = response.data.filter(err => err.errorMessage === typeError).length;
        const valueErrors = response.data.filter(err => err.errorMessage === valueError).length;

        if (typeErrors > 0 && valueErrors === 0) {
          setErrorMessage("Atenção! Existem erro(s) de tipo");
        } else if (valueErrors > 0 && typeErrors === 0) {
          setErrorMessage("Existem valor(es) incorreto(s)");
        } else {
          setErrorMessage("Há erro(s) de tipo e de valor. Corrija os campos em sua tabela");
        }

      } else {
        setErrorMessage(response.message || "Erro ao validar exercício.");
      }
    }
  };

  const getCellError = (rowIndex, colIndex) => {
    return cellErrors.find(
      (err) => err.row === rowIndex && err.column === colIndex
    );
  };

  const handleImageClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const goToNextExercice = () => {
    if (currentExerciceIndex < exercices.length - 1) {
      const newIndex = currentExerciceIndex + 1;
      setCurrentExerciceIndex(newIndex);
      localStorage.setItem("currentExerciceIndex", newIndex);
      resetExercice(exercices[newIndex]);
    }
  };

  const goToPreviousExercice = () => {
    if (currentExerciceIndex > 0) {
      const newIndex = currentExerciceIndex - 1;
      setCurrentExerciceIndex(newIndex);
      localStorage.setItem("currentExerciceIndex", newIndex);
      resetExercice(exercices[newIndex]);
    }
  };

  const resetExercice = (newExercice) => {
    setUserTraceTable(newExercice.shownTraceTable);
    setSubmitted(false);
    setIsCorrect(null);
  };

  const shownPopUp = () => {
    setOpenPopUp(true);
  }

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getColumnClasses = (columnName) => {
    const lowerCaseName = columnName.toLowerCase();
    const classes = [];

    if (lowerCaseName.includes('passo') || lowerCaseName.includes('linha')) {
      classes.push('metadata-column');
    }

    if (lowerCaseName.includes('linha')) {
      classes.push('metadata-column-divider');
    }

    return classes.join(' ');
  };

  return (
    <div className="background-trace">
      <div className="trace-table-container">
        <div className="image-container">
          <div className="exercise-info">
            <h2>{exerciceJson.exerciseName}</h2>
            <span>{capitalizeFirstLetter(exerciceJson.programmingLanguage)}</span>
          </div>
          <img
            src={exerciceJson.imgName}
            alt="Ilustração do exercício"
            className="exercise-image"
            onClick={handleImageClick}
          />
        </div>

        <div className="trace-table">
          <table>
            <thead>
              <tr>
                {exerciceJson.header.map((header, index) => (
                  <th key={index} className={getColumnClasses(header)}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userTraceTable.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {hasStep && <td className={`step-cell ${getColumnClasses('Passo')}`}>{rowIndex + 1}º</td>}
                  {row.map((cell, colIndex) => {
                    const columnName = exerciceJson.header[colIndex + (hasStep ? 1 : 0)];
                    const isDisabled = cell === "#";

                    const cellClasses = [
                      getColumnClasses(columnName),
                      isDisabled ? 'disabled-cell' : ''
                    ].join(' ').trim();
                    return (
                      <td key={colIndex} className={cellClasses}>
                        {cell === "#" ? (
                          ""
                        ) : (
                          <input
                            type="text"
                            value={cell === "?" ? "" : cell}
                            placeholder={placeholders[rowIndex][colIndex]}
                            onFocus={() => handleFocus(rowIndex, colIndex)}
                            onBlur={() => handleBlur(rowIndex, colIndex)}
                            onChange={(e) =>
                              handleInputChange(
                                rowIndex,
                                colIndex,
                                e.target.value
                              )
                            }
                            disabled={cell === "#"}
                            title={getCellError(rowIndex, colIndex)?.errorMessage === typeError
                              ? "Tipo inválido: valor não permitido"
                              : getCellError(rowIndex, colIndex)?.errorMessage === valueError
                                ? "Valor incorreto: diferente do esperado"
                                : ""}
                            className={
                              submitted
                                ? getCellError(rowIndex, colIndex)?.errorMessage === typeError ? "type-error"
                                  : getCellError(rowIndex, colIndex)
                                    ? "error"
                                    : "success"
                                : ""
                            }
                          />
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="btn-container">
        <BsArrowLeftCircleFill
          title="Navegar para o exercício anterior"
          className={`arrow-btn ${currentExerciceIndex === 0 ? "disabled" : ""
            }`}
          onClick={goToPreviousExercice}
        />
        <button
          title="Enviar exercício para correção"
          className="btn-submit"
          onClick={handleSubmit}
          disabled={!isValid}
        >Enviar</button>
        {submitted && (
          <button
            title="Reiniciar exercício"
            onClick={() => resetExercice(exercices[currentExerciceIndex])}
          >
            <BsArrowRepeat />
          </button>
        )}
        <button title="Sair dessa dela" className="btn-sair" onClick={shownPopUp}>Sair</button>
        <BsArrowRightCircleFill
          title="Navegar para o próximo exercício"
          className={`arrow-btn ${currentExerciceIndex === exercices.length - 1 ? "disabled" : ""
            }`}
          onClick={goToNextExercice}
        />
      </div>

      {submitted && (
        <FeedbackBox
          title={
            isCorrect ? "Parabéns! Você acertou" : errorMessage || "Que pena! Tente novamente"
          }
        />
      )}

      {openPopUp && (
        <AttentionPopUp
          text="Tem certeza que deseja sair? Você perderá o progresso atual."
          confirmAction={() => navigate(-1)}
          cancelAction={() => setOpenPopUp(false)}
        />
      )}

      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imageSrc={exerciceJson.imgName}
      />
    </div>
  );
}

export default TraceTable;