import React, {useContext} from "react";
import AppContext from "../context/AppContext";
import Answer from "../components/Answer";
import '../styles/AnswerInterface.css';
import { Link } from "react-router-dom";

const AnswerInterface = () => {
    const {questions} = useContext(AppContext);
    const location = window.location.href;
    const regExp = /.*\/([0-9]+)/;
    const found = location.match(regExp);
    var page = Number(found[1]);
    var max = questions.length - 1;
    

    var pageN = page+1;
    if(pageN > max){
        pageN = 0;
    }
    var pageP = page-1;
    if(pageP < 0){
        pageP = max;
    }


    return(
        <section className="AnswerInterface-section">
            <a href="/" className="returnButton">Volver</a>
            <div>
                <Answer arr={found}/>
            </div>
            <div className="buttons-container">
            <Link to={`/Questions/${pageP}`} reloadDocument className="backButton">Atras</Link>
            <Link to={`/Questions/${pageN}`} reloadDocument className="nextButton">Siguiente</Link>
            </div>
        </section>
    );
}

export default AnswerInterface;