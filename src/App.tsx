import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import HomePage from './Pages/Home';
import CreateCard from './Pages/CreateCard';
import './App.css';
import RegisterPage from './Pages/register';
import LoginPage from './Pages/login';
import Scorecard from './Pages/Scorecard';
import Results from './Pages/Results';

export interface IApplicationProps {}

const App: React.FunctionComponent<IApplicationProps> = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/login' element={<LoginPage />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth /> }>
            <Route path='/' element={<HomePage />} />
          </Route>
        </Route>
        
        
        
        <Route path='/createcard' element={<CreateCard />} />
        <Route path='/scorecards/:scorecardId' element={<Scorecard />} />
        <Route path='/scorecards/:scorecardId/results' element={<Results />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
