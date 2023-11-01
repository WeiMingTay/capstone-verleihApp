import "./Footer.scss";
import {Link, useLocation} from "react-router-dom";
import {UserProfile} from "../../assets/entities/userProfile.ts";
type Props = {
    userProfile: UserProfile | undefined
}
export default function Footer(props: Props) {
    const location = useLocation();


    const isOnWelcomePage = location.pathname === "/";
   const isLoggedIn = props.userProfile?.id
    if (isOnWelcomePage || isLoggedIn) {
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
                <Link to={"/login"}>Einloggen</Link>
                <span> oder </span>
                <Link to={"/"}>Registrieren</Link>
            </div>
        </footer>
    );
}