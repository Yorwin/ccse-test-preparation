import React, { useEffect, useRef } from "react";
import styles from "../styles/graphic-test-made.module.css"

const GraphRightTestsPercentage = ({ totalTests, correctTests }: { totalTests: number, correctTests: number }) => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const canvasWidth = 260;
    const canvasHeight = 200;

    //Datos de Pruebas
    const total = totalTests;
    const passedTests = correctTests;
    const passPercentage = passedTests / total;

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');

            if (ctx) {

                const beginningY = 14;
                const centerX = canvasWidth / 2;
                const centerY = canvasHeight / 2;
                const radius = 55;

                const arcAngle = passPercentage * 2 * Math.PI;

                const startAngle = -Math.PI / 2;
                const endAngle = startAngle + arcAngle;

                ctx.font = 'bold 24px Arial';
                ctx.fillStyle = '#CF4037';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText('Aciertos', centerX, beginningY);

                ctx.beginPath();

                ctx.strokeStyle = '#CF4037'
                ctx.lineWidth = 15;
                ctx.arc(centerX, centerY, radius, startAngle, endAngle)
                ctx.stroke()

                ctx.closePath();

                if (totalTests && correctTests) {
                    ctx.font = 'bold 28px Arial';
                    ctx.fillStyle = '#322B2A';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(`${passedTests != 0 ? Math.round(passPercentage * 100) : 0}%`, centerX, centerY);
                } else {
                    ctx.font = 'bold 28px Arial';
                    ctx.fillStyle = '#322B2A';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(`${0}%`, centerX, centerY);
                }
            }
        }
    }, [totalTests, correctTests]);

    return <>
        <canvas width={canvasWidth} height={canvasHeight} className={styles["canva-styles"]} ref={canvasRef}>Tu navegador no acepta canvas</canvas>
    </>
};

export default GraphRightTestsPercentage;