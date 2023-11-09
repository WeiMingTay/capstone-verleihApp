import {UserProfile} from "../../assets/entities/userProfile.ts";
import "./UserLogin.scss"
import ButtonLarge from "../../components/Button/ButtonLarge.tsx";
import {Link} from "react-router-dom";

type Props = {
    readonly userProfile: UserProfile | undefined
    readonly login: () => void
    readonly logout: () => void
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
            {(!props.userProfile?.name)
                ?
                <form>
                    <label>
                        Username <input type="text"/>
                    </label>
                    <label>
                        Password <input id={"user-password"} type="password" onKeyDown={handleKeyDown}/><span
                        onClick={changeVisibility} onKeyDown={handleKeyDown}>Auge</span>
                    </label>

                    <ButtonLarge name={"Login"} onClick={props.login}/>
                </form>
                : <></>
            }

            <div className="externalLogin">
                {(!props.userProfile?.name)
                    ? <>
                        <div className="trenner"><p>oder</p>
                            <div/>
                        </div>
                        <div className="oAuthAnbieter">

                            <button onClick={props.login}><i className="lab la-github"></i></button>
                            <button onClick={props.login}><i className="lab la-google"></i></button>
                        </div>
                    </>
                    : <>
                        <Link className="buttonLarge" to={"/start"}>zur Startseite</Link>
                        <img src={props.userProfile.avatarUrl} alt={props.userProfile.id}/>
                        <p>{props.userProfile?.name}</p>
                        <ButtonLarge name="Logout" onClick={props.logout}/>
                    </>
                }

            </div>
        </div>
    );
}