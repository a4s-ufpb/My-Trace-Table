import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ImageModal from "../../../components/image-modal";
import Loading from "../../../components/loading/Loading";
import MessagePopUp from "../../../components/MessagePopUp";
import SecondaryHeader from "../../../components/secondary-header/SecondaryHeader";
import SubmissionList from "../../../components/SubmissionList";
import { TraceTableService } from "../../../service/TraceTableService";
import { ThemeService } from "../../../service/ThemeService";
import styles from "./styles.module.css";

function capitalizeFirstLetter(text) {
    if (!text) {
        return "";
    }

    return text.charAt(0).toUpperCase() + text.slice(1);
}

export default function ExerciseSubmissions() {
    const { id } = useParams();

    const [exercise, setExercise] = useState(null);
    const [themes, setThemes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMessagePopUp, setShowMessagePopUp] = useState(false);
    const [popUpMessage, setPopUpMessage] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const traceTableService = new TraceTableService();
    const themeService = new ThemeService();

    useEffect(() => {
        async function loadPageData() {
            setLoading(true);

            try {
                const [exerciseResponse, themesResponse] = await Promise.all([
                    traceTableService.getById(id),
                    themeService.getThemesByExercise(id),
                ]);

                if (exerciseResponse.success) {
                    setExercise(exerciseResponse.data);
                } else {
                    setExercise(null);
                    setPopUpMessage(
                        exerciseResponse.message || "Não foi possível carregar o exercício."
                    );
                    setShowMessagePopUp(true);
                }

                if (themesResponse.success) {
                    setThemes(themesResponse.data.content || []);
                } else {
                    setThemes([]);
                }
            } catch {
                setExercise(null);
                setThemes([]);
                setPopUpMessage(
                    "Não foi possível carregar os dados da página de submissão."
                );
                setShowMessagePopUp(true);
            } finally {
                setLoading(false);
            }
        }

        loadPageData();
    }, [id]);

    if (loading) {
        return (
            <div className="background">
                <Loading />
            </div>
        );
    }

    return (
        <div className="background">
            <SecondaryHeader
                showBackButton={true}
                title="Submissões do exercício"
                rightText={exercise ? `ID ${exercise.id}` : undefined}
            />

            {exercise ? (
                <>
                    <section className={styles.hero}>
                        <div className={styles.copy}>
                            <span className={styles.eyebrow}>Painel de acompanhamento</span>
                            <h2>{exercise.exerciseName}</h2>
                            <p>
                                Consulte as respostas enviadas pelos alunos e abra cada
                                submissão para revisar a tabela preenchida.
                            </p>

                            <div className={styles.metaList}>
                                <span className={styles.metaBadge}>
                                    Linguagem:{" "}
                                    {capitalizeFirstLetter(exercise.programmingLanguage)}
                                </span>

                                {themes.length > 0 && (
                                    <span className={styles.metaBadge}>
                                        Temas: {themes.map((theme) => theme.name).join(", ")}
                                    </span>
                                )}
                            </div>
                        </div>

                        {exercise.imgName && (
                            <button
                                type="button"
                                className={styles.previewCard}
                                onClick={() => setIsModalOpen(true)}
                            >
                                <img
                                    src={exercise.imgName}
                                    alt={`Ilustracao do exercicio ${exercise.exerciseName}`}
                                />
                                <span>Ampliar enunciado</span>
                            </button>
                        )}
                    </section>

                    <SubmissionList traceId={id} exercise={exercise} />
                </>
            ) : (
                <section className={styles.emptyState}>
                    <h3>Exercício não encontrado</h3>
                    <p>Verifique se o exercício ainda existe antes de consultar as submissões.</p>
                </section>
            )}

            <ImageModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                imageSrc={exercise?.imgName}
            />

            {showMessagePopUp && (
                <MessagePopUp
                    message={popUpMessage}
                    showPopUp={setShowMessagePopUp}
                />
            )}
        </div>
    );
}
