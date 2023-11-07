import "./LatestTool.scss";
import {Tools} from "../../assets/entities/tools.ts";
import {Link} from "react-router-dom";

type Props = {
    readonly tools: Tools[]
}
export default function LatestTool(props: Props) {

    /*    const randomIndex = Math.floor(Math.random() * props.tools?.length);
        const randomTool = props.tools[randomIndex];
        */

    const sortedTools = [...props.tools].sort((a, b) => {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    });

    const latestTool = sortedTools[0];

    const inlineStyle = {
        backgroundImage: `url(${latestTool.image})`
    }

    return (<div className="latestTool">
        <div>
            <h5>Frisch dabei</h5>
            <Link to={"/werkzeuge"}>Alle</Link>
        </div>
        <Link to={latestTool ? `/werkzeuge/${latestTool.id}` : "#"}>
            <div style={inlineStyle}>
                <div>
                    <h6>{latestTool?.name}</h6>
                    <p>{latestTool?.location}</p>
                </div>
            </div>

        </Link>
    </div>);
}