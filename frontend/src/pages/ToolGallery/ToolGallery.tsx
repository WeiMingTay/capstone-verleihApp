import {Link} from "react-router-dom";
import {Tools} from "../../assets/entities/tools.ts";
import ToolCard from "../../components/ToolCard/ToolCard.tsx";

import "./ToolGallery.scss"

import {UserProfile} from "../../assets/entities/userProfile.ts";


type Props = {
    readonly tools: Tools[]
    userProfile: UserProfile | undefined

}
export default function ToolGallery(props: Props) {
    const isLoggedIn: string | undefined = props.userProfile?.name;

    return (<section className={"toolGallery-page"}>
        {
            isLoggedIn
            ? <Link className={"buttonLarge"} to={"/werkzeuge/add"}>+</Link>
                : null

        }
        <section>
            {props.tools.map(tool => <ToolCard key={tool.id} tool={tool}/>)}
        </section>
    </section>);
}

