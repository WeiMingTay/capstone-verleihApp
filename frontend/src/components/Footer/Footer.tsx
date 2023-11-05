import "./Footer.scss";
import {Link, useLocation} from "react-router-dom";
import {UserProfile} from "../../assets/entities/userProfile.ts";

type Props = {
    readonly userProfile: UserProfile | undefined
}
export default function Footer(props: Props) {
    const location = useLocation();


    const isOnWelcomePage: boolean = location.pathname === "/";
    const isLoggedIn: string | undefined = props.userProfile?.name
    if (isOnWelcomePage || isLoggedIn) {
        return null;
    }

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