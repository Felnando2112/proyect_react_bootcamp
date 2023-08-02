import React from "react";
import { Link } from "react-router-dom";
import playButton from '../assets/17343587831556273568.svg';
import '../styles/Question.css' ;

const Question = ({question}) => {
    

    return (
    <div className="question-container">

        <Link to={`/Questions/${question.id}`} className="question-container-video">
            <video  className="question-video" autoPlay muted loop></video>
            <button className="question-playButton"><img src={playButton} alt="grabar"/></button>
        </Link>
        
        <p className="question-description">{question.pregunta}</p>
        
    </div>
    );
}

export default Question;