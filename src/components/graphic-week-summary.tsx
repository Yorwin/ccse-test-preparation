import React, { useEffect } from "react";
import styles from "./graphic-test-made.module.css"
import { db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth } from "../config/firebase";
import { getFullDate, getDaysInMonth, getCurrentMonth, getCurrentDay } from "../functions/functions";

const GraphicWeekSummary = () => {

    const user = auth.currentUser;

    if (!user) {
        throw new Error('Usuario no autenticado');
    }

    useEffect(() => {
        const day = getCurrentDay();
        const monthDays = getLast7DaysInCorrectFormat(day);

        getWeekInfo(monthDays).then(results => {
            console.log(results);
        });
    });

    const getLast7DaysInCorrectFormat = (day: number) => {

        const last7Days: string[] = [];

        const Date = getFullDate();
        const currentMonth = getCurrentMonth();
        let guideDay = day;
        let neverChangedMonth = true;

        for (let i = 0; i < 7; i++) {

            if (i === 0) {
                last7Days.push(Date);
            }

            if (i > 0) {

                let lastDay = guideDay - 1;

                if (lastDay > 0 && neverChangedMonth) {

                    guideDay = lastDay;
                    let LastDayFullFormat = lastDay + Date.substring(2, 9);
                    last7Days.push(LastDayFullFormat);
                }

                if (lastDay === 0 || !neverChangedMonth) {

                    neverChangedMonth = false;

                    let lastMonth = currentMonth - 1;
                    let getDaysInLastMonth = getDaysInMonth(lastMonth, 2025);
                    lastDay = lastDay === 0 ? getDaysInLastMonth : guideDay - 1;
                    guideDay = lastDay;

                    let LastDayFullFormat = `${lastDay}/${lastMonth + Date.substring(4, 9)}`
                    last7Days.push(LastDayFullFormat);
                }
            }
        }

        return last7Days;
    };

    const getWeekInfo = async (monthDays: string[]) => {

        const dataOfTheWeek = await Promise.all(monthDays.map(async (e) => {
            const weekInfoRef = collection(db, "users", user.uid, "resultados");
            const q = query(weekInfoRef, where("Date", "==", e));
            const snapshot = await getDocs(q);

            const data = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            return data;
        }));

        return dataOfTheWeek;
    };

    const data = [
        { day: "Lun", hours: 3 },
        { day: "Mar", hours: 5 },
        { day: "Mié", hours: 2 },
        { day: "Jue", hours: 6 },
        { day: "Vie", hours: 4 },
        { day: "Sáb", hours: 7 },
        { day: "Dom", hours: 1 },
    ];

    const maxHours = Math.max(...data.map(d => d.hours));
    const maxHeightPx = 100;

    return <>
        <div className={styles["main-container-weeklygraphic"]}>

            {/* Icon */}

            <div className={styles["container-icon"]}>
                <i className="bi bi-bar-chart-line-fill"></i>
            </div>

            {/* Week Title */}

            <div className={styles["weekly-graph-title"]}>
                <h3>03 hr 30mins</h3>
                <p>Historial semana</p>
            </div>

            {/* Graph */}

            <div className={styles["graph-container"]} style={{ height: "250px" }}>

                <div className={styles["base-line-graph"]}></div>

                {data.map((item, index) => {
                    const height = (item.hours / maxHours) * maxHeightPx;

                    return (
                        <div key={index} className={styles["graph-text-container"]}>
                            <div
                                className={styles["candle-graph"]}
                                style={{
                                    height: `${height}px`,
                                    margin: "0 auto",
                                    transition: "height 0.3s ease",
                                }}
                                title={`${item.hours} horas`}
                            ></div>
                            <small className={styles["graph-text"]}>{item.day}</small>
                        </div>
                    );
                })}
            </div>
        </div>
    </>
};

export default GraphicWeekSummary;