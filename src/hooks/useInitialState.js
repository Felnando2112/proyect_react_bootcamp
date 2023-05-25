import { useState } from "react";

const arr = [
  {pregunta: `pregunta numero ${1}`,
   videoBlob: [],
   id: 0
  },
  {pregunta: `pregunta numero ${2}`,
   videoBlob: [],
   id: 1
  },
  {pregunta: `pregunta numero ${3}`,
   videoBlob: [],
   id: 2
  },
  {pregunta: `pregunta numero ${4}`,
   videoBlob: [],
   id: 3
  }
]

const useInitialState = () => {
  const [questions,setQuestions] = useState(arr);
    
  
return {
    questions
}
}
 export default useInitialState;