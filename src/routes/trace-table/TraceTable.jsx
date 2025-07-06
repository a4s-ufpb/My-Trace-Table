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
          setErrorMessage("Atenção! Existem erro(s) de tipo.");
        } else if (valueErrors > 0 && typeErrors === 0) {
          setErrorMessage("Existem valor(es) incorreto(s).");
        } else {
          setErrorMessage("Há erro(s) de tipo e de valor. Verifique a tabela.");
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

  return (
    <div className="background-trace">
      <div className="trace-table-container">
        <div className="image-container">
          <h2>{exerciceJson.exerciseName}</h2>
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
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userTraceTable.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {hasStep && <td className="step-cell">{rowIndex + 1}º</td>}
                  {row.map((cell, colIndex) => (
                    <td key={colIndex}>
                      {cell === "#" ? (
                        <div className="disabled-cell"></div>
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
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="btn-container">
        <BsArrowLeftCircleFill
          className={`arrow-btn ${currentExerciceIndex === 0 ? "disabled" : ""
            }`}
          onClick={goToPreviousExercice}
        />
        <button onClick={handleSubmit}>Enviar</button>
        {submitted && (
          <button
            onClick={() => resetExercice(exercices[currentExerciceIndex])}
          >
            <BsArrowRepeat />
          </button>
        )}
        <BsArrowRightCircleFill
          className={`arrow-btn ${currentExerciceIndex === exercices.length - 1 ? "disabled" : ""
            }`}
          onClick={goToNextExercice}
        />
      </div>

      {submitted && (
        <FeedbackBox
          title={
            isCorrect ? "Parabéns! Você acertou!" : errorMessage || "Que pena! Tente novamente"
          }
          color={isCorrect ? "green" : "red"}
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