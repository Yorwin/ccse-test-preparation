import React, { useState } from "react";
import styles from "../../../styles-pages/module-practice.module.css";

const ColumnChart = () => {
    const [moduleData, setModuleData] = useState([65, 75, 45, 80, 60]);

    const svgWidth = 1100;
    const svgHeight = 500;
    const padding = { top: 40, right: 40, bottom: 60, left: 60 };
    const chartWidth = svgWidth - padding.left - padding.right;
    const chartHeight = svgHeight - padding.top - padding.bottom;

    const yAxisValues = [0, 20, 40, 60, 80, 100];
    const columnWidth = chartWidth / moduleData.length * 0.6;
    const columnSpacing = chartWidth / moduleData.length;
    const moduleNames = ["Módulo 1", "Módulo 2", "Módulo 3", "Módulo 4", "Módulo 5"];

    const scaleY = (value: number) => {
        return chartHeight - (value / 100) * chartHeight + padding.top;
    };

    return (
        <div className={styles["column-chart"]}>
            <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                preserveAspectRatio="xMidYMid meet"
                className={styles["charts-border"]}
                style={{
                    width: "100%",
                    height: "auto",
                    maxWidth: "1100px",
                    borderTop: '5px solid #322B2A',
                    borderLeft: '5px solid #322B2A',
                    borderRight: '5px solid #322B2A',
                    borderBottom: 'none'
                }}
            >
                {/* Eje Y con etiquetas */}
                {yAxisValues.map((value, index) => (
                    <g key={`y-axis-${index}`}>
                        <text
                            x={padding.left - 10}
                            y={scaleY(value)}
                            textAnchor="end"
                            dominantBaseline="middle"
                            className={styles["text-chart"]}
                        >
                            {value}%
                        </text>
                    </g>
                ))}

                {/* Columnas y etiquetas del eje X */}
                {moduleData.map((value, index) => {
                    const x = padding.left + index * columnSpacing + columnSpacing / 2;

                    return (
                        <g key={`column-${index}`}>
                            <rect
                                x={x - columnWidth / 2}
                                y={scaleY(value)}
                                width={columnWidth}
                                height={scaleY(0) - scaleY(value)}
                                fill="#CF4037"
                                stroke="#b53229"
                                strokeWidth="1"
                            />

                            <text
                                x={x}
                                y={scaleY(value) - 5}
                                textAnchor="middle"
                                className={styles["text-percentage"]}
                            >
                                {value}%
                            </text>

                            <text
                                x={x}
                                y={padding.top + chartHeight + 25}
                                textAnchor="middle"
                                className={styles["text-chart"]}
                            >
                                {moduleNames[index]}
                            </text>
                        </g>
                    );
                })}

                {/* Ejes principales */}
                <line
                    x1={padding.left}
                    y1={padding.top}
                    x2={padding.left}
                    y2={padding.top + chartHeight}
                    stroke="#A55A55"
                    strokeWidth="4"
                />
                <line
                    x1={padding.left}
                    y1={padding.top + chartHeight}
                    x2={padding.left + chartWidth}
                    y2={padding.top + chartHeight}
                    stroke="#A55A55"
                    strokeWidth="4"
                />
            </svg>
        </div>
    );
};

export default ColumnChart;
