import {allCategories, getCategoryTranslation, Tools} from "../../assets/entities/tools.ts";
import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import "./ToolPage.scss";
import {capitalizeWords} from "../../components/FavoriteCategories/FavoriteCategories.tsx";
import ButtonLarge from "../../components/Button/ButtonLarge.tsx";
import {UserProfile} from "../../assets/entities/userProfile.ts";
import Select from "react-select";

type Props = {
    readonly onToolUpdate: () => void
    readonly userProfile: UserProfile | undefined
};

export default function ToolPage(props: Props) {
    const [tool, setTool] = useState<Tools>()
    const [isBeingEdited, setIsBeingEdited] = useState(false)

    const [name, setName] = useState<string>("")
    const [selectedOptions, setSelectedOptions] = useState<{
        label: string;
        value: string
    }[]>([]);
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
            const initialSelectedOptions = (tool?.categories ?? []).map(category => ({
                label: capitalizeWords(getCategoryTranslation(category)),
                value: category,
            }));
            setSelectedOptions(initialSelectedOptions);
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
            categories: selectedOptions.map(option => option.value),
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
    const catOptions = allCategories.map(category => ({
        label: capitalizeWords(getCategoryTranslation(category)),
        value: category
    }));
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
    let buttonContent;

    if (isLoggedIn) {
        if (!isBeingEdited) {
            buttonContent = (
                <ButtonLarge name="Bearbeiten" onClick={() => setIsBeingEdited(true)} />
            );
        } else {
            buttonContent = (
                <div className={"edit-btn"}>
                    <ButtonLarge name={"Abbrechen"} onClick={() => setIsBeingEdited(false)} />
                    <ButtonLarge name={"Speichern"} onClick={() => setIsBeingEdited(false)} />
                </div>
            );
        }
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
                        <input id="nameInput" type="text" value={name ?? tool?.name} placeholder="Bezeichnung"
                               onChange={changeName}/>
                    </label>
                    <img
                        src={tool?.image}
                        alt={tool?.name + "-image"}
                    />
                    <label id="select-input">
                        <Select
                            isMulti
                            options={catOptions}
                            value={selectedOptions}
                            onChange={(newValue) => {
                                // Create a mutable copy of selectedOptions
                                const mutableSelectedOptions = [...newValue];

                                // Update the state with the mutable copy
                                setSelectedOptions(mutableSelectedOptions);
                            }}
                        />
                    </label>

                    <label id="location-input">Ort: <input type="text"
                                       value={location ?? tool?.location}
                                       placeholder="Ort"
                                       onChange={changeLocation}/>
                    </label>
                    <label id="author-input">Ansprechpartner:in <input
                        type="text"
                        value={author ?? tool?.author}
                        placeholder="Ansprechpartner:in"
                        onChange={changeAuthor}/>
                    </label>
                    <label id="description-input">Anleitung/ Beschreibung: <textarea rows={5}
                        value={description ?? tool?.description}

                        onChange={changeDescription}/>
                    </label>
                    <button style={{display: "none"}}>Save</button>
                </form>
        }
        {buttonContent}
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