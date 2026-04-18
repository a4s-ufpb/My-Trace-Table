import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Button from "../../components/button/Button";
import Loading from "../../components/loading/Loading";
import MessagePopUp from "../../components/MessagePopUp";
import PageChanging from "../../components/PageChanging";
import SecondaryHeader from "../../components/secondary-header/SecondaryHeader";
import { ThemeService } from "../../service/ThemeService";
import { TraceTableService } from "../../service/TraceTableService";
import styles from "./styles.module.css";

export default function Exercises() {
  const navigate = useNavigate();
  const location = useLocation();
  const { info } = useParams();
  const [searchParams] = useSearchParams();

  const creatorId =
    location.state?.creatorId ||
    searchParams.get("creatorId") ||
    localStorage.getItem("userId");
  const creatorName =
    location.state?.creatorName ||
    searchParams.get("creatorName") ||
    "";
  const stateInitialTheme = location.state?.initialTheme;
  const queryThemeName = searchParams.get("themeName");

  const userRole = localStorage.getItem("userRole") || "aluno";
  const canManage = userRole === "admin" || userRole === "professor";

  const themeService = new ThemeService();
  const traceTableService = new TraceTableService();

  function resolveInitialTheme() {
    if (stateInitialTheme?.name) {
      return stateInitialTheme;
    }

    if (!info) {
      return { id: null, name: "todos" };
    }

    const parsedThemeId = Number(info);
    const hasNumericThemeId = !Number.isNaN(parsedThemeId);

    return {
      id: hasNumericThemeId ? parsedThemeId : null,
      name: queryThemeName || info,
    };
  }

  const [exercises, setExercises] = useState([]);
  const [allThemes, setAllThemes] = useState([]);
  const [filteredTheme, setFilteredTheme] = useState(resolveInitialTheme);
  const [themesMap, setThemesMap] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showMessagePopUp, setShowMessagePopUp] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState("");

  useEffect(() => {
    if (location.state?.refresh) {
      loadExercises();
      navigate(`${location.pathname}${location.search}`, { replace: true });
    }
  }, [location.pathname, location.search, location.state?.refresh]);

  useEffect(() => {
    setFilteredTheme(resolveInitialTheme());
    setCurrentPage(0);
  }, [info, queryThemeName, stateInitialTheme?.id, stateInitialTheme?.name]);

  useEffect(() => {
    loadThemes();
  }, [creatorId]);

  useEffect(() => {
    loadExercises();
  }, [creatorId, currentPage, filteredTheme]);

  useEffect(() => {
    if (exercises.length === 0) {
      setThemesMap({});
      return;
    }

    loadThemesPerExercise();
  }, [exercises]);

  const loadThemes = async () => {
    if (!creatorId) {
      setAllThemes([]);
      return;
    }

    const response = await themeService.findAllThemesByUser(creatorId);

    if (response.success) {
      setAllThemes(response.data.content || []);
      return;
    }

    setAllThemes([]);
  };

  const loadThemesPerExercise = async () => {
    const newMap = {};

    for (const trace of exercises) {
      const response = await themeService.getThemesByExercise(trace.id);
      if (response.success) {
        newMap[trace.id] = response.data.content.map((theme) => theme.name);
      }
    }

    setThemesMap(newMap);
  };

  const loadExercises = async () => {
    setLoading(true);

    try {
      let response;

      if (filteredTheme.name === "todos") {
        response = await traceTableService.findAllTraceTablesByUser(creatorId, currentPage, 10);
      } else if (filteredTheme.id !== null && filteredTheme.id !== undefined) {
        response = await traceTableService.findAllTraceTablesByTheme(filteredTheme.id, currentPage, 10);
      } else {
        response = await traceTableService.findAllTraceTablesByThemeName(
          filteredTheme.name,
          currentPage,
          10,
          creatorId
        );
      }

      if (response?.success) {
        setExercises(response.data.content || []);
        setTotalPages(response.data.totalPages || 0);
      } else {
        setExercises([]);
        setTotalPages(0);
      }
    } catch (error) {
      setPopUpMessage("Erro ao carregar os exercicios. Tente novamente.");
      setShowMessagePopUp(true);
    } finally {
      setLoading(false);
    }
  };

  const startExercise = (exercise) => {
    localStorage.setItem("exercices", JSON.stringify(exercises));
    localStorage.setItem(
      "currentExerciceIndex",
      exercises.findIndex((currentExercise) => currentExercise.id === exercise.id).toString()
    );
    navigate("/trace-table");
  };

  const editExercise = (id) => {
    navigate(`/exercicio/${id}`);
  };

  const openSubmissions = (id) => {
    navigate(`/exercicio/${id}/submissoes`);
  };

  const removeExercise = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este exercicio?")) {
      return;
    }

    const response = await traceTableService.deleteTraceTable(id);

    if (response.success) {
      setPopUpMessage("Exercicio removido com sucesso!");
      const updatedExercises = exercises.filter((trace) => trace.id !== id);
      setExercises(updatedExercises);

      if (updatedExercises.length === 0 && currentPage > 0) {
        setCurrentPage(currentPage - 1);
      } else {
        loadExercises();
      }
    } else {
      setPopUpMessage(response.message || "Erro ao remover exercicio");
    }

    setShowMessagePopUp(true);
  };

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
        title="Exercicios"
        rightText={
          creatorName
            ? `Professor: ${creatorName} | Tema atual: ${filteredTheme.name}`
            : `Tema atual: ${filteredTheme.name}`
        }
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
          {allThemes.map((theme) => (
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
                <div className={styles.cardHeader}>
                  <h4>{exercise.exerciseName}</h4>
                  <span className={styles.exerciseCode}>ID {exercise.id}</span>
                </div>

                <p>Temas: {themesMap[exercise.id]?.join(", ") || "Carregando..."}</p>

                <div className={styles.actions}>
                  <Button
                    text="Responder"
                    action={() => startExercise(exercise)}
                    className={styles.actionButton}
                  />

                  {canManage && (
                    <>
                      <Button
                        text="Submissões"
                        action={() => openSubmissions(exercise.id)}
                        className={styles.actionButton}
                      />
                      <Button
                        text="Editar"
                        action={() => editExercise(exercise.id)}
                        className={styles.actionButton}
                      />
                      <Button
                        text="Excluir"
                        action={() => removeExercise(exercise.id)}
                        className={styles.actionButtonDanger}
                      />
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <h3 className={styles.span}>Nenhum exercicio foi encontrado para este tema.</h3>
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
