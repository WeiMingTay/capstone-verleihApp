import {Link} from "react-router-dom";
import "./WelcomePage.scss";
import logo from "../../assets/images/cropped-WGPV-Logo-gross-6.webp";

export default function WelcomePage() {
    return (
        <div className="welcome-page">
            <section>
                <img src={logo} alt="logo"/>
                <h4>Herzlich Willkommen</h4>
            </section>
            <section>
                <div>
                    <Link to={"/login"}>Login</Link>
                    <Link to={"/login"}>Registrieren</Link>
                </div>
                <p>Erstmal nur <Link to={"/start"}>Stöbern</Link></p>
            </section>

        </div>
    );
}