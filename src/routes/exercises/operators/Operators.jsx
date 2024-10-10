import operatorsData from "../../../data/operators.json";
import Button from "../../../components/button/Button";
import { useNavigate } from "react-router-dom";

function Operators() {
  const navigate = useNavigate();

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
                action={() => navigate(`/exercices/operators/${exercice.id}`)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Operators;
