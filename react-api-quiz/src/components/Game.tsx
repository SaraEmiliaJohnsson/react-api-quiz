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
    const [categoryName, setCategoryName] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);

    useEffect(() => {
        const fetchCategoryName = async () => {
            try {
                const response = await fetch(`https://opentdb.com/api_category.php`);
                const data = await response.json();
                const category = data.trivia_categories.find((cat: any) => cat.id === categoryId);
                if (category) {
                    setCategoryName(category.name);
                } else {
                    console.error('Category not found');
                }
            } catch (error) {
                console.error('Error fetching category name', error);
            }
        };
        fetchCategoryName();
    }, [categoryId]);

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
                    setSelectedAnswers(new Array(formattedQuestions.length).fill(-1));
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
        <section className="game-container">
            <section >
                <h1>{categoryName}</h1>
                {questions.map((question, questionIndex) => (
                    <div className="question-container" key={questionIndex}>
                        <h3>{question.question}</h3>
                        <ul>
                            {question.answers.map((answer, answerIndex) => (
                                <li key={answerIndex}>
                                    <button type="button" onClick={() => handleAnswer(questionIndex, answerIndex)} className={selectedAnswers[questionIndex] === answerIndex ? 'selected' : ''}>{answer}</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </section>
            <button className="show-result-btn" type="button" onClick={handleSubmit}>Visa resultat</button>
        </section>
    )
}

export default Game;