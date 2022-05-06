import React, { ChangeEvent, useState } from 'react';
import DisplayCardPage from '../components/DisplayCard';
import Scorecard from '../components/scorecard';

export interface IHomePageProps {}

const CreateCard: React.FunctionComponent<IHomePageProps> = (props) => {
  const [player, setPlayer] = useState<string>('');
  var [playersArray, setPlayersArray] = useState<Array<string>>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayer(e.target.value);
  };

  const addPlayer = () => {
    setPlayersArray([...playersArray, player]);
    setPlayer('');
  };

  const removePlayer = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button: HTMLButtonElement = event.currentTarget;
    var newTotalPlayerArray = playersArray.filter((p) => p !== button.name);
    setPlayersArray(newTotalPlayerArray);
  };

  const createScorecard = () => {
    setIsSubmitted(true);
    console.log(playersArray);
  };

  return (
    <div className='CreateCard'>
      <div>
        <label>
          Who are you playing with?
          <input type='string' value={player} onChange={handleChange} />
        </label>
        <button onClick={addPlayer}>Add Player</button>
        {playersArray.map((person, key) => (
          <div key={key}>
            <p>{person}</p>
            <button onClick={removePlayer} name={person}>
              Remove Player
            </button>
          </div>
        ))}
        <br />

        <button onClick={createScorecard}>Create Scorecard</button>
      </div>
      <div>{isSubmitted ? <DisplayCardPage players={playersArray} /> : ''}</div>
    </div>
  );
};

export default CreateCard;
