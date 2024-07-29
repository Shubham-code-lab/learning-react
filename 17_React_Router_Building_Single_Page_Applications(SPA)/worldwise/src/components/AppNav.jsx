import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

function AppNav() {
    return (
        //AppNav component used in HomePage and AppLayout then the styes.nav class will have two different id attached to there name
        <nav className={styles.nav}>
            <ul>
                <li>
                    {/* IMPORTANT Relative path */}
                    <NavLink to='cities'>Cities</NavLink>
                </li>
                <li>
                    <NavLink to='countries'>Countries</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default AppNav
