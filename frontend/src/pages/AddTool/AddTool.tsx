import axios from "axios";
import {allCategories, Tools} from "../../assets/entities/tools.ts";
import "./AddTool.scss"
import {ChangeEvent, FormEvent, useState} from "react";
import {strassen} from "../../assets/entities/locations.ts";


export default function AddTool() {
    const [tool, setTool] = useState<Tools>()
    const [previewImage, setPreviewImage] = useState<string>("");

    const [imageFile, setImageFile] = useState<File | null>(null)
    const [name, setName] = useState("")
    const [strasse, setStrasse] = useState("")
    const [hausnummer, setHausnummer] = useState("")
    const [category, setCategory] = useState("")
    console.log(tool)

    function submitNewTool(event: FormEvent) {

        event.preventDefault()
        axios.post("/api/tools/add",
            {
                name: name,
                image: imageFile,
                location: strasse + " " + hausnummer,
                category: category
            })
            .then((response) => {
                setTool(response.data) // brauch ich das???
                resetForm()
            })
            .catch((error) => {
                console.error(error);
            })

    }

    function resetForm() {
        setName("");
        setStrasse("");
        setHausnummer("")
        setCategory("");

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
                            setImageFile(selectedFile);
                            if (selectedFile) {
                                const reader = new FileReader();
                                reader.onload = (e) => {
                                    if (e.target) {
                                        setPreviewImage(e.target.result as string);
                                    }
                                };
                                reader.readAsDataURL(selectedFile);
                            } else {
                                setPreviewImage(""); // Clear the preview if no file is selected
                            }
                        }}
                    />
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
                                return <>
                                    <option
                                        key={category}
                                        value={category}>{category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
                                    </option>

                                </>
                            })
                        }
                    </select>
                </label>
                <label>
                    <input
                        type="text"
                        placeholder="Ansprechpartner"/>
                </label>
                <label>
                    <select onChange={changeStrasse} value={strasse} required>
                        <option value="" disabled>Straße</option>
                        {
                            strassen.map(str => {
                                return <>
                                    <option
                                        key={str}
                                        value={str}
                                    >
                                        {str}
                                    </option>
                                </>
                            })
                        }
                    </select>
                    <input
                        type="text"
                        placeholder="Hausnummer"
                        onChange={changeHausnummer}
                        value={hausnummer}
                        required/>
                </label>
                <label>
                    <textarea placeholder="Beschreibung"/>
                </label>

                <button>Speichern</button>
                <section>
                    <p>Bezeichnung: {name}</p>
                    <p>Bild:</p><img src={previewImage} alt={name}/>
                    <p>Kategorie: {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}</p>
                    <p>Ansprechpartner:</p>
                    <p>Location: {strasse + " " + hausnummer}</p>
                    <p>Beschreibung:</p>
                </section>
            </form>

        </div>
    );
}

