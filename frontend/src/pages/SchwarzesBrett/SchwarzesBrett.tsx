import "./SchwarzesBrett.scss";

export default function SchwarzesBrett() {

    function addPost() :void {
        console.log("addPost");

    }
    function deletePost() :void {
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
                        <button onClick={deletePost} className="delete-btn"><i className="las la-trash"></i></button>
                    </article>
                </div>
            </section>

        </div>
    );
}

