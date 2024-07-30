// import { Link } from "react-router-dom"
import {  NavLink } from "react-router-dom"
import styles from "./PageNav.module.css"

function PageNav() {
    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    {/* <Link to="/">Home</Link> */}

                    {/* using NavLink we will get the "active" class attached to active URL element link */}
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/pricing">Pricing</NavLink>
                </li>
                <li>
                    <NavLink to="/product">Product</NavLink>
                </li>

            </ul>
        </nav>
    )
}

export default PageNav
