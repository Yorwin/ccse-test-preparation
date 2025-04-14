import React from "react";

export const getFullDate = () => {

    const currentDate = new Date();

    const today = currentDate.getDate();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const anio = currentDate.getFullYear();
    
    const fullDate = `${today}/${month}/${anio}`

    return fullDate;
};

export const getDaysInMonth = (month: number, year: number) : number => {
    return new Date(year, month, 0).getDate();
};

export const getCurrentMonth = () => {

    const currentDate = new Date();
    const month = currentDate.getMonth() + 1;

    return month;
};

export const getCurrentDay = () => {
    const currentDay = new Date();
    const day = currentDay.getDate();

    return day;
}