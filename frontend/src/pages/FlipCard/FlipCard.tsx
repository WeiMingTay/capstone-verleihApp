import "./FlipCard.scss"

export default function FlipCard() {
    return (
        <section className={"container"}>

            <div className="flipCard-container">
                <div className="card">
                    <div className="front"></div>
                    <div className="back">
                    </div>
                </div>
            </div>
        </section>
    );
}