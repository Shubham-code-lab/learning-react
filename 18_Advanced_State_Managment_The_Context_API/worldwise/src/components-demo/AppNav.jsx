import styles from "./AppNav.module.css"

function AppNav() {
    return (
        //AppNav component used in HomePage and AppLayout then the styes.nav class will have two different id attached to there name
        <nav className={styles.nav}>
            App Navigation
        </nav>
    )
}

export default AppNav
