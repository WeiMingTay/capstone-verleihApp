import {UserProfile} from "../../assets/entities/userProfile.ts";
import {Tools} from "../../assets/entities/tools.ts";
import ToolCard from "../../components/ToolCard/ToolCard.tsx";
import "./UserProfilePage.scss"
import ButtonLarge from "../../components/Button/ButtonLarge.tsx";

type Props = {
    readonly userProfile: UserProfile | undefined
    readonly logout: () => void
    readonly tools: Tools[]
}
export default function UserProfilePage(props: Props) {
    console.log(props.userProfile)
    return (<div className={"userProfil-page"}>
        <img src={props.userProfile?.avatarUrl} alt={props.userProfile?.id}/>
        <h3>{props.userProfile?.name}</h3>
        <ButtonLarge name="Logout" onClick={props.logout}/>
        <div><h2>My Tools oder lieber "als Favorit markiert"?</h2>
            <section>

                {props.tools.slice(0, 4).map(tool => <ToolCard key={tool.id} tool={tool}/>)}
            </section>
        </div>
    </div>);
}

