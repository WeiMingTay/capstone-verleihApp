import "./LatestTool.scss";
import {Tools} from "../../assets/entities/tools.ts";

type Props = {
    readonly tools: Tools[]
}
export default function LatestTool(props: Props) {

    // Sobald timestamp eingebaut wird, wird hier der neuste Eintrag angezeigt

    const randomIndex = Math.floor(Math.random() * props.tools?.length);
    const randomTool = props.tools[randomIndex];
    return (
        <article className={"latestTool"}>
            <h5>Neu hinzugefügt</h5>
            <div>
                <h6>{randomTool?.name}</h6>
                <p>{randomTool?.location}</p>
            </div>
        </article>
    );
}