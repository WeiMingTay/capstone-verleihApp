import {allCategories, getCategoryImage, getCategoryTranslation} from "../../assets/entities/tools.ts";
import {Link} from "react-router-dom";
import {capitalizeWords} from "../../components/FavoriteCategories/FavoriteCategories.tsx";
import "./CategoryGalleryPage.scss";


export default function CategoryGalleryPage() {

    return (
        <section className={"categoryGalleryPage"}>
            {allCategories.map(cat => {
                const backgroundImageUrl = getCategoryImage(cat); // Get the image URL for the category
                const inlineStyle = {
                    backgroundImage: `url(${backgroundImageUrl})`
                };
                return (
                    <Link to={"/kategorie"} key={cat} style={inlineStyle}>
                        <article className="category">
                            <p>{capitalizeWords(getCategoryTranslation(cat))}</p>
                        </article>
                    </Link>
                );
            })}

        </section>
    );
}

