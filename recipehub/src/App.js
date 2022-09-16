import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import RecipePage from './components/RecipePage/RecipePage';
import RecipeProfilePage from './components/RecipeProfilePage/RecipeProfilePage'
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import UpdateRecipe from './components/UpdateRecipe/UpdateRecipe'
import NewRecipePage from './components/NewRecipePage/NewRecipePage';
import MyRecipes from './components/MyRecipes/MyRecipes';
import ArticlePage from './components/ArticlePage/ArticlePage';
import ArticleProfilePage from './components/ArticleProfilePage/ArticleProfilePage'
import UpdateArticle from './components/UpdateArticle/UpdateArticle';

axios.defaults.baseURL = "https://localhost:44340/api/";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
            <Route key={uuidv4()} exact path="/" element={[<RecipePage key={uuidv4()}/>]}/>
            <Route key={uuidv4()} exact path="/recipe/:id" element={[<RecipeProfilePage key={uuidv4()}/>]}/>
            <Route key={uuidv4()} exact path="/registration" element={[<Registration key={uuidv4()}/>]}/>
            <Route key={uuidv4()} exact path="/login" element={[<Login key={uuidv4()}/>]}/>
            <Route key={uuidv4()} exact path="/update-recipe/:id" element={[<UpdateRecipe key={uuidv4()}/>]}/>
            <Route key={uuidv4()} exact path="/new-recipe" element={[<NewRecipePage key={uuidv4()}/>]}/>
            <Route key={uuidv4()} exact path="/my-recipes" element={[<MyRecipes key={uuidv4()}/>]}/>
            <Route key={uuidv4()} exact path="/articles" element={[<ArticlePage key={uuidv4()}/>]}/>
            <Route key={uuidv4()} exact path="/article/:id" element={[<ArticleProfilePage key={uuidv4()}/>]}/>
            <Route key={uuidv4()} exact path="/update-article/:id" element={[<UpdateArticle key={uuidv4()}/>]}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
