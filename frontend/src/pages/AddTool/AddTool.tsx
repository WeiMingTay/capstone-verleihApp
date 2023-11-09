import axios from "axios";
import {allCategories, getCategoryTranslation, Tools} from "../../assets/entities/tools.ts";
import "./AddTool.scss"
import {ChangeEvent, FormEvent, useState} from "react";
import {strassen} from "../../assets/entities/locations.ts";
import {useNavigate} from "react-router-dom";
import {capitalizeWords} from "../../components/FavoriteCategories/FavoriteCategories.tsx";
import ButtonLarge from "../../components/Button/ButtonLarge.tsx";
import Select from "react-select";

type Props = {
    readonly onToolUpdate: () => void
}
export default function AddTool(props: Props) {
    const [tool, setTool] = useState<Tools>()

    const [imageUrl, setImageUrl] = useState<string>('');
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [name, setName] = useState("")
    const [strasse, setStrasse] = useState("")
    const [hausnummer, setHausnummer] = useState("")
    const [selectedOptions, setSelectedOptions] = useState<{
        label: string;
        value: string
    }[]>([]);
    const [author, setAuthor] = useState("")
    const [description, setDescription] = useState("")

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const catOptions = allCategories.map(category => ({
        label: capitalizeWords(getCategoryTranslation(category)),
        value: category
    }));


    function submitNewTool(event: FormEvent): void {
        event.preventDefault();
        setLoading(true);

        const selectedCategoryValues: string[] = selectedOptions.map(option => option.value);

        const formData = new FormData();
        formData.append('name', name);
        formData.append('categories', JSON.stringify(selectedCategoryValues));
        formData.append('author', author);
        formData.append('location', strasse + ' ' + hausnummer);
        formData.append('description', description);

        const newTool = {
            name: name,

            categories: selectedCategoryValues,
            author: author,
            location: strasse + ' ' + hausnummer,
            description: description,
            timestamp: new Date().toISOString()
        }
        /*[], {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',

                    }*/
        if (imageFile) {
            formData.append("file", imageFile);
        }
        formData.append("data", new Blob([JSON.stringify(newTool)], {type: 'application/json'}));


        axios
            .post('/api/tools/add',
                formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
            .then(response => {
                setTool(response.data);
                resetForm();
                navigate('/werkzeuge');
                props.onToolUpdate();
            })
            .catch(error => {
                console.error("Fehler beim POST", error);
            })
            .finally(() => {
                setLoading(false);
            });

    }


    function resetForm() {
        setName("");
        setImageUrl('');
        setStrasse("");
        setHausnummer("")
        setAuthor("")
        setDescription("")
    }

    function changeName(event: ChangeEvent<HTMLInputElement>) {
        const newBezeichnung = event.target.value;
        setName(newBezeichnung);
    }

    function changeStrasse(event: ChangeEvent<HTMLSelectElement>) {
        const newStrasse = event.target.value;
        setStrasse(newStrasse);
    }

    function changeHausnummer(event: ChangeEvent<HTMLInputElement>) {
        const newHausnummer = event.target.value;
        setHausnummer(newHausnummer);
    }

    function changeAuthor(event: ChangeEvent<HTMLInputElement>) {
        const newAuthor = event.target.value;
        setAuthor(newAuthor);
    }

    function changeDescription(event: ChangeEvent<HTMLTextAreaElement>) {
        const newDescription = event.target.value.toString();
        setDescription(newDescription);
    }

    const sortedStrassen = [...strassen].sort();


    function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.files && event.target.files.length > 0) {
            const selectedFile = event.target.files[0];

            if (selectedFile.type.startsWith("image/")) {
                setImageFile(selectedFile);

                const reader = new FileReader();
                reader.onload = (e) => {
                    if (e.target) {
                        setImageUrl(e.target.result as string);
                    }
                };
                reader.readAsDataURL(selectedFile);
            } else {
                console.error("Selected file is not an image.");
            }
        } else {

            setImageUrl("");
        }
    }


    return (
        <div className="addToolPage">
            {loading &&
                <div className="ladebildschirm">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="xMidYMid"
                        style={{
                            margin: 'auto',
                            display: 'block',
                            shapeRendering: 'auto'
                        }}
                        width="200px"
                        height="200px"
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
                                    d="M29.491524206117255 -5.5 L37.491524206117255 -5.5 L37.491524206117255 5.5 L29.491524206117255 5.5 A30 30 0 0 1 24.742744050198738 16.964569457146712 L24.742744050198738 16.964569457146712 L30.399598299691117 22.621423706639092 L22.621423706639096 30.399598299691114 L16.964569457146716 24.742744050198734 A30 30 0 0 1 5.5 29.491524206117255 L5.5 29.491524206117255 L5.5 37.491524206117255 L-5.499999999999997 37.491524206117255 L-5.499999999999997 29.491524206117255 A30 30 0 0 1 -16.964569457146705 24.742744050198738 L-16.964569457146705 24.742744050198738 L-22.621423706639085 30.399598299691117 L-30.399598299691117 22.621423706639092 L-24.742744050198738 16.964569457146712 A30 30 0 0 1 -29.491524206117255 5.500000000000009 L-29.491524206117255 5.500000000000009 L-37.491524206117255 5.50000000000001 L-37.491524206117255 -5.500000000000001 L-29.491524206117255 -5.500000000000002 A30 30 0 0 1 -24.742744050198738 -16.964569457146705 L-24.742744050198738 -16.964569457146705 L-30.399598299691117 -22.621423706639085 L-22.621423706639092 -30.399598299691117 L-16.964569457146712 -24.742744050198738 A30 30 0 0 1 -5.500000000000011 -29.491524206117255 L-5.500000000000011 -29.491524206117255 L-5.500000000000012 -37.491524206117255 L5.499999999999998 -37.491524206117255 L5.5 -29.491524206117255 A30 30 0 0 1 16.964569457146702 -24.74274405019874 L16.964569457146702 -24.74274405019874 L22.62142370663908 -30.39959829969112 L30.399598299691117 -22.6214237066391 L24.742744050198738 -16.964569457146716 A30 30 0 0 1 29.491524206117255 -5.500000000000013 M0 -20A20 20 0 1 0 0 20 A20 20 0 1 0 0 -20"
                                    ></path>
                            </g>
                        </g>
                    </svg>
                </div>}
            <form onSubmit={submitNewTool}>
                <label>
                    <input
                        type="text"
                        placeholder="Gerätebezeichnung"
                        onInput={changeName}
                        value={name}
                        required
                    />
                </label>
                <label>
                    <input
                        type="file"
                        onChange={handleFileUpload}
                    />
                    {imageUrl && <img src={imageUrl} alt={name}/>}
                </label>

                <label>
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
                <label>
                    <input
                        type="text"
                        placeholder="Ansprechpartner"
                        onChange={changeAuthor}
                        value={author}
                    />
                </label>
                <label className="addTool-strasse">
                    <select onChange={changeStrasse} value={strasse} required>
                        <option value="" disabled>Straße</option>
                        {
                            sortedStrassen.map(str => {
                                return <option
                                    key={str}
                                    value={str}
                                >
                                    {str}
                                </option>
                            })
                        }
                    </select>
                    <input
                        type="text"
                        placeholder="Nr."
                        onChange={changeHausnummer}
                        value={hausnummer}
                        required
                    />
                </label>
                <label>
                    <textarea
                        placeholder="Beschreibung"
                        onChange={changeDescription}
                        value={description}
                    />
                </label>

                <ButtonLarge name={"Speichern"}/>

            </form>
            {tool && <p>{tool?.name} wurde erstellt</p>}
        </div>
    );
}

