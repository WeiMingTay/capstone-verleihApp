import "./FavoriteCategories.scss";
import {allCategories, getCategoryImage, getCategoryTranslation} from "../../assets/entities/tools.ts";
import {Link} from "react-router-dom";


export function capitalizeWords(str: string) {
    return str
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ")
}

export default function FavoriteCategories() {


    return (
        <article className={"favoriteCategories-comp"}>
            <div>
                <h5>Beliebteste Kategorien</h5>
                <Link to={"/"}>Alle</Link>
            </div>
            <div>
                {allCategories.slice(0, 6).map(cat => {
                    const backgroundImageUrl = getCategoryImage(cat); // Get the image URL for the category
                    const inlineStyle = {
                        backgroundImage: `url(${backgroundImageUrl})`
                    };
                    return (
                        <Link to={"/"} key={cat}>
                            <div className="category" style={inlineStyle}>
                                <p>{capitalizeWords(getCategoryTranslation(cat))}</p>
                            </div>
                        </Link>
                    );
                })}
            </div>

        </article>
    )
        ;
}