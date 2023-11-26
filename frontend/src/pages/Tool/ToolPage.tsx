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
    readonly userProfile?: UserProfile
};

export default function ToolPage(props: Props) {
    const [tool, setTool] = useState<Tools>()
    const [isBeingEdited, setIsBeingEdited] = useState(false)
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
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

        setLoading(true);
        axios.delete(`/api/tools/${id}`)
            .then(() => {

                navigate("/werkzeuge")
                props.onToolUpdate?.()
            })
            .catch(error => console.error(error))
            .finally(() => setLoading(false))
            .finally(() => setIsModalOpen(false));
    }

    console.log(tool?.image)
    const handleDeleteClick = () => {
        setIsModalOpen(true);
    };

    const handleCancelClick = () => {
        setIsModalOpen(false);
    };

    const isoTime = tool?.timestamp ?? new Date().toISOString()
    const formattedTimeStamp = new Date(isoTime).toLocaleString([], {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })

    function submitEditedTool(event: FormEvent<HTMLFormElement> | undefined, id: string) {
        if (!event) {
            console.error("Event is undefined in submitEditedTool");
            return;
        }

        event.preventDefault()
        axios.put(`/api/tools/${id}`, {
            ...tool,
            name: name,
            categories: selectedOptions.map(option => option.value),
            location: location,
            author: author,
            description: description,
        })
            .then((response) => {
                setTool(response.data)
            })
            .then(props.onToolUpdate)
            .finally(() => setIsBeingEdited(false));
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
                <ButtonLarge name="Bearbeiten" onClick={() => setIsBeingEdited(true)}/>
            );
        } else {
            buttonContent = (
                <div className={"edit-btn"}>
                    <ButtonLarge name={"Abbrechen"} onClick={() => setIsBeingEdited(false)}/>
                    <ButtonLarge name={"Speichern"} formId="submitEditForm"/>
                </div>
            );
        }
    }
    let AuthorSameAsUser
    if (tool?.author == tool?.user?.name) {
        AuthorSameAsUser = <img id={"authorUser"} src={tool?.user?.avatarUrl} alt={tool?.user?.name}/>
    }


    return (<article className={"toolPage-page"}>
        <p>{formattedTimeStamp}</p>
        <div className={"userOfTool"}>
            {tool?.user && <img src={tool.user.avatarUrl} alt={tool.user.name}/>}
            {/*<p>{tool?.user.name}</p>*/}
        </div>

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
                    <p className={"italic"}>Ansprechpartner:in: <span
                        id={"authorUser-container"}>{tool?.author}{AuthorSameAsUser}</span></p>
                    {isLoggedIn && <ButtonLarge name={"Anfrage"}/>
                    }
                    <p> Anleitung: {tool?.description}</p>
                </>
                : <form id="submitEditForm" onSubmit={(event) => submitEditedTool(event, tool?.id ?? "")}>
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
        {isLoggedIn
            ?
            loading
                ?
                <svg className={"buttonLarge"}
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 100 100"
                     preserveAspectRatio="xMidYMid"
                     style={{
                         margin: 'auto',
                         display: 'block',
                         shapeRendering: 'auto'
                     }}
                     width="40px"
                     height="40px"
                >
                    <g transform="translate(50 50)">
                        <g>
                            <animateTransform attributeName="transform"
                                              type="rotate"
                                              values="0;45"
                                              keyTimes="0;1"
                                              dur="1000ms"
                                              repeatCount="indefinite">
                            </animateTransform>
                            <path
                                fill={"#ffffff"}
                                d="M29.491524206117255 -5.5 L37.491524206117255 -5.5 L37.491524206117255 5.5 L29.491524206117255 5.5 A30 30 0 0 1 24.742744050198738 16.964569457146712 L24.742744050198738 16.964569457146712 L30.399598299691117 22.621423706639092 L22.621423706639096 30.399598299691114 L16.964569457146716 24.742744050198734 A30 30 0 0 1 5.5 29.491524206117255 L5.5 29.491524206117255 L5.5 37.491524206117255 L-5.499999999999997 37.491524206117255 L-5.499999999999997 29.491524206117255 A30 30 0 0 1 -16.964569457146705 24.742744050198738 L-16.964569457146705 24.742744050198738 L-22.621423706639085 30.399598299691117 L-30.399598299691117 22.621423706639092 L-24.742744050198738 16.964569457146712 A30 30 0 0 1 -29.491524206117255 5.500000000000009 L-29.491524206117255 5.500000000000009 L-37.491524206117255 5.50000000000001 L-37.491524206117255 -5.500000000000001 L-29.491524206117255 -5.500000000000002 A30 30 0 0 1 -24.742744050198738 -16.964569457146705 L-24.742744050198738 -16.964569457146705 L-30.399598299691117 -22.621423706639085 L-22.621423706639092 -30.399598299691117 L-16.964569457146712 -24.742744050198738 A30 30 0 0 1 -5.500000000000011 -29.491524206117255 L-5.500000000000011 -29.491524206117255 L-5.500000000000012 -37.491524206117255 L5.499999999999998 -37.491524206117255 L5.5 -29.491524206117255 A30 30 0 0 1 16.964569457146702 -24.74274405019874 L16.964569457146702 -24.74274405019874 L22.62142370663908 -30.39959829969112 L30.399598299691117 -22.6214237066391 L24.742744050198738 -16.964569457146716 A30 30 0 0 1 29.491524206117255 -5.500000000000013 M0 -20A20 20 0 1 0 0 20 A20 20 0 1 0 0 -20"
                            ></path>
                        </g>
                    </g>
                </svg>
                : <>
                    <ButtonLarge name={"Löschen"} onClick={handleDeleteClick}/>
                    {isModalOpen &&
                        <div className="deleteConfirmation">
                            <p>Wollen Sie das Element wirklich löschen?</p>
                            <div>
                                <ButtonLarge name={"Abbrechen"} onClick={handleCancelClick}/>
                                <ButtonLarge name={"Löschen"} onClick={() => tool?.id && deleteToolById(tool.id)}/>
                            </div>
                        </div>
                    }
                </>
            : <></>
        }
    </article>);
}