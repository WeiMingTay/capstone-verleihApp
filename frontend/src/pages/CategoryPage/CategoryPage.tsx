import { useParams } from "react-router-dom";
import {Category, getCategoryTranslation, Tools} from "../../assets/entities/tools.ts";
import ToolCard from "../../components/ToolCard/ToolCard.tsx";

type Props = {
    readonly tools: Tools[];
};

export default function CategoryPage(props: Props) {
    const { id } = useParams();
    const categoryId = id as Category;

    if (!id || (props.tools.filter(tool => tool.categories.includes(categoryId)).length === 0)) {
        return <p>Keine Elemente mit Kategorie {getCategoryTranslation(categoryId)} vorhanden</p>;
    }

    return (
        <>
            <h2>{categoryId}</h2>
            <section>
                {props.tools
                    .filter(tool => tool.categories.includes(categoryId))
                    .map(tool => <ToolCard key={tool.id} tool={tool} />)}
            </section>
        </>
    );
}
