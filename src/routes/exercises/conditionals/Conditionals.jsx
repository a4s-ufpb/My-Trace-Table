import { useNavigate } from "react-router-dom";
import conditionalData from "../../../data/conditionals/conditonals.json"
import Button from "../../../components/button/Button";

function Conditionals() {
  const navigate = useNavigate();

  function navigateForTraceTable(exercice, exerciceId) {
    localStorage.setItem("exercice", JSON.stringify(exercice));
    navigate(`/exercices/conditionals/${exerciceId}`)
  }
  
  return (
    <div className="background">
      <h1 className="title">Condicionais</h1>
      <div className="container-data">
        {conditionalData &&
          conditionalData.length > 0 &&
          conditionalData.map((exercice) => (
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

export default Conditionals;
