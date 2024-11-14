import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TraceTable.css";
import ImageModal from "../../components/image-modal/ImageModal";
import FeedbackBox from "../../components/feedback-box/FeedbackBox";
import { BsArrowRepeat } from "react-icons/bs";

function TraceTable() {
  const exercice = localStorage.getItem("exercice");
  const exerciceJson = JSON.parse(exercice);

  const [userTraceTable, setUserTraceTable] = useState(exerciceJson.showTraceTable);
  const [submitted, setSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const [placeholders, setPlaceholders] = useState(
    userTraceTable.map(row => row.map(() => "?"))
  );

  const navigate = useNavigate();

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
    setPlaceholders(prevPlaceholders => 
      prevPlaceholders.map((row, rIdx) =>
        row.map((placeholder, cIdx) => 
          rIdx === rowIndex && cIdx === colIndex ? "" : placeholder
        )
      )
    );
  };

  const handleBlur = (rowIndex, colIndex) => {
    setPlaceholders(prevPlaceholders => 
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

  return (
    <div className="background-trace">
      <div className="trace-table-container">
        <div className="image-container">
          <h2>Exercício {exerciceJson.id}</h2>
          <img
            src={exerciceJson.imgPath}
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
                  <td>{rowIndex + 1}°</td>
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
        {!submitted ? (
          <button onClick={handleSubmit}>Enviar</button>
        ) : (
          <>
            <button onClick={() => window.location.reload()}><BsArrowRepeat/></button>
            <button onClick={() => navigate(-1)}>Exercícios</button>
          </>
        )}
      </div>

      {submitted && (
        <FeedbackBox
          title={
            isCorrect
              ? "Parabéns! Você acertou!"
              : "Que pena! Tente novamente"
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