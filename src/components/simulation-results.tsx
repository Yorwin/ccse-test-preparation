import React from "react";
import { useEffect, useState } from "react";
import TaskControl from "./TaskControl";
import ProgressNextBack from "./progress-next-back-results";
import SimulationResultQuestions from "./simulation-results-questions";
import ControlBar from "./simulation-results-control-bar";
import styles from '../styles-pages/results.module.css'
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";

interface historyProps {
    showSimulationResult: (e: any) => void;
    questionId: string;
}

interface Questions {
    id?: string,
    pregunta?: string,
}

interface ModulesMap {
    [key: string]: Questions[]; // Cada módulo contiene un array de preguntas
}

const SimulationResults = ({ showSimulationResult, questionId }: historyProps) => {

    const user = auth.currentUser;

    if (!user) {
        throw new Error("Usuario no autenticado");
    }

    const [preguntasPorModulo, setPreguntasPorModulo] = useState<ModulesMap>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {

        const getQuestions = async () => {
            try {
                setIsLoading(true);
                const questionRef = doc(db, "users", user.uid, "resultados", questionId);
                const docSnapshot = await getDoc(questionRef);
                const data = docSnapshot.data();

                if (data && data.questions) {
                    const questions = JSON.parse(data.questions);
                    const modulesMap: ModulesMap = {};

                    // Procesar las preguntas
                    questions.forEach((moduleQuestions: Questions[], index: number) => {
                        const moduleKey = `module${index + 1}`;
                        modulesMap[moduleKey] = moduleQuestions;
                    });

                    // Actualizar el estado con los datos procesados
                    setPreguntasPorModulo(modulesMap);
                } else {
                    console.warn("No se encontraron preguntas para este ID");
                    setPreguntasPorModulo({});
                }
            } catch (error) {
                console.error("Error al cargar las preguntas:", error);
            } finally {
                setIsLoading(false);
            }
        };

        // Ejecutar la función
        getQuestions();
    }, [questionId, user.uid]); // Solo dependencias necesarias

    return <>
        <div className={styles["simulation-results-container"]}>
            <div className={styles["header-container"]}>
                <div>
                    <button onClick={showSimulationResult} className={styles["exit-test-icon"]}>
                        <i className="bi bi-x-circle-fill"></i>
                    </button>
                </div>
                <div className={styles["check-answers-container"]}>
                    <h1 className={styles["title-check-answers"]}>Revisar respuestas</h1>
                    <ProgressNextBack />
                </div>
                <TaskControl taskCounter={0} />
            </div>
            <div className={styles["question-container"]}>
                {isLoading ? (
                    <p>Cargando preguntas...</p>
                ) : (
                    <SimulationResultQuestions questionData={preguntasPorModulo} />
                )}
            </div>
            <ControlBar />
        </div>
    </>
};

export default SimulationResults;