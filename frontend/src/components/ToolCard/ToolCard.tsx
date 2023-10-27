import {Tools} from "../../assets/entities/tools.ts";
import {Link} from "react-router-dom";
import "./ToolCard.scss";

type Props = {
    readonly tool: Tools;
}

export default function ToolCard(props: Props) {
   const inlineStyle = {
        backgroundImage: `url(${props.tool?.image})`
    }
    return (
        <Link className={"toolCard-comp"} to={`/werkzeuge/${props.tool.id}`} style={inlineStyle}>
            <article>
                <h5>{props.tool.name}</h5>
            </article>
        </Link>
    );
}

