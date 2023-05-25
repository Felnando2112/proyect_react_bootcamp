import React,{useState,useRef,useEffect} from "react";
import '../styles/Answer.css';


const Answer = ({question}) => {
    const videoRef = useRef(HTMLVideoElement);
    const streamRef = useRef(MediaStream);
    const streamRecorderRef = useRef(MediaRecorder);
    const chunks = useRef([]);
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
      streamRecorderRef.current.start();
      streamRecorderRef.current.ondataavailable = function (event){
        if(chunks.current){
           console.log(event.data);
           chunks.current.push(event.data);
        }
      }
      setIsRecording(true);
    }

    useEffect(() => {
      if(isRecording){
        return;
      }
      if(chunks.current.length === 0){
        return;
      }
      const blob = new Blob(chunks.current, {
        type: "video/x-matroska;codecs=avc1,opus",
      });
      setDownloadLink(URL.createObjectURL(blob));
      chunks.current = [];
    },[isRecording])
 

    function stopRecording(){
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
              audio: {deviceId: audioSource !== null ? {exact: audioSource} : undefined},
              video: {deviceId: videoSource !== null ? {exact: videoSource} : undefined}
          };
          try {
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            console.log(stream.MediaStream);
            gotStream(stream);
          } catch (bug) {
            setError(bug);
            console.log(error);
          }
        }

        await getStream();
      }
      prepareStream();
    },[])

    return(
    <div className="answer-container">
        {downloadLink ? <video src={downloadLink} className="answer-video" controls></video> 
        :<video ref={videoRef}className="answer-container-video" autoPlay={true} playsInline=''></video>}
        <button  onClick={stopRecording} className="answer-stopButton" disabled={!isRecording}>STOP</button>
        <button  onClick={startRecording} disabled={isRecording} className="answer-playButton" >PLAY</button>
        
        <p className="answer-description">{question.pregunta}. instrucciones: aprete el boton play y el boton stop, despues presione nuevamente el boton play para empezar la primera grabacion y stop para detenerla, si desea regrabar solo aprete play una vez y stop cuando haya terminado. Abajo aparecera el link para descargar su video y para visualizarlo.</p>
        {downloadLink && (<a href={downloadLink} className='linkDeDescarga' download='file.mp4'>descargar</a>)}
    </div>
    );
}

export default Answer;