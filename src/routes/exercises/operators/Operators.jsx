import operatorsData from "../../../data/arithmetic-operators/operators.json";
import Button from "../../../components/button/Button";
import { useNavigate } from "react-router-dom";

function Operators() {
  const navigate = useNavigate();

  function navigateForTraceTable(exercice, exerciceId) {
    localStorage.setItem("exercice", JSON.stringify(exercice));
    navigate(`/exercices/operators/${exerciceId}`);
  }

  return (
    <div className="background">
      <h1 className="title">Operadores Aritméticos</h1>
      <div className="container-data">
        {operatorsData &&
          operatorsData.length > 0 &&
          operatorsData.map((exercice) => (
            <div key={exercice.id}>
              <Button
                text={`Exercício ${exercice.id}`}
                action={() => navigateForTraceTable(exercice, exercice.id)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Operators;
