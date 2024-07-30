import styles from './Button.module.css'

/* eslint-disable react/prop-types */
function Button({children, onClick, type}) {
    return (
        //IMPORTANT :-
        // props passed used to class name
        <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>{children}</button>
    )
}

export default Button
