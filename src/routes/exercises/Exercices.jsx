import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Loading from "../../components/loading/Loading";
import PageChanging from "../../components/PageChanging";
import MessagePopUp from "../../components/MessagePopUp";
import SecondaryHeader from "../../components/secondary-header/SecondaryHeader";
import styles from "./styles.module.css";
import { ThemeService } from "../../service/ThemeService";
import { TraceTableService } from "../../service/TraceTableService";
import Button from "../../components/button/Button";

export default function Exercises() {
  const navigate = useNavigate();
  const location = useLocation();
  const { info } = useParams();
  const creatorId = location.state?.creatorId || localStorage.getItem("userId");

  // Identificação do papel do usuário (Ajuste a chave do localStorage conforme seu projeto)
  const userRole = localStorage.getItem("userRole") || "aluno";
  const canManage = userRole === "admin" || userRole === "professor";

  const [exercises, setExercises] = useState([]);
  const [allThemes, setAllThemes] = useState([]);
  const [filteredTheme, setFilteredTheme] = useState({ id: null, name: info || "todos" });
  
  const [themesMap, setThemesMap] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);

  const [showMessagePopUp, setShowMessagePopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");

  const themeService = new ThemeService();
  const traceTableService = new TraceTableService();

  useEffect(() => {
    if (location.state?.refresh) {
      loadExercises();
      navigate(location.pathname, { replace: true });
    }
  }, [location]);

  useEffect(() => {
    loadThemes();
  }, []);

  useEffect(() => {
    loadExercises();
  }, [currentPage, filteredTheme]);

  useEffect(() => {
    if (exercises.length > 0) {
      loadThemesPerExercise();
    }
  }, [exercises]);

  const loadThemes = async () => {
    const response = await themeService.findAllThemesByUser();
    if (response.success) {
      setAllThemes(response.data.content || []);
    }
  };

  const loadThemesPerExercise = async () => {
    const newMap = {};
    for (const trace of exercises) {
      const response = await themeService.getThemesByExercise(trace.id);
      if (response.success) {
        newMap[trace.id] = response.data.content.map(t => t.name);
      }
    }
    setThemesMap(newMap);
  };

  const loadExercises = async () => {
    setLoading(true);
    try {
      let response;
      if (filteredTheme.name === "todos") {
        response = await traceTableService.getAllByUser(creatorId, currentPage);
      } else {
        // Se temos um ID, busca por ID, senão busca pelo nome do tema vindo dos parâmetros
        const themeId = filteredTheme.id || info; 
        const isNumeric = !isNaN(themeId) && themeId !== null && themeId !== undefined;
        
        if (isNumeric) {
          response = await traceTableService.getAllByTheme(themeId, currentPage);
        } else {
          response = await traceTableService.findAllTraceTablesByThemeName(themeId, currentPage, 10, creatorId);
        }
      }

      if (response && response.success) {
        setExercises(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
      } else {
        setExercises([]);
      }
    } catch (error) {
      setPopUpMessage("Erro ao carregar os exercícios. Tente novamente.");
      setShowMessagePopUp(true);
    } finally {
      setLoading(false);
    }
  };

  // --- Ações do Usuário ---

  const startExercise = (exercise) => {
    const exercisesList = JSON.stringify(exercises);
    localStorage.setItem("exercices", exercisesList);
    localStorage.setItem(
      "currentExerciceIndex",
      exercises.findIndex((e) => e.id === exercise.id).toString()
    );
    navigate("/trace-table");
  };

  const editExercise = (id) => {
    navigate(`/edit-trace-table/${id}`); // Ajuste a rota de edição conforme seu projeto
  };

  const removeExercise = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este exercício?")) return;
    
    const response = await traceTableService.deleteTraceTable(id);
    if (response.success) {
      setPopUpMessage("Exercício removido com sucesso!");
      const updated = exercises.filter((trace) => trace.id !== id);
      setExercises(updated);

      if (updated.length === 0 && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      } else {
        loadExercises();
      }
    } else {
      setPopUpMessage(response.message || "Erro ao remover exercício");
    }
    setShowMessagePopUp(true);
  };

  // --- Controles de Interface ---

  const setFilteredThemeAndResetPage = (theme) => {
    setFilteredTheme(theme);
    setCurrentPage(0);
  };

  const changePage = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="background">
      <SecondaryHeader 
        showBackButton={true} 
        title="Exercícios" 
        rightText={`Tema atual: ${filteredTheme.name}`} 
      />

      <nav className={styles.nav}>
        <ul>
          <li>
            <button
              onClick={() => setFilteredThemeAndResetPage({ id: null, name: "todos" })}
              className={`${styles.button} ${filteredTheme.name === "todos" ? styles.active : ""}`}
            >
              Todos
            </button>
          </li>
          {allThemes.length > 0 &&
            allThemes.map((theme) => (
              <li key={theme.id}>
                <button
                  onClick={() => setFilteredThemeAndResetPage(theme)}
                  className={`${styles.button} ${filteredTheme.name === theme.name ? styles.active : ""}`}
                >
                  {theme.name}
                </button>
              </li>
            ))}
        </ul>
      </nav>

      <div className="center-content">
        {loading ? (
          <Loading />
        ) : exercises.length > 0 ? (
          <div className={styles.exerciseList}>
            {exercises.map((exercise) => (
              <div key={exercise.id} className={styles.exerciseCard}>
                <h4>{exercise.exerciseName}</h4>
                <p>Temas: {themesMap[exercise.id]?.join(", ") || "Carregando..."}</p>
                
                <div className={styles.actions}>
                  {/* Usuário Padrão ou Admin/Professor podem responder */}
                  <Button text="Responder" action={() => startExercise(exercise)} />
                  
                  {/* Apenas Admin ou Professor podem editar e excluir */}
                  {canManage && (
                    <>
                      <Button text="Editar" action={() => editExercise(exercise.id)} />
                      <Button text="Excluir" action={() => removeExercise(exercise.id)} />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h3 className={styles.span}>Nenhum exercício foi encontrado para este tema!</h3>
        )}

        {showMessagePopUp && (
          <MessagePopUp
            message={popUpMessage}
            showPopUp={setShowMessagePopUp}
          />
        )}

        {!loading && exercises.length > 0 && (
          <PageChanging
            currentPage={currentPage}
            totalPages={totalPages}
            changePage={changePage}
          />
        )}
      </div>
    </div>
  );
}