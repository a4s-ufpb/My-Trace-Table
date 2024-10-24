import { useState } from "react";
import "./TraceTable.css";

function TraceTable() {
  const exercice = localStorage.getItem("exercice");
  const exerciceJson = JSON.parse(exercice);

  const [userTraceTable, setUserTraceTable] = useState(
    exerciceJson.showTraceTable
  );
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (rowIndex, colIndex, value) => {
    const newTable = userTraceTable.map((row, rIdx) =>
      row.map((col, cIdx) =>
        rIdx === rowIndex && cIdx === colIndex ? value : col
      )
    );
    setUserTraceTable(newTable);
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
  };

  const checkIfCorrect = (rowIndex, colIndex) => {
    return (
      userTraceTable[rowIndex][colIndex] ===
      exerciceJson.expectedTraceTable[rowIndex][colIndex]
    );
  };

  return (
    <div className="background">
      <div className="trace-table-container">
        <div className="image-container">
          <h2>Exercício {exerciceJson.id}</h2>
          <img
            src={exerciceJson.imgPath}
            alt="Ilustração do exercício"
            className="exercise-image"
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
                      {cell === "-" ? (
                        <div className="disabled-cell"></div>
                      ) : (
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) =>
                            handleInputChange(
                              rowIndex,
                              colIndex,
                              e.target.value
                            )
                          }
                          disabled={cell === "-"}
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
        <button onClick={handleSubmit}>Enviar</button>
      </div>
    </div>
  );
}

export default TraceTable;
