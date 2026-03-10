import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/button/Button";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import { TraceTableService } from "./../../service/TraceTableService";
import { ThemeService } from "./../../service/ThemeService";
import SecondaryHeader from "../../components/secondary-header/SecondaryHeader";

function Exercices() {
  const navigate = useNavigate();
  const { info: info } = useParams();
  const creatorId = useLocation().state?.creatorId;
  
  const [exercices, setExercices] = useState([]);
  const [themeName, setThemeName] = useState("");

  const traceTableService = new TraceTableService();
  const themeService = new ThemeService();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchExercices();
  }, []);

  async function fetchExercices() {
    try {
      setLoading(true);

      let traceTableList;
      let themeResponse; 

      const isNumeric = (value) => {
        return !isNaN(value) && value !== null && value !== undefined && value !== "";
      }

      if (isNumeric(info)) {
        traceTableList = await traceTableService.findAllTraceTablesByTheme(info);

        themeResponse = await themeService.findThemeById(info);
        
      } else {
        traceTableList = await traceTableService.findAllTraceTablesByThemeName(info, 0, 1000, creatorId);

        themeResponse = await themeService.findThemeByName(info);
      }

      if (!traceTableList.success || !themeResponse.success) {
        setExercices([]);
        return;
      }

      const exercicesList = traceTableList.data.content;
      const creatorName = themeResponse.data.name;
      setExercices(exercicesList);
      setThemeName(creatorName);
    } catch (error) {
      console.log(error);
      setExercices([]);
    } finally {
      setLoading(false);
    }
  }

  function startExercice(exercice) {
    const exercicesList = JSON.stringify(exercices);
    localStorage.setItem("exercices", exercicesList);
    localStorage.setItem(
      "currentExerciceIndex",
      exercices.findIndex((e) => e.id === exercice.id)
    );
    navigate("/trace-table");
  }

  return (
    <div className="background">
      <SecondaryHeader showBackButton={true} title="Selecione o exercício" rightText={`Tema: ${themeName}`} />
      <div className="center-content">
        {exercices &&
          exercices.length > 0 &&
          exercices.map((exercice) => (
            <Button
              key={exercice.id}
              text={exercice.exerciseName}
              action={() => startExercice(exercice)}
            />
          ))}

        {loading && <Loading />}

        {!loading && exercices.length == 0 && (
          <h3>O tema não possui exercícios cadastrados!</h3>
        )}
      </div>

    </div>
  );
}

export default Exercices;