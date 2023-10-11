import { BrowserRouter, Routes, Route } from "react-router-dom";
import './css/App.css';
import HomeApp from './components/HomeApp';
import HeaderApp from './components/HeaderApp'
import Login from "./components/Login";
import NotFoundPage from "./components/NotFoundPage";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <HeaderApp/>
      <Routes>
        <Route path="/" Component={HomeApp} />
          <Route path='/login' Component={Login}/>
          <Route path="/register" Component={Register}/>
           <Route path="*" Component={NotFoundPage} />
     
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
