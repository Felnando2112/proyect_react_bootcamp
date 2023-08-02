import { useState } from "react";

const arr = [
  {pregunta: `pregunta numero ${1}`,
   id: 0
  },
  {pregunta: `pregunta numero ${2}`,
   id: 1
  },
  {pregunta: `pregunta numero ${3}`,
   id: 2
  },
  {pregunta: `pregunta numero ${4}`,
   id: 3
  }
]

const useInitialState = () => {
  const [questions] = useState(arr);
    
  
return {
    questions
}
}
 export default useInitialState;