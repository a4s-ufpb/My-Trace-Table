import { useNavigate } from "react-router-dom"
import Button from "../../components/button/Button"
import "./Exercices.css"

function Exercices() {
    const navigate = useNavigate();

  return (
    <div className="background">
        <Button text="Operadores Aritméticos" action={() => navigate("/exercices/operators")}/>
        <Button text="Condicionais" action={() => navigate("/exercices/conditionals")}/>
        <Button text="Laços de Repetição" action={() => navigate("/exercices/repeats")}/>
        <Button text="Listas" action={() => navigate("/exercices/lists")}/>
    </div>
  )
}

export default Exercices