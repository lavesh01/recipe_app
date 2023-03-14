import './App.css';

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { Auth } from './pages/auth';
import { CreateRecipe } from './pages/create-recipe';
import { Home } from './pages/home';
import { Navbar } from './components/navbar';
import { SavedRecipes } from './pages/saved-recipe';

function App() {
  
  return (
    <div className='App'>
    <Router>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
        <Route path="/saved-recipes" element={<SavedRecipes />} />
      </Routes>
    </Router>
    </div>
    );
}

export default App;
