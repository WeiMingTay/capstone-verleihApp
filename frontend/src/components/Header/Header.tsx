import {Link, useLocation} from "react-router-dom";
import "./Header.scss"
import {useState} from "react";

import logo from "../../assets/images/logo.jpg";
import {UserProfile} from "../../assets/entities/userProfile.ts";

type Props = {
    readonly userProfile: UserProfile | undefined
    readonly toggleTheme: () => void

}
export default function Header(props: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation();

    const isOnWelcomePage = location.pathname === "/";
    const isLoggedIn = props.userProfile?.name

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    if (isOnWelcomePage) {
        return null;
    }

    return (
        <header className={isOpen ? "open" : ""}>
            <div>
                {isLoggedIn
                    ? <Link to={"/start"}><img src={logo} alt="Logo"/></Link>
                    : <Link to={"/"}><img src={logo} alt="Logo"/></Link>
                }
                <h1>VerleihApp</h1>

            </div>
            <div
                className={`menu-toggle ${isOpen ? "open" : ""}`}
                onClick={toggleMenu}
                onKeyDown={toggleMenu}
            >
                <div>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </div>
                <nav>
                    <ul>
                        <button onClick={() => props.toggleTheme()}><i className="las la-adjust"></i></button>
                        <li><Link onClick={toggleMenu} to={"/start"}>Start</Link></li>
                        <li><Link onClick={toggleMenu} to={"/werkzeuge"}>Werkzeuge</Link></li>
                        <li><Link onClick={toggleMenu} to={"/schwarzes-brett"}>Schwarzes Brett</Link></li>
                    </ul>
                    <ul>
                        <li><Link onClick={toggleMenu} to={"/start"}><i className="las la-home"></i></Link></li>
                        {isLoggedIn
                            ?
                            <li><Link onClick={toggleMenu} to={"/profil"}><i className="las la-user-circle"></i></Link>
                            </li>
                            : <></>
                        }
                        <li><Link onClick={toggleMenu} to={"/contact"}><i className="las la-envelope"></i></Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

