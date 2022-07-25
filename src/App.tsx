import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import Dashboard from './Pages/Dashboard';
import CreateCard from './Pages/CreateCard';
import Home from './Pages/Home'
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
        <Route path='/' element={<Home />} />

        {/* Protected Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth /> }>
            <Route path='/dashboard' element={<Dashboard />} />
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
