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

  const [placeholders, setPlaceholders] = useState(
    userTraceTable.map((row) => row.map(() => "?"))
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (exerciceJson) {
      const hasStep = exerciceJson.header.some(h => h.toLowerCase().includes("passo"));
      setHasStep(hasStep);
    } else {
      navigate("/exercices");
    }
  })

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

  const handleSubmit = () => {
    const errorList = [];
    userTraceTable.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell !== exerciceJson.expectedTraceTable[rowIndex][colIndex]) {
          errorList.push({ rowIndex, colIndex });
        }
      });
    });
    setSubmitted(true);
    setIsCorrect(errorList.length === 0);
  };

  const checkIfCorrect = (rowIndex, colIndex) => {
    return (
      userTraceTable[rowIndex][colIndex] ===
      exerciceJson.expectedTraceTable[rowIndex][colIndex]
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
                          className={
                            submitted
                              ? checkIfCorrect(rowIndex, colIndex)
                                ? "success"
                                : "error"
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
            isCorrect ? "Parabéns! Você acertou!" : "Que pena! Tente novamente"
          }
          color={isCorrect ? "green" : "red"}
        />
      )}

      <ImageModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        imageSrc={exerciceJson.imgPath}
      />
    </div>
  );
}

export default TraceTable;