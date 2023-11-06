import {UserProfile} from "../../assets/entities/userProfile.ts";

type Props = {
    readonly userProfile: UserProfile | undefined
    readonly logout: () => void
}
export default function UserProfilePage(props: Props) {
    return (<>
        <div>Profil</div>
        <img src={props.userProfile?.avatarUrl} alt={props.userProfile?.id}/>
        <h3>{props.userProfile?.name}</h3>
        <button onClick={props.logout}>Logout</button>
    </>);
}

