import "./Button.scss";

type Props = {
    name: string
    onClick?: () => void
}
export default function ButtonLarge(props: Props) {
    return (
        <button className={"buttonLarge"} onClick={props.onClick}>{props.name}</button>
    );
}
