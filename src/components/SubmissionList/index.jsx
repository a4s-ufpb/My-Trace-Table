//ver esse arquivo para documentar

import { useEffect, useState } from "react";
import {
    BsCalendar3,
    BsEye,
    BsPersonFill,
    BsXCircleFill,
} from "react-icons/bs";
import Loading from "../loading/Loading";
import { TraceTableService } from "../../service/TraceTableService";
import styles from "./styles.module.css";

const DATE_FORMATTER = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
    timeStyle: "short",
});

function parseTableData(rawTableData) {
    if (Array.isArray(rawTableData)) {
        return rawTableData;
    }

    if (typeof rawTableData === "string") {
        try {
            const parsedTableData = JSON.parse(rawTableData);
            return Array.isArray(parsedTableData) ? parsedTableData : [];
        } catch {
            return [];
        }
    }

    return [];
}

function normalizeAnswers(responseData) {
    const answers = Array.isArray(responseData)
        ? responseData
        : responseData?.content || [];

    return answers.map((answer, index) => ({
        id: answer.id || `submission-${index}`,
        studentName:
            answer.studentName ||
            answer.userName ||
            answer.student?.name ||
            "Aluno não identificado",
        date:
            answer.date ||
            answer.createdAt ||
            answer.submittedAt ||
            answer.answerDate ||
            null,
        tableData: parseTableData(
            answer.tableData ||
            answer.answerTable ||
            answer.userTraceTable ||
            answer.traceTable
        ),
    }));
}

function formatSubmissionDate(dateValue) {
    if (!dateValue) {
        return "Data não informada";
    }

    const parsedDate = new Date(dateValue);

    if (Number.isNaN(parsedDate.getTime())) {
        return "Data inválida";
    }

    return DATE_FORMATTER.format(parsedDate);
}

function buildFallbackHeaders(tableData) {
    const firstRow = tableData[0] || [];

    return Array.from(
        { length: firstRow.length },
        (_, index) => `Coluna ${index + 1}`
    );
}

function getHeaderList(exercise, tableData) {
    if (exercise?.header?.length) {
        return exercise.header;
    }

    return buildFallbackHeaders(tableData);
}

function getColumnClasses(columnName) {
    if (!columnName) {
        return "";
    }

    const lowerCaseName = columnName.toLowerCase();
    const classes = [];

    if (lowerCaseName.includes("passo") || lowerCaseName.includes("linha")) {
        classes.push(styles.metadataColumn);
    }

    return classes.join(" ");
}

export default function SubmissionList({ traceId, exercise, startDate, endDate }) {
    const [answers, setAnswers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const traceTableService = new TraceTableService();

    useEffect(() => {
        async function fetchAnswers() {
            setLoading(true);
            setErrorMessage("");

            const response = await traceTableService.getAnswersByExerciseAndDate(traceId, startDate, endDate);

            if (response.success) {
                const normalizedAnswers = normalizeAnswers(response.data);

                normalizedAnswers.sort((left, right) => {
                    const leftTime = left.date ? new Date(left.date).getTime() : 0;
                    const rightTime = right.date ? new Date(right.date).getTime() : 0;
                    return rightTime - leftTime;
                });

                setAnswers(normalizedAnswers);
            } else {
                setAnswers([]);
                setErrorMessage(
                    response.message || "Não foi possível carregar as submissões."
                );
            }

            setLoading(false);
        }

        fetchAnswers();
    }, [traceId, startDate, endDate]);

    useEffect(() => {
        function handleEscape(event) {
            if (event.key === "Escape") {
                setSelectedAnswer(null);
            }
        }

        if (!selectedAnswer) {
            return undefined;
        }

        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [selectedAnswer]);

    const selectedTableData = selectedAnswer?.tableData || [];
    const previewHeaders = getHeaderList(exercise, selectedTableData);
    const hasStepColumn = previewHeaders.some((header) =>
        header.toLowerCase().includes("passo")
    );
    const shouldRenderGeneratedStep =
        hasStepColumn &&
        selectedTableData.length > 0 &&
        previewHeaders.length === selectedTableData[0].length + 1;
    const headerOffset = shouldRenderGeneratedStep ? 1 : 0;

    return (
        <>
            <section className={styles.shell}>
                <div className={styles.header}>
                    <div>
                        <span className={styles.eyebrow}>Acompanhamento</span>
                        <h3>Submissões recebidas</h3>
                        <p>
                            Abra uma resposta para visualizar a tabela preenchida pelo
                            aluno.
                        </p>
                    </div>

                    {!loading && (
                        <span className={styles.counter}>
                            {answers.length} {answers.length === 1 ? "envio" : "envios"}
                        </span>
                    )}
                </div>

                {loading ? (
                    <div className={styles.stateBox}>
                        <Loading />
                    </div>
                ) : errorMessage ? (
                    <div className={styles.stateBox}>
                        <h4>Falha ao carregar</h4>
                        <p>{errorMessage}</p>
                    </div>
                ) : answers.length === 0 ? (
                    <div className={styles.stateBox}>
                        <h4>Nenhuma submissão registrada</h4>
                        <p>
                            Assim que os alunos enviarem respostas, elas vão aparecer
                            aqui.
                        </p>
                    </div>
                ) : (
                    <div className={styles.tableWrapper}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Aluno</th>
                                    <th>Data do envio</th>
                                    <th>Tabela</th>
                                    <th>Ação</th>
                                </tr>
                            </thead>
                            <tbody>
                                {answers.map((answer) => {
                                    const hasTableData = answer.tableData.length > 0;

                                    return (
                                        <tr key={answer.id}>
                                            <td className={styles.studentCell}>
                                                <div className={styles.studentInfo}>
                                                    <BsPersonFill />
                                                    <div>
                                                        <strong>{answer.studentName}</strong>
                                                        <span>
                                                            {hasTableData
                                                                ? `${answer.tableData.length} linhas respondidas`
                                                                : "Sem dados de tabela"}
                                                        </span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={styles.dateBadge}>
                                                    <BsCalendar3 />
                                                    {formatSubmissionDate(answer.date)}
                                                </span>
                                            </td>
                                            <td>
                                                <span className={styles.rowsBadge}>
                                                    {hasTableData
                                                        ? `${answer.tableData[0]?.length || 0} colunas`
                                                        : "Indisponível"}
                                                </span>
                                            </td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className={styles.viewButton}
                                                    onClick={() => setSelectedAnswer(answer)}
                                                    disabled={!hasTableData}
                                                >
                                                    <BsEye />
                                                    Ver tabela
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>

            {selectedAnswer && (
                <div
                    className={styles.overlay}
                    onClick={() => setSelectedAnswer(null)}
                >
                    <div
                        className={styles.modal}
                        onClick={(event) => event.stopPropagation()}
                    >
                        <div className={styles.modalHeader}>
                            <div>
                                <span className={styles.eyebrow}>Submissão selecionada</span>
                                <h3>{selectedAnswer.studentName}</h3>
                                <p>{formatSubmissionDate(selectedAnswer.date)}</p>
                            </div>

                            <button
                                type="button"
                                className={styles.closeButton}
                                onClick={() => setSelectedAnswer(null)}
                            >
                                <BsXCircleFill />
                                Fechar
                            </button>
                        </div>

                        <div className={styles.previewShell}>
                            {exercise?.exerciseName && (
                                <div className={styles.previewInfo}>
                                    <span className={styles.previewLabel}>Exercício</span>
                                    <strong>{exercise.exerciseName}</strong>
                                </div>
                            )}

                            <div className={styles.previewTableWrapper}>
                                <table className={styles.previewTable}>
                                    <thead>
                                        <tr>
                                            {previewHeaders.map((header, index) => (
                                                <th
                                                    key={`${header}-${index}`}
                                                    className={getColumnClasses(header)}
                                                >
                                                    {header}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {selectedTableData.map((row, rowIndex) => (
                                            <tr key={`submission-row-${rowIndex}`}>
                                                {shouldRenderGeneratedStep && (
                                                    <td
                                                        className={`${styles.stepCell} ${styles.metadataColumn}`}
                                                    >
                                                        {rowIndex + 1}o
                                                    </td>
                                                )}

                                                {row.map((cell, colIndex) => {
                                                    const columnName =
                                                        previewHeaders[colIndex + headerOffset];
                                                    const value = cell === "#" ? "" : cell;

                                                    return (
                                                        <td
                                                            key={`submission-cell-${rowIndex}-${colIndex}`}
                                                            className={
                                                                cell === "#"
                                                                    ? styles.disabledCell
                                                                    : getColumnClasses(columnName)
                                                            }
                                                        >
                                                            {value}
                                                        </td>
                                                    );
                                                })}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
