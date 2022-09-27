import { useContext } from "react";
import { QuizContext } from "../context/quiz";

import './Category.css';

const Category = ({category}) => {
    const [quizState, dispatch] = useContext(QuizContext);

    return (
        <button onClick={() => dispatch({type: "CHANGE_STATE", payload: {category: category}})}>{category}</button>
    );
}

export default Category;
