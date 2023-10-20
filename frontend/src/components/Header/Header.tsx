import {Link} from "react-router-dom";
import "./Header.scss"

export default function Header() {
    return (
        <header>
            <div>
                <img src="../../../public/logo.jpg" alt="Logo"/>
                <h1>Capstone</h1>
            </div>
            <nav>
                <ul>
                    <li><Link to={"/start"}>Start</Link></li>
                    <li><Link to={"/werkzeuge"}>Werkzeuge</Link></li>
                </ul>
            </nav>
        </header>
    );
}

