import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCategory, setCategoryId } from "../features/actions";


interface Category {
    id: number;
    name: string;
}

type WelcomeProps = {
    nextScreen: () => void;
    onSelectCategory: (categoryId: number) => void;
}


const Welcome = ({ nextScreen, onSelectCategory }: WelcomeProps) => {

    const dispatch = useDispatch();
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);


    useEffect(() => {
        fetch('https://opentdb.com/api_category.php')
            .then(response => response.json())
            .then(data => setCategories(data.trivia_categories))
            .catch(error => console.error('Error fetching categories', error));
    }, []);

    const handleCategorySelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log(event.target.value);

        const categoryId = parseInt(event.target.value);
        const selectedCat = categories.find(cat => cat.id === categoryId);
        setSelectedCategory(selectedCat || null);
    }

    const handleStart = () => {
        if (selectedCategory !== null) {
            console.log(selectedCategory);

            dispatch(setCategoryId(selectedCategory.id));
            nextScreen()

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