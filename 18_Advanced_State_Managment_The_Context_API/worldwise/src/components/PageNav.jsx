// import { Link } from "react-router-dom"
import {  NavLink } from "react-router-dom"
import styles from "./PageNav.module.css"
import Logo from "./Logo"

function PageNav() {
    return (
        <nav className={styles.nav}>
            <Logo />

            <ul>
                <li>
                    {/* <Link to="/">Home</Link> */}

                    {/* using NavLink we will get the "active" class attached to active URL element link */}
                    {/* <NavLink to="/">Home</NavLink> */}
                </li>
                <li>
                    <NavLink to="/pricing">Pricing</NavLink>
                </li>
                <li>
                    <NavLink to="/product">Product</NavLink>
                </li>

                <li>
                    <NavLink className={styles.ctaLink} to="/login">Login</NavLink>
                </li>

            </ul>
        </nav>
    )
}

export default PageNav
