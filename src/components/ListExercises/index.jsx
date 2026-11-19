import { useNavigate } from "react-router-dom";
import "./ListExercises.css";
import { BsTrash } from "react-icons/bs";
import { useState } from "react";
import AttentionPopUp from "../AttentionPopUp";

function ListExercises({ exercises, themesMap, removeExercise, startExercise }) {
    const [openPopUp, setOpenPopUp] = useState(false);
    const [exerciseId, setExerciseId] = useState(null);
    const navigate = useNavigate();

    const userRole = localStorage.getItem("userRole");
    const canManage = userRole === "admin" || userRole === "professor"; // Se for admin ou professor, pode gerenciar os exercícios
    const canAnswer = userRole === "user" || userRole === "professor" || userRole === "admin"; // Se for aluno, pode responder os exercícios
    

    const shownPopUp = (id) => {
        setOpenPopUp(true);
        setExerciseId(id);
    };

    return (
        <div className="content">
            <div className="listContainer">
                <h2 className="title">Lista de Exercícios</h2>
                <div className="cards">
                    {exercises.map((exercise) => (
                        <div key={exercise.id} className="card">
                            <div className="titleAndIcons">
                                <h3 className="table-title">{exercise.exerciseName}</h3>
                                {canManage && (
                                    <BsTrash
                                        className="icon-trash"
                                        onClick={() => shownPopUp(exercise.id)}
                                    />
                                )}
                            </div>
                            <span className="table-themes">
                                <strong>Temas: </strong>
                                {themesMap[exercise.id]?.join(", ") || "Carregando..."}
                            </span>
                            <div className="btnContainer">
                                {canAnswer && (
                                    <button
                                        className="btn"
                                        onClick={() => startExercise(exercise)}
                                    >
                                        Responder
                                    </button>
                                )}
                                
                                {canManage && (
                                    <>
                                        <button
                                            className="btn"
                                            onClick={() => navigate(`/exercicio/${exercise.id}`)}
                                        >
                                            Ver
                                        </button>
                                        <button
                                            className="btn"
                                            onClick={() => navigate(`/exercicio/${exercise.id}?edit=true`)}
                                        >
                                            Editar
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {openPopUp && (
                <AttentionPopUp
                    text="Tem certeza que deseja excluir este exercício? Não será possível recuperá-lo!"
                    confirmAction={() => {
                        removeExercise(exerciseId);
                        setOpenPopUp(false);
                        setExerciseId(null);
                    }}
                    cancelAction={() => setOpenPopUp(false)}
                />
            )}
        </div>
    );
}

export default ListExercises;