import {UserProfile} from "../../assets/entities/userProfile.ts";
import "./UserLogin.scss"
import ButtonLarge from "../../components/Button/ButtonLarge.tsx";

type Props = {
    readonly userProfile: UserProfile | undefined
    readonly login: () => void
    readonly    logout: () => void
}
export default function UserLogin(props: Props) {
function changeVisibility() {
    const password = document.getElementById("user-password");
    if (password?.getAttribute("type") === "password") {
        password.setAttribute("type", "text");
    } else {
        password?.setAttribute("type", "password");
    }
}
    function handleKeyDown(event: { key: string; preventDefault: () => void; }) {
        if (event.key === "Enter") {
            event.preventDefault();
            changeVisibility();
        }
    }
    return (
        <div className="userLogin">
            <form>
                <label>
                    Username <input type="text"/>
                </label>
                <label>
                    Password <input id={"user-password"} type="password" onKeyDown={handleKeyDown}/><span onClick={changeVisibility}>Auge</span>
                </label>
                <button onClick={props.login}>Login</button>

                <ButtonLarge name={"Login"}/>
            </form>
            <hr/>
            <div className="externalLogin">
                <p>Login mit folgenden Anbietern</p>
                {
                    props.userProfile?.name
                        ? <>
                            <p>{props.userProfile?.name}</p>
                            <button onClick={props.logout}>Logout</button>
                        </>
                        : <div className="oAuthAnbieter">

                            <button onClick={props.login}><i className="lab la-github"></i></button>
                            <button onClick={props.login}><i className="lab la-google"></i></button>
                        </div>}
            </div>
        </div>
    );
}