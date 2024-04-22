import { useEffect, useState } from "react";

interface Question {
    question: string;
    answers: string[];
    correct: number;
}

type GameProps = {
    categoryId: number,
    showResult: (score: number) => void;
}

const Game = ({ categoryId, showResult }: GameProps) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>(new Array(questions.length).fill(-1));


    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await fetch(`https://opentdb.com/api.php?amount=10&category=${categoryId}`);
                const data = await response.json();
                if (data.results) {
                    const formattedQuestions: Question[] = data.results.map((result: any) => ({
                        question: result.question,
                        answers: [...result.incorrect_answers, result.correct_answer],
                        correct: result.incorrect_answers.length
                    }));
                    setQuestions(formattedQuestions);
                    setIsLoading(false);
                } else {
                    console.error('No results found');
                }
            } catch (error) {
                console.error('Error fetching questions', error);
            }
        };
        fetchQuestions();
    }, [categoryId]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const handleAnswer = (index: number, selectedAnswerIndex: number) => {
        const updatedSelectedAnswers = [...selectedAnswers];
        updatedSelectedAnswers[index] = selectedAnswerIndex;
        setSelectedAnswers(updatedSelectedAnswers);
    };

    const handleSubmit = () => {
        const score = questions.reduce((acc, question, index) => {
            return question.correct === selectedAnswers[index] ? acc + 1 : acc;
        }, 0);
        showResult(score);
    };

    return (
        <section>
            <h1>The quiz</h1>
            {questions.map((question, index) => (
                <div key={index}>
                    <h3>{question.question}</h3>
                    <ul>
                        {question.answers.map((answer, answerIndex) => (
                            <li key={answerIndex}>
                                <button type="button" onClick={() => handleAnswer(index, answerIndex)}>{answer}</button>
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </section>
    )
}

export default Game;