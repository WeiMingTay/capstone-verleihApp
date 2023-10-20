import {Link} from "react-router-dom";


export default function StartPage() {
    return (<>
        <h3>Start</h3>
        <Link to={"/schwarzes-brett"}>Schwarzes Brett</Link>
        <Link to={"/werkzeuge"}>Werkzeuge</Link>
    </>);
}

