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

    const navigate = useNavigate();


    const catOptions = allCategories.map(category => ({
        label: capitalizeWords(getCategoryTranslation(category)),
        value: category
    }));


    function submitNewTool(event: FormEvent): void {
        event.preventDefault();

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
                {/*<label>
                    <select
                        onChange={changeCategory}
                        value={category}

                    >
                        <option
                            value=""
                            disabled
                        >
                            Kategorie
                        </option>
                        {
                            allCategories.map(category => {
                                return <option
                                    key={category}
                                    value={category}>{capitalizeWords(category)}
                                </option>
                            })
                        }
                    </select>
                </label>*/}
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

