
type ResultProps = {
    score: number;
    restartQuiz: () => void;
}

const Result = (props: ResultProps) => {
    return (
        <section>
            <h1>Resultat</h1>
            <p>Ditt poäng: {props.score}</p>
            <button type="button" onClick={props.restartQuiz}>Tillbaka till första sidan</button>
        </section>
    )
}

export default Result;