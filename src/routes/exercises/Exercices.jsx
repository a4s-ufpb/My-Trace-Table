import { useNavigate, useParams } from "react-router-dom"
import Button from "../../components/button/Button"
import "./Exercices.css"
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import { TraceTableService } from './../../service/TraceTableService';

function Exercices() {
    const navigate = useNavigate();
    const {id : themeId} = useParams();

    const [exercices, setExercices] = useState([]);

    const traceTableService = new TraceTableService();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      fetchExercices();
    }, []);

    async function fetchExercices() {
      try {
        setLoading(true);

        const themeResponse = await traceTableService.findAllTraceTablesByTheme(themeId);

        if(!themeResponse.success) {
          setExercices([]);
          return;
        }

        setExercices(themeResponse.data.content);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setExercices([]);
      }
    }

    function startExercice(exercice) {
      const exercicesList = JSON.stringify(exercices);
      localStorage.setItem("exercices", exercicesList);
      localStorage.setItem("currentExerciceIndex", exercices.findIndex(e => e.id === exercice.id));
      navigate("/trace-table");
    }    

  return (
    <div className="background">
      <h1 className="title">Selecione o exercício</h1>
        {exercices && exercices.length > 0 && exercices.map((exercice) => (
          <div key={exercice.id}>
            <Button text={exercice.exerciseName} action={() => startExercice(exercice)}/>
          </div>
        ))}

        {loading && <Loading />}

        {!loading && exercices.length == 0 && <h2 className="title">O tema não possui exercícios cadastrados!</h2>}
    </div>
  )
}

export default Exercices