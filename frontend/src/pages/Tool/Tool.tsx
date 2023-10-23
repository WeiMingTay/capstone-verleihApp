import {Tools} from "../../assets/entities/tools.ts";
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";


export default function Tool() {
    const [tool, setTool] = useState<Tools>()

    const {id} = useParams()

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

    return (<>
        <div>ProduktSeite</div>
        <h4>{tool?.id}</h4>
        <p>{tool?.name}</p>
    </>);
}

