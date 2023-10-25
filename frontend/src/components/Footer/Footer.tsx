import "./Footer.scss";
import {Link, useLocation} from "react-router-dom";

export default function Footer() {
    const location = useLocation();


    const isOnWelcomePage = location.pathname === "/";
    if (isOnWelcomePage) {
        return null;
    }

    /* TODO
     if (isUserLoggedIn) {
          return null;
      }*/

    return (
        <footer>
            <p>Noch nicht angemeldet?</p>
            <div>
                <Link to={"/"}>Einloggen</Link>
                <span> oder </span>
                <Link to={"/"}>Registrieren</Link>
            </div>
        </footer>
    );
}