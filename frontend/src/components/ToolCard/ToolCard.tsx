import {Tools} from "../../assets/entities/tools.ts";
import {Link} from "react-router-dom";

type Props = {
    tool: Tools;
}

export default function ToolCard(props: Props) {
    return (
        <Link to={`/werkzeuge/${props.tool.id}`}>
            <article>
                <h5>{props.tool.name}</h5>
                <p>{props.tool.location}</p>
                <p>{props.tool.category}</p>
            </article>
        </Link>
    );
}

