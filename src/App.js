import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useInitialState from './hooks/useInitialState';
import Home from './pages/Home';
import Response from './pages/Response';
import AppContext from './context/AppContext';


function App() {
  const initialState = useInitialState();
  return (
    <BrowserRouter>
    <AppContext.Provider value={initialState}>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/Questions/:id' element={<Response/>}/>
        </Routes>
    </AppContext.Provider>
    </BrowserRouter>
  );
}

export default App;
