import axios from "axios";
import {allCategories} from "../../assets/entities/tools.ts";



export default function AddTool() {

    function submitNewTool() {
        axios("api/tools/add")
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error(error);
            })
    }

    return (
        <div className="addToolPage">
            <form onSubmit={submitNewTool}>
                <label><input type="text" placeholder="Gerätebezeichnung"/></label>
                <label><input type="text" placeholder="Location"/></label>
                <label><select>
                    {allCategories.map(category => {
                        return <option
                            key={category}
                            value={category}>{category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
                        </option>

                    })
                    }
                </select></label>
            </form>
        </div>
    );
}

