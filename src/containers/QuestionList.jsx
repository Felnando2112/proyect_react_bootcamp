import React, {useState,useEffect,useContext} from "react";
import Question from "../components/Question";
import '../styles/QuestionList.css';
import AppContext from "../context/AppContext";

const QuestionList = () => {
    const {questions} = useContext(AppContext);
    return(
        <section>
            <h1 className="QuestionList-title">Video Cuestionario</h1>
            <div className="QuestionList">
                {
                    questions.map(question => (
                        <Question key={question.id} question={question} />
                    ))
                }
            </div>
            <button className="sendButton">Enviar</button>
        </section>
    );
}

export default QuestionList;