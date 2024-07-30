import { Link } from "react-router-dom"
import PageNav from "../components/PageNav"
import AppNav from "../components/AppNav"

function Homepage() {
    return (
        <div>
            <PageNav />
            <AppNav />
            {/* test is the global class from PageNav.module.css */}
            <h1 className="test">World wise</h1>

            <Link to="/app">App</Link>

            {/* using anchor tag page will reload */}
            {/* <a href="/pricing">Pricing</a> */}
        </div>
    )
}

export default Homepage
