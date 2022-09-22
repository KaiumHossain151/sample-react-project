import { Link } from "react-router-dom"
import './styles.css'

const LinkPage = () => {
    return (
        <nav className="nav">
            <Link to="/" className="site-title">Home</Link>
            <ul>
                <Link to="/login">Login</Link>
                <Link to="/editor">Editors Page</Link>
                <Link to="/admin">Admin Panel</Link>
            </ul>
        </nav>
    )
}

export default LinkPage
