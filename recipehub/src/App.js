import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import RecipePage from './components/RecipePage/RecipePage';
import RecipeProfilePage from './components/RecipeProfilePage/RecipeProfilePage'

axios.defaults.baseURL = "https://localhost:44340/api/";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route key={uuidv4()} exact path="/" element={[<RecipePage key={uuidv4()}/>]}/>
            <Route key={uuidv4()} exact path="/recipe/:id" element={[<RecipeProfilePage key={uuidv4()}/>]}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
