import { useNavigate } from "react-router-dom";
import conditionalData from "../../../data/conditonals.json"
import Button from "../../../components/button/Button";

function Conditionals() {
  const navigate = useNavigate();
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
                action={() => navigate(`/exercices/conditionals/${exercice.id}`)}
              />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Conditionals;
