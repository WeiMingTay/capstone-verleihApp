import {getCategoryTranslation, Tools} from "../../assets/entities/tools.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import "./ToolPage.scss";
import {capitalizeWords} from "../../components/FavoriteCategories/FavoriteCategories.tsx";
import ButtonLarge from "../../components/Button/ButtonLarge.tsx";
import {UserProfile} from "../../assets/entities/userProfile.ts";

type Props = {
    onToolUpdate: () => void
    userProfile: UserProfile | undefined
};

export default function ToolPage(props: Props) {
    const [tool, setTool] = useState<Tools>()
    const {id} = useParams()
    const navigate = useNavigate();

    const isLoggedIn: string | undefined = props.userProfile?.name;

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

    const isoTime = tool?.timestamp || new Date().toISOString()
    const formattedTimeStamp = new Date(isoTime).toLocaleString([], {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })

    return (<article className={"toolPage-page"}>
        <p>{formattedTimeStamp}</p>

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
        {isLoggedIn && <ButtonLarge name={"Anfrage"}/>
        }
        <p> Anleitung: {tool?.description}</p>
        {
            isLoggedIn
                ? <ButtonLarge name={"Löschen"} onClick={() => tool?.id && deleteToolById(tool.id)}/>
                : null
        }

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