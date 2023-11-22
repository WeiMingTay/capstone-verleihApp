import "./SchwarzesBrett.scss";

export default function SchwarzesBrett() {

    function addPost() {
        console.log("addPost");

    }
    function deletePost() {
        console.log("deletePost");
    }
    return (
        <div className="schwarzesBrett-page">
            <section>
                <div>
                    <h5>Ich suche</h5>
                    <button onClick={addPost} className="btn btn-primary add-btn">+</button>
                </div>
                <div>
                    <article>
                        <p>Schlagzeug</p>
                        <button onClick={deletePost} className="delete-btn">-</button>
                    </article>
                </div>
            </section>

        </div>
    );
}

