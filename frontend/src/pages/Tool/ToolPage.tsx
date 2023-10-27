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
        <p>{tool?.timestamp.toLocaleString()}</p>

        <h4>{tool?.name}</h4>
        <img
            src={tool?.image}
            alt={tool?.name + "-image"}
        />

        {tool?.categories
            ? <div className={"categories"}>
                {
                    tool?.categories.map((category) => {
                        return <p key={category}
                                  className={"category"}>{capitalizeWords(getCategoryTranslation(category))}</p>
                    })
                }
            </div>
            :
            <div></div>
        }
        <p className={"italic"}>Ort: <span>{tool?.location}</span></p>
        <p className={"italic"}>Ansprechpartner:in: <span>{tool?.author}</span></p>
        <ButtonLarge name={"Anfrage"}/>
        <p> Anleitung: {tool?.description}</p>
        <ButtonLarge name={"Löschen"} onClick={() => tool?.id && deleteToolById(tool.id)}/>


    </article>)
        ;
}

/*
PostMapping
@RequestPart MultipartFile "VariableName"

Ggf. Service
Byte[] byte= MultipartFile.getBytes();
Base64.getEncoder().encodeToString(byte);

Base64 importieren von Java.util*/