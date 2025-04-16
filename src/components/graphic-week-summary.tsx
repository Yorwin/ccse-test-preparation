import React, { useEffect, useState } from "react";
import styles from "./graphic-test-made.module.css"
import { db } from "../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth } from "../config/firebase";
import { getFullDate, getDaysInMonth, getCurrentMonth, getCurrentDay, getWeekDay } from "../functions/functions";
import { secondstoDecimalHours } from "../functions/functions";

const dayMap: Record<string, string> = {
    "Lunes": "Lun",
    "Martes": "Mar",
    "Miércoles": "Mié",
    "Jueves": "Jue",
    "Viernes": "Vie",
    "Sábado": "Sáb",
    "Domingo": "Dom",
};

const GraphicWeekSummary = () => {

    const user = auth.currentUser;
    const [data, setData] = useState<{ day: string; hours: number }[]>([]);

    if (!user) {
        throw new Error('Usuario no autenticado');
    }

    useEffect(() => {
        const day = getCurrentDay();
        const monthDays = getLast7DaysInCorrectFormat(day);

        getWeekInfo(monthDays)
            .then((element) => {
                const processedData = processWeekArray(element);
                setData(processedData);
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

    const calculateWeekDay = (index: number) => {
        const date = new Date();
        const dayNumber = date.getDay();
        const weekDays = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

        const adjustedIndex = (dayNumber - index + 7) % 7;

        return weekDays[adjustedIndex];
    };

    const processWeekArray = (array: any) => {

        const processedWeekArray = array.map((e: any, index: number) => {

            let weekDay = calculateWeekDay(index);

            if (e.length === 0) {
                return [{
                    id: `default-value for day ${weekDay}`,
                    weekDay: weekDay,
                    duration: 0,
                }];
            } else {
                return e.map((item: any) => ({
                    weekDay: weekDay,
                    duration: Math.max(1500 - (item.duration ?? 0), 0),
                }));
            }
        });

        const flattened = processedWeekArray.flat();

        const summarizedWeekArray = flattened.reduce((acc: any[], curr: any) => {

            const existing = acc.find(item => item.weekDay === curr.weekDay);

            if (existing) {
                existing.duration += curr.duration;
            } else {
                acc.push({
                    weekDay: curr.weekDay,
                    duration: curr.duration,
                });
            }

            return acc;
        }, []);

        const finalData = summarizedWeekArray.map((item : any) => ({
            day: dayMap[item.weekDay] || item.weekDay,
            hours: Math.round(item.duration / 60), // convertir minutos a horas y redondear
        }));

        return finalData;
    };

    const getWeekInfo = async (monthDays: string[]) => {

        const dataOfTheWeek = await Promise.all(monthDays.map(async (e, index) => {
            const weekInfoRef = collection(db, "users", user.uid, "resultados");
            const q = query(weekInfoRef, where("Date", "==", e));
            const snapshot = await getDocs(q);

            const resultWeekDay = calculateWeekDay(index)

            const data = snapshot.docs.map(doc => {

                const docData = doc.data();
                const hasData = docData && Object.keys(docData).length > 0;

                if (hasData) {
                    return {
                        id: doc.id,
                        weekDay: resultWeekDay,
                        ...doc.data()
                    }
                } else {
                    return {
                        id: doc.id,
                        weekDay: resultWeekDay,
                        duration: 0,
                    }
                }
            });

            return data;
        }));

        return dataOfTheWeek;
    };

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