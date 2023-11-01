import {UserProfile} from "../../assets/entities/userProfile.ts";

type Props = {
    userProfile: UserProfile | undefined
    logout: () => void
}
export default function ProfilPage(props: Props) {
    return (<>
        <div>Profil</div>
        <img src={props.userProfile?.avatarUrl} alt={props.userProfile?.id}/>
        <h3>{props.userProfile?.name}</h3>
        <button onClick={props.logout}>Logout</button>
    </>);
}

