import axios from "axios";
import {allCategories, Tools} from "../../assets/entities/tools.ts";
import "./AddTool.scss"
import {ChangeEvent, FormEvent, useState} from "react";
import {strassen} from "../../assets/entities/locations.ts";
import {useNavigate} from "react-router-dom";

type Props = {
    onToolUpdate: () => void
}
export default function AddTool(props: Props) {
    const [tool , setTool] = useState<Tools>()
    const [previewImage, setPreviewImage] = useState<string>("");

    const [imageFile, setImageFile] = useState<File | null>(null)
    const [name, setName] = useState("")
    const [strasse, setStrasse] = useState("")
    const [hausnummer, setHausnummer] = useState("")
    const [category, setCategory] = useState("")
    const [author, setAuthor] = useState("")
    const [description, setDescription] = useState("")

    const navigate = useNavigate();

    function submitNewTool(event: FormEvent) {
        event.preventDefault()
        axios.post("/api/tools/add",
            {
                name: name,
                image: imageFile,
                category: category,
                author: author,
                location: strasse + " " + hausnummer,
                description: description
            })
            .then((response) => {
                setTool(response.data) // brauche ich das?
                resetForm()
            })
            .then(() => {
                navigate("/werkzeuge")
            })
            .then(props.onToolUpdate)
            .catch((error) => {
                console.error(error);
            })

    }

    function resetForm() {
        setName("");
        setImageFile(null);
        setStrasse("");
        setHausnummer("")
        setCategory("");
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

    function changeCategory(event: ChangeEvent<HTMLSelectElement>) {
        const newCategory = event.target.value;
        setCategory(newCategory);
    }

    function changeAuthor(event: ChangeEvent<HTMLInputElement>) {
        const newAuthor = event.target.value;
        setAuthor(newAuthor);
    }

    function changeDescription(event: ChangeEvent<HTMLTextAreaElement>) {
        const newDescription = event.target.value.toString();
        setDescription(newDescription);
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
                        onChange={(event) => {
                            const selectedFile = event.target?.files ? event.target.files[0] : null;

                            if (selectedFile) {
                                // Check if the selected file is an image
                                if (selectedFile.type.startsWith('image/')) {
                                    setImageFile(selectedFile);

                                    const reader = new FileReader();
                                    reader.onload = (e) => {
                                        if (e.target) {
                                            setPreviewImage(e.target.result as string);
                                        }
                                    };
                                    reader.readAsDataURL(selectedFile);
                                } else {
                                    // Display an error message or handle the non-image file selection
                                    console.error("Selected file is not an image.");
                                }
                            } else {
                                setPreviewImage(""); // Clear the preview if no file is selected
                            }
                        }}
                    />
                    {imageFile && <img src={previewImage} alt={name}/>}
                </label>
                <label>
                    <select
                        onChange={changeCategory}
                        value={category}
                        required
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
                                    value={category}>{category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
                                </option>
                            })
                        }
                    </select>
                </label>
                <label>
                    <input
                        type="text"
                        placeholder="Ansprechpartner"
                        onChange={changeAuthor}
                        value={author}
                    />
                </label>
                <label>
                    <select onChange={changeStrasse} value={strasse} required>
                        <option value="" disabled>Straße</option>
                        {
                            strassen.map(str => {
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
                        placeholder="Hausnummer"
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

                <button>Speichern</button>

                <section>
                    <p>Bezeichnung: {name}</p>
                    {imageFile && <img src={previewImage} alt={name}/>}
                    <p>Kategorie: {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}</p>
                    <p>Ansprechpartner: {author}</p>
                    <p>Location: {strasse + " " + hausnummer}</p>
                    <p>Beschreibung: {description}</p>
                </section>
            </form>

        </div>
    );
}

