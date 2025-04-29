import React, { useState } from "react";
import styles from "../../../styles-pages/module-practice.module.css"

const ColumnChart = () => {
    // Datos para cada módulo (porcentaje de preparación)
    const [moduleData, setModuleData] = useState([
        65, // Módulo 1
        75, // Módulo 2
        45, // Módulo 3
        80, // Módulo 4
        60  // Módulo 5
    ]);

    // Configuración del gráfico
    const svgWidth = 1100;
    const svgHeight = 500;
    const padding = { top: 40, right: 40, bottom: 60, left: 60 };
    const chartWidth = svgWidth - padding.left - padding.right;
    const chartHeight = svgHeight - padding.top - padding.bottom;

    // Valores del eje Y
    const yAxisValues = [0, 20, 40, 60, 80, 100];

    // Función para generar el ancho de las columnas
    const columnWidth = chartWidth / moduleData.length * 0.6;
    const columnSpacing = chartWidth / moduleData.length;

    // Nombres de los módulos
    const moduleNames = ["Módulo 1", "Módulo 2", "Módulo 3", "Módulo 4", "Módulo 5"];

    // Función para convertir valores de porcentaje a coordenadas Y
    const scaleY = (value: number) => {
        return chartHeight - (value / 100) * chartHeight + padding.top;
    };

    return (
        <div className={styles["column-chart"]}>
            <svg width={svgWidth} height={svgHeight} className={styles["charts-border"]} style={{
                borderTop: '5px solid #322B2A',
                borderLeft: '5px solid #322B2A',
                borderRight: '5px solid #322B2A',
                borderBottom: 'none'
            }}>

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
                            {/* Columna */}
                            <rect
                                x={x - columnWidth / 2}
                                y={scaleY(value)}
                                width={columnWidth}
                                height={scaleY(0) - scaleY(value)}
                                fill="#CF4037"
                                stroke="#b53229"
                                strokeWidth="1"
                            />

                            {/* Valor de la columna */}
                            <text
                                x={x}
                                y={scaleY(value) - 5}
                                textAnchor="middle"
                                className={styles["text-percentage"]}
                            >
                                {value}%
                            </text>

                            {/* Etiqueta del eje X */}
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
}

export default ColumnChart;