import {Link} from "react-router-dom";
import "./Header.scss"
import {useState} from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }
    return (
        <header>
            <div>
                <img src="../../../public/logo.jpg" alt="Logo"/>
                <h1>Capstone</h1>
            </div>
            <div className={`menu-toggle ${isOpen ? "open" : ""}`}>
                <div onClick={toggleMenu}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                <nav>
                    <ul>
                        <li><Link to={"/start"}>Start</Link></li>
                        <li><Link to={"/werkzeuge"}>Werkzeuge</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

