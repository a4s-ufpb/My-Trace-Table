import repeatsData from "../../../data/repeats.json"
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/button/Button';

function Repeats() {
    const navigate = useNavigate();
    return (
      <div className="background">
        <h1 className="title">Laços de Repetição</h1>
        <div className="container-data">
          {repeatsData &&
            repeatsData.length > 0 &&
            repeatsData.map((exercice) => (
              <div key={exercice.id}>
                <Button
                  text={`Exercício ${exercice.id}`}
                  action={() => navigate(`/exercices/repeats/${exercice.id}`)}
                />
              </div>
            ))}
        </div>
      </div>
    );
}

export default Repeats