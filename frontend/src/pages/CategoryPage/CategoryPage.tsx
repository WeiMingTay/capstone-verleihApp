import {useParams} from "react-router-dom";
import {Category, getCategoryImage, getCategoryTranslation, Tools} from "../../assets/entities/tools.ts";
import ToolCard from "../../components/ToolCard/ToolCard.tsx";
import "./CategoryPage.scss"

type Props = {
    readonly tools: Tools[];
};

export default function CategoryPage(props: Props) {
    const {id} = useParams();
    const categoryId = id as Category;


    return (
        <div className={"CategoryPage"}>
            <h2 style={{backgroundImage: `url(${getCategoryImage(categoryId)})`}}>{getCategoryTranslation(categoryId)}</h2>
            {
                (props.tools.filter(tool => tool.categories.includes(categoryId)).length === 0)
                    ? <p>Keine Elemente mit dieser Kategorie vorhanden</p>
                    : <section>
                        {props.tools
                            .filter(tool => tool.categories.includes(categoryId))
                            .map(tool => <ToolCard key={tool.id} tool={tool}/>)}
                    </section>
            }
        </div>
    )
        ;
}
