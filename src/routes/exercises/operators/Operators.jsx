import "./Operators.css"

import operatorsData from "../../../data/operators.json"
import Button from "../../../components/button/Button"

function Operators() {

  return (
    <div className="background">
        <h1>Operadores Aritméticos</h1>
        {operatorsData && operatorsData.length > 0 && operatorsData.map((exercice) => (
            <div key={exercice.id} className="operators-data">
                <Button text={`Exercício ${exercice.id}`}/>
            </div>
        ))}
    </div>
  )
}

export default Operators