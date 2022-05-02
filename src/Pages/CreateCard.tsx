import React, { ChangeEvent, useState } from 'react';
import Scorecard from '../components/scorecard';

export interface IHomePageProps {}

const CreateCard: React.FunctionComponent<IHomePageProps> = (props) => {
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

  const removePlayer = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button: HTMLButtonElement = event.currentTarget;
    var newTotalPlayerArray = totalPlayers.filter((p) => p !== button.name);
    setTotalPlayers(newTotalPlayerArray);
  };

  const createScorecard = () => {
    setIsSubmitted(true);
    console.log(totalPlayers);
  };

  return (
    <div className='CreateCard'>
      <div>
        <label>
          Who are you playing with?
          <input type='string' value={player} onChange={handleChange} />
        </label>
        <button onClick={addPlayer}>Add Player</button>
        {totalPlayers.map((p, key) => (
          <div key={key}>
            <p>{p}</p>
            <button onClick={removePlayer} name={p}>
              Remove Player
            </button>
          </div>
        ))}
        <br />
        <button onClick={createScorecard}>Create Scorecard</button>
      </div>
      <div>{isSubmitted ? <Scorecard players={totalPlayers} /> : ''}</div>
    </div>
  );
};

export default CreateCard;
