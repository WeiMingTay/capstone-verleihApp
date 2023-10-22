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
                    <button>Login</button>
                    <button>Registrieren</button>
                </div>
                <p>Erstmal nur <Link to={"/start"}>Stöbern</Link></p>
            </section>

        </div>
    );
}