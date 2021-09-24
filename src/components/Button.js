import styles from "./Button.module.css";

export default function Button({ className, onClick, children }) {
    const classNames = className ? styles.button + " " + className : styles.button;
    return (
        <button className={classNames} onClick={onClick}>
            {children}
        </button>
    );
}
