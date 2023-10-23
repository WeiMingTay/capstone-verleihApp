import {Link} from "react-router-dom";


export default function Uebersicht() {
    return (<>
        <div>Alle Werkzeuge</div>
        <Link to={"/werkzeuge/add"}>Werkzeug hinzufügen</Link>
    </>);
}

