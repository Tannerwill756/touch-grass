import React from 'react';
import Scorecard from './components/scorecard';
import PlayerCount from './components/playercount';
import './App.css';

function App() {
  return (
    <div className='App'>
      <PlayerCount />
      <Scorecard />
    </div>
  );
}

export default App;
