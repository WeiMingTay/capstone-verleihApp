import {Link, useLocation} from "react-router-dom";
import "./Header.scss"
import {useState} from "react";

import logo from "../../assets/images/logo.jpg";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation();

    const isOnWelcomePage = location.pathname === "/";

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    if (isOnWelcomePage) {
        return null;
    }

    return (
        <header className={isOpen ? "open" : ""}>
            <div>
                <Link to={"/"}><img src={logo} alt="Logo"/></Link>
                <h1>Capstone</h1>
            </div>
            <div
                className={`menu-toggle ${isOpen ? "open" : ""}`}
                onClick={toggleMenu}
            >
                <div>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                <nav>
                    <ul>

                        <li><Link onClick={toggleMenu} to={"/start"}>Start</Link></li>
                        <li><Link onClick={toggleMenu} to={"/werkzeuge"}>Werkzeuge</Link></li>
                        <li><Link onClick={toggleMenu} to={"/schwarzes-brett"}>Schwarzes Brett</Link></li>
                    </ul>
                    <ul>
                        <li><Link onClick={toggleMenu} to={"/start"}><i className="las la-home"></i></Link></li>
                        <li><Link onClick={toggleMenu} to={"/profil"}><i className="las la-user-circle"></i></Link></li>
                        <li><Link onClick={toggleMenu} to={"/contact"}><i className="las la-envelope"></i></Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

