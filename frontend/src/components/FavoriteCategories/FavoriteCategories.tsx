import "./FavoriteCategories.scss";
import {Category, getCategoryImage, getCategoryTranslation, Tools} from "../../assets/entities/tools.ts";
import {Link} from "react-router-dom";


export function capitalizeWords(str: string) {
    return str
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ")
}

type Props = {
    readonly tools: Tools[];
}
export default function FavoriteCategories(props: Props) {

    const categoryCount = props.tools.reduce((count, tool) => {
        for (const category of tool.categories) {
            count[category] = (count[category] || 0) + 1;
        }
        return count;
    }, {} as { [key: string]: number });
    const sortedCategories = Object.keys(categoryCount).sort((a, b) => {
        return categoryCount[b] - categoryCount[a];
    });

    return (
        <article className={"favoriteCategories-comp"}>
            <div>
                <h5>Beliebteste Kategorien</h5>
                <Link to={"/kategorie"}>Alle</Link>
            </div>
            <div>
                {sortedCategories.slice(0, 4).map(cat => {
                    const backgroundImageUrl = getCategoryImage(cat as Category); // Get the image URL for the category
                    const inlineStyle = {
                        backgroundImage: `url(${backgroundImageUrl})`
                    };
                    return (
                        <Link to={"/kategorie/" + cat} key={cat}>
                            <div className="category" style={inlineStyle}>
                                <p>{capitalizeWords(getCategoryTranslation(cat as Category))}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>

        </article>
    )
        ;
}