import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

function AppNav() {
    return (
        //AppNav component used in HomePage and AppLayout then the styes.nav class will have two different id attached to there name
        <nav className={styles.nav}>
            <ul>
                <li>
                    {/* IMPORTANT Relative path */}
                    {/* /app (this path also has / and is consider the default OR index path ) ->  /app/cities */}
                    {/* /app/countries  ->  /app/cities */}

                    <NavLink to='cities'>Cities</NavLink>

                    {/* absolute path  */}
                    {/* <NavLink to='/urlName'>Cities</NavLink> */}
                </li>
                <li>
                    <NavLink to='countries'>Countries</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default AppNav
