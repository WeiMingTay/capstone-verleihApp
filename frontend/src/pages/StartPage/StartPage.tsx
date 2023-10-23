import {Link} from "react-router-dom";
import "./StartPage.scss";
import LatestTool from "../../components/LatestTool/LatestTool.tsx";
import FavoriteCategories from "../../components/FavoriteCategories/FavoriteCategories.tsx";
import {Tools} from "../../assets/entities/tools.ts";

type Props = {
   readonly tools: Tools[]
}
export default function StartPage(props: Props) {


    return (
        <section className={"start-page"}>

            <LatestTool tools={props.tools}/>
            <FavoriteCategories/>
            <Link className="schwarzesBrett-img" to={"/schwarzes-brett"}>
                <h5>Schwarzes Brett</h5>
                <div>
                    <img
                        src="https://images.unsplash.com/photo-1602497223003-531c7a191886?auto=format&fit=crop&q=60&w=700&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c2Nod2FyemVzJTIwYnJldHR8ZW58MHx8MHx8fDI%3D"
                        alt="schwarzesBrett-image"
                    />
                </div>

            </Link>
        </section>
    );
}

