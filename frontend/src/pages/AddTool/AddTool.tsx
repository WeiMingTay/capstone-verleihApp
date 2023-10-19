import axios from "axios";
import {allCategories, Tools} from "../../assets/entities/tools.ts";
import "./AddTool.scss"
import {ChangeEvent, FormEvent, useState} from "react";


export default function AddTool() {
    const [, setTool] = useState<Tools>()
    const [name, setName] = useState("")
    const [location, setLocation] = useState("")
    const [category, setCategory] = useState("")


    function submitNewTool(event: FormEvent) {

        event.preventDefault()
        axios.post("/api/tools/add",
            {
                name: name,
                location: location,
                category: category
            })
            .then((response) => {
                setTool(response.data)
                resetForm()
            })
            .catch((error) => {
                console.error(error);
            })

    }

    function resetForm() {
        setName("");
        setLocation("");
        setCategory("");

    }

    function changeName(event: ChangeEvent<HTMLInputElement>) {
        const newBezeichnung = event.target.value;
        setName(newBezeichnung);

    }

    function changeLocation(event: ChangeEvent<HTMLInputElement>) {
        const newLocation = event.target.value;
        setLocation(newLocation);
    }

    function changeCategory(event: ChangeEvent<HTMLSelectElement>) {
        const newCategory = event.target.value;
        setCategory(newCategory);
    }

    return (
        <div className="addToolPage">
            <form onSubmit={submitNewTool}>
                <label><input type="text" placeholder="Gerätebezeichnung" onInput={changeName} value={name}
                              required/></label>
                <label><input type="text" placeholder="Location" onInput={changeLocation} value={location}
                              required/></label>
                <label><select onChange={changeCategory} value={category} required>
                    <option value="" disabled >Kategorie</option>
                    {allCategories.map(category => {
                        return <option
                            key={category}
                            value={category}>{category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
                        </option>
                    })
                    }
                </select></label>
                <button>Speichern</button>
            </form>
            <p>Bezeichnung: {name}</p>
            <p>Location: {location}</p>
            <p>Kategorie: {category}</p>
        </div>
    );
}

