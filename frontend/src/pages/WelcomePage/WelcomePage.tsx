import {Link} from "react-router-dom";

export default function WelcomePage() {
    return (
        <div>
            <button>Login</button>
        <button>Registrieren</button>
            <Link to={"/start"}>Stöbern</Link>
        </div>
    );
}