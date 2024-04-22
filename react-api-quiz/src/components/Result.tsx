
type ResultProps = {
    score: number;
}

const Result = ({ score }: ResultProps) => {
    return (
        <section>
            <h1>Resultat</h1>
            <p>Ditt poäng: {score}</p>
        </section>
    )
}

export default Result;