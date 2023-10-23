import {Link} from "react-router-dom";
import {Tools} from "../../assets/entities/tools.ts";
import ToolCard from "../../components/ToolCard/ToolCard.tsx";

import "./ToolGallery.scss"

type Props = {
    readonly tools: Tools[]
}
export default function ToolGallery(props: Props) {
    return (<section>
        <Link to={"/werkzeuge/add"}>+</Link>
        <section className={"toolGallery-page"}>
            {props.tools.map(tool => <ToolCard key={tool.id} tool={tool}/>)}
        </section>
    </section>);
}

