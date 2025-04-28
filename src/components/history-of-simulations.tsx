import React, { ReactNode, useEffect, useState } from "react";
import noInfoImage from "../resources/undraw_page-eaten_b2rt.svg"
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { auth } from "../config/firebase";
import { getFullDate } from "../functions/functions";
import styles from "./graphic-test-made.module.css"

interface historyProps {
    showSimulationResult: (e: any) => void;
}

const HistoryOfSimulations = ({ showSimulationResult }: historyProps) => {

    const user = auth.currentUser;

    if (!user) {
        throw new Error('Usuario no autenticado');
    }

    const [testResults, setTestResults] = useState<ReactNode[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [displayLimit, setDisplayLimit] = useState(5);

    const getResults = async () => {
        const resultsRef = collection(db, "users", user.uid, "resultados");
        const snapshot = await getDocs(resultsRef);

        const data = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        });

        return data;
    };

    const calculateApproved = (e: number) => {
        if (e >= 20) {
            return "Apto";
        } else {
            return "No Apto";
        }
    }

    const calculateRightAnswerPercentage = (e: number) => {
        const totalQuestions = 25;
        const rightTests = e;

        const successPercentage = rightTests / totalQuestions;
        const percentage = Math.round(successPercentage * 100);

        return percentage;
    };

    const getTotalRightAnswers = (e: number) => {
        const totalQuestions = 25;
        return `${e}/${totalQuestions}`
    };

    const processedResults = async () => {

        try {
            const getResultsUser = await getResults();

            const processedArray = getResultsUser.map((e: any) => ({
                id: e.id,
                date: e.Date,
                totalRightAnswers: getTotalRightAnswers(e.score),
                approved: calculateApproved(e.score),
                percentage: calculateRightAnswerPercentage(e.score),
                secondsSinceMidNight: e.secondsSinceMidNight,
            }));

            const sortedArray = processedArray.sort((a, b) => {

                const today = getFullDate();

                // Verificar cual de los dos Items corresponde a TODAY. 
                const aIsToday = a.date === today;
                const bIsToday = b.date === today;

                // Si uno corresponde a TODAY y el otro no TODAY va a ir primero. 
                if (aIsToday && !bIsToday) return -1;
                if (!aIsToday && bIsToday) return 1;

                // Si ambos son de hoy, o ambos son de diferentes días organizaremos usando secondsSinceMidNight desde el más nuevo. 
                if (aIsToday && bIsToday) {
                    return b.secondsSinceMidNight - a.secondsSinceMidNight;
                } else {

                    // Para elementos de días diferentes, analiza y compara las fechas.
                    const [aDay, aMonth, aYear] = a.date.split('/').map(Number);
                    const [bDay, bMonth, bYear] = b.date.split('/').map(Number);

                    // Compara años. 
                    if (aYear !== bYear) return bYear - aYear;

                    // Compara meses. 
                    if (aMonth !== bMonth) return bMonth - aMonth;

                    // Compara días.
                    if (aDay !== bDay) return bDay - aDay;

                    // Si la fecha es la misma pero no es de hoy, organizar usando los segundos. 
                    return b.secondsSinceMidNight - a.secondsSinceMidNight;
                }
            });

            const limitedArray = sortedArray.slice(0, displayLimit);

            let showSimulations = limitedArray.map((e, index) => {
                return (
                    <div className={styles["simulation"]} key={`${index}-simulation`}>
                        <p>{e.date}</p>
                        <p className={styles["optional-value"]}>{e.totalRightAnswers}</p>
                        <p>{e.approved}</p>
                        <p className={styles["optional-value"]}>{`${e.percentage}%`}</p>
                        <p>
                            <button type="button" className={styles["button-simulation-result"]} onClick={() => { showSimulationResult(e.id) }}>
                                Respuestas
                            </button>
                        </p>
                    </div>
                )
            })
            setTestResults(showSimulations);
        } catch (error) {
            console.error(`Hemos presentado un error, ${error}`)
        } finally {
            setIsLoading(false);
        }
    };

    const increaseDisplayLimit = () => {
        setDisplayLimit(prevLimit => prevLimit + 5);
    };

    useEffect(() => {
        processedResults();
    }, [displayLimit]);

    if (isLoading) {
        return (
            <div className={styles["loading-container"]}>
                <p>Cargando resultados...</p>
            </div>
        );
    } else if (testResults.length > 0) {
        return (
            <>
                <h2 className={styles["title"]}>Historial de Simulaciones</h2>
                <div className={styles["container-simulations"]}>
                    {testResults}
                    <small className={styles["notation"]}>Datos de una prueba aleatoria sin valor legal</small>
                </div>
                <button className={styles["button-see-more"]} onClick={increaseDisplayLimit}>Ver más...</button>
            </>
        );
    } else {
        return (
            <>
                <h2 className={styles["title"]}>Historial de Simulaciones</h2>
                <div className={styles["container-simulations"]}>
                    <div className={styles["container-no-data"]}>
                        <img className={styles["img-no-data"]} src={noInfoImage} alt="Imagen no tenemos información" />
                        <p>No tenemos información que poder mostrarte, comienza a prácticar para que puedas ver datos</p>
                    </div>
                </div>
            </>
        );
    }
};

export default HistoryOfSimulations;