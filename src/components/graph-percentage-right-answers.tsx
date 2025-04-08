import React, { useEffect, useRef } from "react";

const GraphRightTestsPercentage = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    
    const canvasWidth = 260;
    const canvasHeight = 200;

    //Datos de Pruebas
    const totalTests = 50;
    const passedTests = 45;
    const passPercentage = passedTests / totalTests;

    useEffect(() => {
        if (canvasRef.current) {
            const ctx = canvasRef.current.getContext('2d');

            if(ctx) {

                const beginningY = 14;
                const centerX = canvasWidth / 2;
                const centerY = canvasHeight / 2;
                const radius = 55;

                const arcAngle = passPercentage * 2 * Math.PI;

                const startAngle = -Math.PI/2;
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

                ctx.font = 'bold 28px Arial';
                ctx.fillStyle = '#322B2A';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(`${Math.round(passPercentage * 100)}%`, centerX, centerY);

            }
        }
    });

    return <>
        <canvas width={canvasWidth} height={canvasHeight} ref={canvasRef}>Tu navegador no acepta canvas</canvas>
    </>
};

export default GraphRightTestsPercentage;