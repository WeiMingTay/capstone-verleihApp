import "./FavoriteCategories.scss";
import {allCategories, getCategoryTranslation} from "../../assets/entities/tools.ts";
import {Link} from "react-router-dom";


export function capitalizeWords(str: string) {
    return str
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(" ")
}

export default function FavoriteCategories() {

    const backgroundImageUrl1 = "https://images.unsplash.com/photo-1581166397057-235af2b3c6dd?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    const inlineStyle = {
        backgroundImage: `url(${backgroundImageUrl1})`
    }


    return (
        <article className={"favoriteCategories-comp"}>
            <h5> Beliebteste
                Kategorien </h5>
            <div>
                {
                    allCategories.slice(0, 6).map(cat =>
                        <Link to={"/"} key={cat}>
                            <div
                                style={inlineStyle}
                            >
                                <p>{capitalizeWords(getCategoryTranslation(cat))}</p>
                            </div>

                        </Link>)
                }
            </div>
        </article>
    );
}