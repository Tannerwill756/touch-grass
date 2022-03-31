import React, { ChangeEvent, useState } from 'react';
import Scorecard from './components/scorecard';
import './App.css';

function App() {
  const [player, setPlayer] = useState<string>('');
  var [totalPlayers, setTotalPlayers] = useState<Array<string>>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayer(e.target.value);
  };

  const addPlayer = () => {
    setTotalPlayers([...totalPlayers, player]);
    setPlayer('');
  };

  const removePlayer = (player: React.MouseEvent<HTMLButtonElement>) => {
    // var fuckThis = totalPlayers.filter(p => p !== player);
    console.log(player)
  }
 
  const createScorecard = () => {
    setIsSubmitted(true);
    console.log(totalPlayers);
  };

  return (
    <div className='App'>
      <div>
        <label>
          Who are you playing with?
          <input type='string' value={player} onChange={handleChange} />
        </label>
        <button onClick={addPlayer}>Add Player</button>
        {totalPlayers.map((p) => (
          <div>
            <p>{p}</p>
            <button onClick={removePlayer(p)}>Remove Player</button>
          </div>
        ))}
        <br />
        <button onClick={createScorecard}>Create Scorecard</button>
      </div>
      <div>{isSubmitted ? <Scorecard players={totalPlayers} /> : ''}</div>
    </div>
  );
}

export default App;
