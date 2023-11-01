import {UserProfile} from "../../assets/entities/userProfile.ts";

type Props = {
    userProfile: UserProfile | undefined
    login: () => void
    logout: () => void
}
export default function UserLogin(props: Props) {


    return (
        <div>
            <button onClick={props.login}>Login</button>

            {
                props.userProfile?.name
                    ? <>
                    <p>{props.userProfile?.name}</p>
                    <button onClick={props.logout}>Logout</button>
                    </>
                    : <p>nicht angemeldet</p>
            }
        </div>
    );
}