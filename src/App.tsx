import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import RequireAuth from './components/RequireAuth';
import PersistLogin from './components/PersistLogin';
import Dashboard from './Pages/Dashboard';
import Home from './Pages/Home'
import RegisterPage from './Pages/register';
import LoginPage from './Pages/login';
import Scorecard from './Pages/Scorecard';
import Results from './Pages/Results';
import CreatorAccessCode from './Pages/CreatorAccessCode';
import JoinAccessCode from './Pages/JoinAccessCode';

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
          <Route element={<RequireAuth /> }>
            <Route path='/dashboard/joincard' element={<JoinAccessCode />} />
          </Route>
          <Route element={<RequireAuth /> }>
            <Route path='/accesscode/:scorecardId' element={<CreatorAccessCode />} />
          </Route>
          <Route element={<RequireAuth /> }>
            <Route path='/scorecards/:scorecardId' element={<Scorecard />} />
          </Route>
          <Route element={<RequireAuth /> }>
            <Route path='/scorecards/:scorecardId/results' element={<Results />} />
          </Route>
        </Route>
        
        
        
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
