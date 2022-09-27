import { createContext, useReducer } from "react";
import questions_complete from "../data/questions_complete";

const STAGES = ["Start", "Categories", "Playing", "End"];

const START_STAGE = 0;
const CATEGORIES_STAGE = 1;
const PLAYING_STAGE = 2;
const END_STAGE = 3;

const initialState = {
    gameStage: STAGES[START_STAGE],
    questions: [],
    currentQuestion: 0,
    score: 0,
    answerSelected: false,
    currentCategory: null,
}

const quizReducer = (state, action) => {
    switch (action.type) {
        case "SELECT_CATEGORY":
            return {
                ...state,
                gameStage: STAGES[CATEGORIES_STAGE],
            };

        case "CHANGE_STATE":
            const selectedCategory = action.payload.category || state.currentCategory;

            let currentQuestions = questions_complete.find(quiz => quiz.category === selectedCategory).questions;

            currentQuestions = currentQuestions.sort(() => {
                return Math.random() - 0.5;
            });

            return {
                ...state,
                gameStage: STAGES[PLAYING_STAGE],
                currentCategory: selectedCategory,
                questions: currentQuestions,
            };

        case "CHANGE_QUESTION":
            const nextQuestion = state.currentQuestion + 1;

            let endGame = false;

            if(!state.questions[nextQuestion]) {
                endGame = true;
            }

            return {
                ...state,
                currentQuestion: nextQuestion,
                gameStage: endGame ? STAGES[END_STAGE] : state.gameStage,
                answerSelected: false,
            }

        case "NEW_GAME":
            return initialState;

        case "CHECK_ANSWER":
            if (state.answerSelected) return state;

            const answer = action.payload.answer;
            const option = action.payload.option;

            let correctAnswer = 0;

            if (answer === option) correctAnswer += 1;

            return {
                ...state,
                score: state.score + correctAnswer,
                answerSelected: option
            }

        default:
            return state;
    }
};

export const QuizContext = createContext();

export const QuizProvider = ({children}) => {
    const value = useReducer(quizReducer, initialState);

    return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>
};
