import "./LatestTool.scss";
import {Tools} from "../../assets/entities/tools.ts";
import {Link} from "react-router-dom";

type Props = {
    readonly tools: Tools[]
}
export default function LatestTool(props: Props) {

    // Sobald timestamp eingebaut wird, wird hier der neuste Eintrag angezeigt

    const randomIndex = Math.floor(Math.random() * props.tools?.length);
    const randomTool = props.tools[randomIndex];

    console.log(randomTool.image)
    const inlineStyle = {
        backgroundImage: `url(${randomTool.image})`
    }

    return (<div className="latestTool">
        <div>
            <h5>Frisch dabei</h5>
            <Link to={"/werkzeuge"}>Alle</Link>
        </div>
        <Link to={randomTool ? `/werkzeuge/${randomTool.id}` : "#"}>
            <div style={inlineStyle}>
                <div>
                    <h6>{randomTool?.name}</h6>
                    <p>{randomTool?.location}</p>
                </div>
            </div>

        </Link>
    </div>);
}