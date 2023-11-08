import {getCategoryTranslation, Tools} from "../../assets/entities/tools.ts";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import "./ToolPage.scss";
import {capitalizeWords} from "../../components/FavoriteCategories/FavoriteCategories.tsx";
import ButtonLarge from "../../components/Button/ButtonLarge.tsx";
import {UserProfile} from "../../assets/entities/userProfile.ts";

type Props = {
    readonly onToolUpdate: () => void
    readonly userProfile: UserProfile | undefined
};

export default function ToolPage(props: Props) {
    const [tool, setTool] = useState<Tools>()
    const [isBeingEdited, setIsBeingEdited] = useState(false)

    const [name, setName] = useState<string>("")
    const [location, setLocation] = useState<string>("")
    const [author, setAuthor] = useState<string>("")
    const [description, setDescription] = useState<string>("")

    const {id} = useParams()
    const navigate = useNavigate();

    const isLoggedIn: string | undefined = props.userProfile?.name;

    useEffect(() => {
        getTool()
    }, [])

    useEffect(() => {
        if (isBeingEdited) {
            setName(tool?.name ?? '');
            setLocation(tool?.location ?? '');
            setAuthor(tool?.author ?? '');
            setDescription(tool?.description ?? '')
        }
    }, [isBeingEdited, tool]);

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

    const isoTime = tool?.timestamp ?? new Date().toISOString()
    const formattedTimeStamp = new Date(isoTime).toLocaleString([], {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })

    function submitEditedTool(event: FormEvent, id: string) {
        event.preventDefault()
        axios.put(`/api/tools/${id}`, {
            ...tool,
            name: name,
            location: location,
            author: author,
            description: description,
            /*categories: tool?.categories,
            location: tool?.location,
            author: tool?.author,
            description: tool?.description,*/
        })
            .then((response) => {
                setTool(response.data)
            })
            .then(props.onToolUpdate)
        setIsBeingEdited(false)
    }

    function changeName(event: ChangeEvent<HTMLInputElement>) {
        const newName: string = event.target.value;
        setName(newName);
    }

    function changeLocation(event: ChangeEvent<HTMLInputElement>) {
        const newLocation: string = event.target.value;
        setLocation(newLocation)
    }

    function changeAuthor(event: ChangeEvent<HTMLInputElement>) {
        const newAuthor: string = event.target.value;
        setAuthor(newAuthor)
    }
    function changeDescription(event: ChangeEvent<HTMLTextAreaElement>) {
        const newDescription: string = event.target.value;
        setDescription(newDescription)
    }

    return (<article className={"toolPage-page"}>
        <p>{formattedTimeStamp}</p>
        {
            (!isBeingEdited)
                ?
                <><h4>{tool?.name}</h4>
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
                </>
                : <form onSubmit={(event) => submitEditedTool(event, tool?.id ?? "")}>
                    <label>
                        <input id="nameInput" type="text" value={name ?? tool?.name} placeholder="Bezeichnung" onChange={changeName}/>
                    </label>
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
                    <label>Ort: <input type="text"
                            value={location ?? tool?.location}
                            placeholder="Ort"
                            onChange={changeLocation}/>
                    </label>
                    <label>Ansprechpartner:in <input
                            type="text"
                            value={author ?? tool?.author}
                            placeholder="Ansprechpartner:in"
                            onChange={changeAuthor}/>
                    </label>
                    <label>Anleitung/ Beschreibung: <textarea
                                       value={description ?? tool?.description}

                                       onChange={changeDescription}/>
                    </label>
                    <button style={{display: "none"}}>Save</button>
                </form>
        }


        {
            (!isBeingEdited)
                ? <ButtonLarge name="Bearbeiten" onClick={() => setIsBeingEdited(true)}/>
                : <div className={"edit-btn"}>
                    <ButtonLarge name={"Abbrechen"} onClick={() => setIsBeingEdited(false)}/>
                    <ButtonLarge
                        name={"Speichern"}
                        onClick={() => setIsBeingEdited(false)}
                    />

                </div>
        }
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