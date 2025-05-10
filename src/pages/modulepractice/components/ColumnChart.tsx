import React, { useState, useEffect } from "react";
import styles from "../../../styles-pages/module-practice.module.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../../../config/firebase";
import LoadingScreen from "../../../components/LoadingScreen";

const ColumnChart = () => {

    const user = auth.currentUser;

    if (!user) {
        throw new Error("No se logro autentificar al usuario");
    }

    const [loading, setLoading] = useState(false);
    const [moduleData, setModuleData] = useState<any[]>([]);
    const [chartData, setChartData] = useState<any[]>([65, 75, 45, 80, 70]);
    const [svgHeight, setSvgHeight] = useState(450);

    const [moduleLength, setModuleLength] = useState({});

    const getAmountOfQuestions = async () => {
        try {
            const modules = [1, 2, 3, 4, 5];

            const moduleCounts: Record<string, number> = {};

            for (const modNumber of modules) {
                const questionsSnap = await getDocs(collection(db, "preguntas", `Modulo_${modNumber}`, "preguntas"));
                moduleCounts[`Modulo_${modNumber}`] = questionsSnap.size;
            }

            setModuleLength([moduleCounts]);
        } catch (error) {
            console.error("No se puedo obtener el total de preguntas correctamente");
        }
    };

    const getModulePracticesByNumber = async (moduleNumber: number) => {
        const q = query(
            collection(db, "users", user.uid, "resultados"),
            where("module_number", "==", `${moduleNumber}`) // O asegúrate de que en Firestore es tipo número
        );

        const querySnapshot = await getDocs(q);
        const results: any[] = [];

        querySnapshot.forEach((doc) => {
            const data = doc.data();
            results.push({
                id: doc.id,
                score: data.score,
            });
        });

        return results;
    };


    const fetchAllModules = async () => {
        try {
            setLoading(true);

            const modulePromises = [1, 2, 3, 4, 5].map((modNumber) => {
                const modulePractices = getModulePracticesByNumber(modNumber)
                return modulePractices;
            });

            const allModuleResults = await Promise.all(modulePromises);
            await getAmountOfQuestions();

            setModuleData(allModuleResults);
            setLoading(false);
        } catch (error) {
            console.error("Error al intentar obtener los datos de los módulos:", error);
            setLoading(false);
        }
    };

    function calculateModulePreparations(responsesByModule: any, totalQuestionsByModule: any) {
        // Verificamos que totalQuestionsByModule exista y tenga al menos un elemento
        const totalsObject = totalQuestionsByModule &&
            totalQuestionsByModule.length > 0 ?
            totalQuestionsByModule[0] : {};

        // Si totalsObject es undefined o null, usamos un objeto vacío
        const safeModuleTotals = totalsObject || {};

        // Calcula la preparación para cada módulo individualmente
        const modulePreparations = responsesByModule.map((moduleResponses: any, index: any) => {
            // Aseguramos que moduleResponses sea un array (si es undefined, usamos array vacío)
            const safeModuleResponses = Array.isArray(moduleResponses) ? moduleResponses : [];

            // Obtiene el nombre del módulo
            const moduleName = `Modulo_${index + 1}`;

            // Calcula la suma de scores para este módulo de manera segura
            const correctAnswers = safeModuleResponses.reduce((sum, response) => {
                // Verificamos que response y response.score existan
                return sum + (response && typeof response.score === 'number' ? response.score : 0);
            }, 0);

            // Obtiene el total de preguntas para este módulo de manera segura
            const totalQuestions = safeModuleTotals[moduleName] || 0;

            // Calcula el porcentaje de preparación para este módulo
            const preparationPercentage = totalQuestions === 0 ?
                0 : Math.round((correctAnswers / totalQuestions) * 100);

            return {
                moduleName,
                correctAnswers,
                totalQuestions,
                preparationPercentage
            };
        });

        return modulePreparations;
    }

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 568) {
                setSvgHeight(900); // aún más alto en pantallas muy pequeñas
            } else if (width < 768) {
                setSvgHeight(750); // más alto en pantallas pequeñas
            } else {
                setSvgHeight(450); // altura normal
            }
        };

        handleResize(); // establecer altura inicial
        fetchAllModules();

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const evaluations = calculateModulePreparations(moduleData, moduleLength);
        console.log(evaluations);
    }, [moduleData, moduleLength]);

    const svgWidth = 1100;
    const padding = { top: 40, right: 40, bottom: 60, left: 60 };
    const chartWidth = svgWidth - padding.left - padding.right;
    const chartHeight = svgHeight - padding.top - padding.bottom;

    const yAxisValues = [0, 20, 40, 60, 80, 100];
    const columnWidth = chartWidth / chartData.length * 0.6;
    const columnSpacing = chartWidth / chartData.length;
    const moduleNames = ["Módulo 1", "Módulo 2", "Módulo 3", "Módulo 4", "Módulo 5"];

    const scaleY = (value: number) => {
        return chartHeight - (value / 100) * chartHeight + padding.top;
    };

    if (loading) {
        return <LoadingScreen />
    }

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
                {chartData.map((value, index) => {
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
