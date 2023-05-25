import React from "react";
import '../styles/Question.css' 

const Question = ({question}) => {
    
    return (
    <div className="question-container">

        <a  href='/Response' className="question-container-video">
            <div className="question-video"></div>
            <button className="question-playButton">PLAY</button>
        </a>
        
        <p className="question-description">{question}</p>
        
    </div>
    );
}

export default Question;