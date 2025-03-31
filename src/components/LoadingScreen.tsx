import React, { useState, useEffect } from "react";
import "./LoadingScreen.css";

export default function LoadingScreen() {
    const text = "Cargando...";
    const [displayedText, setDisplayedText] = useState("");
    const typingSpeed = 150; // Velocidad del efecto de escritura
  
    useEffect(() => {
      let index = 0;
      const interval = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(text.slice(0, index + 1));
          index++;
        } else {
          clearInterval(interval);
        }
      }, typingSpeed);
  
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <h2 className="loading-text">{displayedText}</h2>
      </div>
    );
  }