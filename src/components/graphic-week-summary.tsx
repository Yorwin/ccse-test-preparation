import React from "react";
import styles from "./graphic-test-made.module.css"

const GraphicWeekSummary = () => {

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