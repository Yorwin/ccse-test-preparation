import React, { ReactElement, ReactNode, useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { auth } from "../config/firebase";
import styles from "./graphic-test-made.module.css"

interface answersType {
    [answer: string]: number
}

interface resultsParameter {
    Date: string,
    answers: answersType[],
    duration: number,
    id: string,
    score: number,
    testId: string,
    userId: string,
}

interface processedResults {
    date: string,
    totalRightAnswers: string,
    approved: string,
    percentage: number,
}

const HistoryOfSimulations = () => {

    const user = auth.currentUser;

    if (!user) {
        throw new Error('Usuario no autenticado');
    }

    const [testResults, setTestResults] = useState<ReactNode>([]);

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

        const getResultsUser = await getResults();

        const processedArray = getResultsUser.map((e: any) => ({
            date: e.Date,
            totalRightAnswers: getTotalRightAnswers(e.score),
            approved: calculateApproved(e.score),
            percentage: calculateRightAnswerPercentage(e.score),
        }));

        const showSimulations = processedArray.map((e, index) => {
            return (
                <div className={styles["simulation"]} key={`${index}-simulation`}>
                    <small>{e.date}</small>
                    <small>{e.totalRightAnswers}</small>
                    <small>{e.approved}</small>
                    <small>{`${e.percentage}%`}</small>
                    <small><a href="#">Respuestas</a></small>
                </div>
            )
        })

        setTestResults(showSimulations);
    };

    useEffect(() => {
        processedResults();
    }, []);

    return <>
        <h2 className={styles["title"]}>Historial de Simulaciones</h2>
        <div className={styles["container-simulations"]}>
            {testResults}
            <small className={styles["notation"]}>Datos de una prueba aleatoria sin valor legal</small>
        </div>
        <button className={styles["button-see-more"]}>Ver más...</button>
    </>
};

export default HistoryOfSimulations;