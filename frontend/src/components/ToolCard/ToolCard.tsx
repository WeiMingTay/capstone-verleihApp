import {Tools} from "../../assets/entities/tools.ts";
import {Link} from "react-router-dom";
import "./ToolCard.scss";

type Props = {
    readonly tool: Tools;
}

export default function ToolCard(props: Props) {
   const backgroundImageUrl2 = "https://images.unsplash.com/photo-1585201731775-0597e1be4bfb?auto=format&fit=crop&q=80&w=2030&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    const inlineStyle = {
        backgroundImage: `url(${backgroundImageUrl2})`
    }
    return (
        <Link className={"toolCard-comp"} to={`/werkzeuge/${props.tool.id}`} style={inlineStyle}>
            <article>
                <h5>{props.tool.name}</h5>
            </article>
        </Link>
    );
}

