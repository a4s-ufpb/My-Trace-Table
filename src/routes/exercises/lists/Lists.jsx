import { useNavigate } from 'react-router-dom'
import Button from '../../../components/button/Button'
import listData from '../../../data/lists.json'

function Lists() {
    const navigate = useNavigate();
  return (
    <div className="background">
      <h1 className="title">Listas</h1>
      <div className="container-data">
        {listData &&
          listData.length > 0 &&
          listData.map((exercice) => (
            <div key={exercice.id}>
              <Button
                text={`Exercício ${exercice.id}`}
                action={() => navigate(`/exercices/lists/${exercice.id}`)}
              />
            </div>
          ))}
      </div>
    </div>
  )
}

export default Lists