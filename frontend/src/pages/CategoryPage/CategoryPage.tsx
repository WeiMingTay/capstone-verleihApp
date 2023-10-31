import {useParams} from "react-router-dom";
import {getCategoryTranslation, Tools} from "../../assets/entities/tools.ts";
import ToolCard from "../../components/ToolCard/ToolCard.tsx";


type Props = {
    readonly tools: Tools[]
}
export default function CategoryPage(props: Props) {
    const cat = useParams();

    if ((props.tools.filter(tool => tool.categories.includes(cat.id))).length === 0) {
        return <p>Keine Elemente mit Kategorie {getCategoryTranslation(cat.id)} vorhanden</p>
    }

    return (<>
        <h2>{cat.id}</h2>
        <section>

            {
                props.tools.filter(tool => tool.categories.includes(cat.id)).map(tool => <ToolCard key={tool.id}
                                                                                                   tool={tool}/>)
            }

        </section>
    </>)

}