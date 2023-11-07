import {UserProfile} from "../../assets/entities/userProfile.ts";
import {Tools} from "../../assets/entities/tools.ts";
import ToolCard from "../../components/ToolCard/ToolCard.tsx";

type Props = {
    readonly userProfile: UserProfile | undefined
    readonly logout: () => void
    readonly tools: Tools[]
}
export default function UserProfilePage(props: Props) {
    return (<>

        <img src={props.userProfile?.avatarUrl} alt={props.userProfile?.id}/>
        <h3>{props.userProfile?.name}</h3>
        <button onClick={props.logout}>Logout</button>
        <div><h2>My Tools</h2>
            <section>

                {props.tools.slice(0, 2).map(tool => <ToolCard key={tool.id} tool={tool}/>)}
            </section>
        </div>
    </>);
}

