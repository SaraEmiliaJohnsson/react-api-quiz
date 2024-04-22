import { useEffect, useState } from "react";

interface Category {
    id: number;
    name: string;
}

type WelcomeProps = {
    setCategory: (categoryId: number) => void;
    nextScreen: () => void;
}


const Welcome = ({ setCategory, nextScreen }: WelcomeProps) => {

    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);


    useEffect(() => {
        fetch('https://opentdb.com/api_category.php')
            .then(response => response.json())
            .then(data => setCategories(data.trivia_categories))
            .catch(error => console.error('Error fetching categories', error));
    }, []);

    const handleCategorySelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const categoryId = parseInt(event.target.value);
        const selectedCat = categories.find(cat => cat.id === categoryId);
        setSelectedCategory(selectedCat || null);
    }

    const handleStart = () => {
        if (selectedCategory !== null) {
            setCategory(selectedCategory.id)
            nextScreen();
        } else {
            alert('Välj ett ämne innan du startar quizet!')
        }
    }

    return (
        <section>
            <h1>Välkommen!</h1>
            <h2>Välj ämne för att starta quizet!</h2>
            <select title="category" onChange={handleCategorySelect}>
                <option value="">Välj ett ämne..</option>
                {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                ))}
            </select>

            <button type="button" onClick={handleStart}>Starta</button>
        </section>
    )
}

export default Welcome;