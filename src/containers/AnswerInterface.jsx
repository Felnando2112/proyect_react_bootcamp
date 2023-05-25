import React, {useState , useContext} from "react";
import AppContext from "../context/AppContext";
import Answer from "../components/Answer";
import '../styles/AnswerInterface.css';

const AnswerInterface = (id) => {
    const {questions} = useContext(AppContext);
    const [local,setLocal] = useState(0);
    const handleClick = () => {
        if(local < 3){
        setLocal(local + 1);
        }else {
            setLocal(0);
        }
    }
    const handleClick2 = () => {
        if(local > 0){
        setLocal(local - 1);
        }else {
            setLocal(3);
        }
    }
    return(
        <section className="AnswerInterface-section">
            <a href="/" className="returnButton">Volver</a>
            <div>
                <Answer question={questions[local]}/>
            </div>
            <div className="buttons-container">
            <button onClick={handleClick2} className="backButton">Atras</button>
            <button onClick={handleClick} className="nextButton">Siguiente</button>
            </div>
        </section>
    );
}

export default AnswerInterface;