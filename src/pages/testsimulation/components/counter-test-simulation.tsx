import { useCounter } from "../../../context/SimulationCounterContext";
import styles from "../styles/counter-test-simulation.module.css"

const Counter = () => {

    const { getFormatedTime } = useCounter();

    return <>
        <div className={styles["counter-main-container"]}>
            <h2>{getFormatedTime()}</h2>
        </div>
    </>
};

export default Counter;