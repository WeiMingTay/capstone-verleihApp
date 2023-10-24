import {getCategoryTranslation, Tools} from "../../assets/entities/tools.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import "./ToolPage.scss";
import {capitalizeWords} from "../../components/FavoriteCategories/FavoriteCategories.tsx";
import ButtonLarge from "../../components/Button/ButtonLarge.tsx";

type Props = {
    onToolUpdate: () => void
};

export default function ToolPage(props: Props) {
    const [tool, setTool] = useState<Tools>()

    const {id} = useParams()

    const navigate = useNavigate();
    useEffect(() => {
        getTool()
    }, [])

    function getTool() {
        axios.get(`/api/tools/${id}`)
            .then(response => {
                setTool(response.data)
            })
            .catch(error => console.error(error))
    }

    function deleteToolById(id: string) {
        axios.delete(`/api/tools/${id}`)
            .then(() => {
                navigate("/werkzeuge")
                props.onToolUpdate?.()
            })
            .catch(error => console.error(error))
    }

    return (<article className={"toolPage-page"}>
        <p>{tool?.id}</p>

        <h4>{tool?.name}</h4>
        <a target={"_blank"}
           href={"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=1170&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}><img
            src={"https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&q=80&w=1170&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
            alt={tool?.name}/>
        </a>
        {tool?.category
            ? <div className={"categories"}>
                <p className={"category"}>{capitalizeWords(getCategoryTranslation(tool?.category))}</p>
                <p className={"category"}>garden</p>
            </div>
            : <div></div>}
        <p>Ort: <span>{tool?.location}</span></p>
        <p>Ansprechpartner:in: <span>{tool?.author}</span></p>
        <ButtonLarge name={"Anfrage"}/>
        <p> Anleitung: {tool?.description}</p>
        <ButtonLarge name={"Löschen"} onClick={() => tool?.id && deleteToolById(tool.id)}/>



    </article>);
}

/*
PostMapping
@RequestPart MultipartFile "VariableName"

Ggf. Service
Byte[] byte= MultipartFile.getBytes();
Base64.getEncoder().encodeToString(byte);

Base64 importieren von Java.util*/