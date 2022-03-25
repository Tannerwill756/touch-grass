import React, { useState } from 'react';
import '../App.css';

function PlayerCount() {
  const [players, setPlayers] = useState<number>(1);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(players);
  };

  return (
    <div className='PlayerCount'>
      <form onSubmit={handleSubmit}>
        <label>
          Number of Players:
          <input
            type='number'
            value={players}
            onChange={(e) => setPlayers(Number(e.target.value))}
          />
        </label>
        <input type='submit' name='submit' />
      </form>
    </div>
  );
}

export default PlayerCount;