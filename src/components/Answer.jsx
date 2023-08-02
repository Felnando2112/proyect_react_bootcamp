import React,{useState,useRef,useEffect,useContext} from "react";
import AppContext from '../context/AppContext';
import playButton from '../assets/17343587831556273568.svg';
import stopButton from '../assets/18180038141556273575.svg';
import replayButton from '../assets/4875620481556273577.svg';
import '../styles/Answer.css';


const Answer = ({arr}) => {
    const {questions} = useContext(AppContext);
    const pregunta = questions.at(arr[1]).pregunta;
    var cuenta;
    var segundos = 0;
    var minutos = 0;
    const videoRef = useRef(HTMLVideoElement);
    const streamRef = useRef(MediaStream);
    const streamRecorderRef = useRef(MediaRecorder);
    const chunks = useRef([]);
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [downloadLink,setDownloadLink] = useState('');
    const [isRecording,setIsRecording] = useState(false);
    const [error,setError] = useState(null);
    const [audioSource,setAudioSource] = useState(null);
    const [videoSource,setVideoSource] = useState(null);
    
    
    

    function startRecording(){
      if(isRecording){
        return ;
      }
      if(!streamRef.current){
        console.log(streamRef.current);
        return ;
      }
      streamRecorderRef.current = new MediaRecorder(streamRef.current);
      streamRecorderRef.current.ondataavailable = function (event){
        if(chunks.current){
           chunks.current.push(event.data);
        }
      }

      streamRecorderRef.current.onstop = (event) => {
        clearInterval(cuenta);
        console.log(segundos);
    
        const blob = new Blob(chunks.current, {
          type: "video/x-matroska;codecs=avc1,opus",
        });
        setDownloadLink(URL.createObjectURL(blob));
      };

      streamRecorderRef.current.start();
      setIsRecording(true);
      setSeconds(0);
      setMinutes(0);
      cuenta = setInterval(() => {
        segundos++;
        setSeconds(segundos);
        console.log(segundos);
        if(segundos === 60){
          segundos = 0;
          minutos++
          setMinutes(minutos);
        }
        if(minutos === 2){
          stopRecording();
        }
      },1000);
    }

    useEffect(() => {
      if(isRecording){
        return;
      }
      if(chunks.current.length === 0){
        return;
      } 
      chunks.current = [];
    },[isRecording])
 
    

    function stopRecording(){
      console.log(chunks.current);
      if(!streamRecorderRef.current){
        return;
      }
      streamRecorderRef.current.stop();
      setIsRecording(false);
    }


    useEffect(function() {
      async function prepareStream(){
        function gotStream(stream){
          streamRef.current = stream;
          if(videoRef.current){
            videoRef.current.srcObject = stream;
          }
        }

        async function getStream(){
            const constraints = {
              audio: true ,
              video: true
          };
          try {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            gotStream(stream);
          } catch (bug) {
            setError(bug);
            console.log(error);
          }
        }
        if(!navigator.mediaDevices && !navigator.mediaDevices.getUserMedia){
          setError(new Error('browser API navigator.mediaDevices.getUserMedia is not available'));

        }
        await getStream();
      }
      prepareStream();
    },[])

    return(
    <>
      {downloadLink ? <video src={downloadLink} className="answer-video" controls></video> : null}
    <div className="answer-container">
      { isRecording ? <p className="timer">{minutes}:{seconds}</p> : null}
      { isRecording ? <div className="redButton"></div> : null}
        <video ref={videoRef}className="answer-container-video" autoPlay={true} playsInline=''></video>
        <button  onClick={stopRecording} className="answer-stopButton" disabled={!isRecording}><img src={stopButton} alt='parar'/></button>
        {downloadLink ? <button  onClick={startRecording} disabled={isRecording} className="answer-playButton" ><img src={replayButton} alt="regrabar"/></button> : 
        <button  onClick={startRecording} disabled={isRecording} className="answer-playButton" ><img src={playButton} alt="grabar"/></button>}  
        <p className="answer-description">{pregunta}</p>
        {error && <p>{error.message}</p>}
        {downloadLink && (<a href={downloadLink} className='linkDeDescarga' download='file.mp4'>descargar respuesta</a>)}
    </div>
    </>
    );
}

export default Answer;