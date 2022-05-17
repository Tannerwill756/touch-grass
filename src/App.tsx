import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Home';
import CreateCard from './Pages/CreateCard';
import './App.css';
import RegisterPage from './Pages/register';
import LoginPage from './Pages/login';
import Scorecard from './Pages/Scorecard';

export interface IApplicationProps {}

const App: React.FunctionComponent<IApplicationProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/createcard' element={<CreateCard />} />
        <Route path='/scorecard' element={<Scorecard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
