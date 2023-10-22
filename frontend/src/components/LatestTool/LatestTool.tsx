import "./LatestTool.scss";
import {Tools} from "../../assets/entities/tools.ts";

type Props = {
    readonly tools: Tools[]
}
export default function LatestTool(props: Props) {

    // Sobald timestamp eingebaut wird, wird hier der neuste Eintrag angezeigt

    const randomIndex = Math.floor(Math.random() * props.tools?.length);
    const randomTool = props.tools[randomIndex];


    const backgroundImageUrl = "https://images.unsplash.com/photo-1508873535684-277a3cbcc4e8?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    const backgroundImageUrl1 = "https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    const backgroundImageUrl2 = "https://images.unsplash.com/photo-1585201731775-0597e1be4bfb?auto=format&fit=crop&q=80&w=2030&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    const inlineStyle = {
        backgroundImage: `url(${backgroundImageUrl1})`
    }

    return (
        <article className={"latestTool"}>
            <h5>Neu hinzugefügt</h5>
            <div style={inlineStyle}>
                <div>
                    <h6>{randomTool?.name}</h6>
                    <p>{randomTool?.location}</p>
                </div>
            </div>
        </article>
    );
}