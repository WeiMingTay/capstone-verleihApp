import "./Button.scss";

type Props = {
    readonly name: string
    readonly formId?: string
    onClick?: () => void
}
export default function ButtonLarge(props: Props) {
    return (
        <button className={"buttonLarge"} onClick={props.onClick} form={props.formId}>{props.name}</button>
    );
}
