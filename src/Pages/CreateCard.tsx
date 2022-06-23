import axios from 'axios';
import React, { ChangeEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { ScoreBuilder } from '../components/HelperFunctions';

export interface IHomePageProps {}

const CreateCard: React.FunctionComponent<IHomePageProps> = (props) => {
  const location = useLocation();
  const [player, setPlayer] = useState<string>('');
  const [playersArray, setPlayersArray] = useState<Array<string>>([]);
  const { numHoles, price } = location.state as any;
  const [playerValidation, setPlayerValidation] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPlayer(e.target.value);
  };

  const addPlayer = async () => {
    // API call to see if user is in database
    axios
      .get(`http://localhost:9090/users/getUserByUsername/${player}`)
      .then((res) => {
        if (res.status === 200 && !playersArray.includes(player)) {
          setPlayerValidation(true);
          setPlayersArray([...playersArray, player]);
          setPlayer('');
        } else {
          setPlayerValidation(false);
        }
      })
      .catch(() => setPlayerValidation(false));
  };

  const removePlayer = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button: HTMLButtonElement = event.currentTarget;
    var newTotalPlayerArray = playersArray.filter((p) => p !== button.name);
    setPlayersArray(newTotalPlayerArray);
  };

  const createScorecard = () => {
    const playerObj = {
      numHoles: numHoles,
      pricePerHole: price,
      isFinished: false,
      players: playersArray,
      scores: ScoreBuilder(numHoles, playersArray),
    };
    axios
      .post('http://localhost:9090/scorecards/createScorecard/', playerObj)
      .then((res) => {
        navigate(`/scorecards/${res.data.card._id}`);
      });
  };

  return (
    <div className='CreateCard'>
      <label>
        Who are you playing with?
        <input type='string' value={player} onChange={handleChange} />
      </label>
      <button onClick={addPlayer}>Add Player</button>
      {playerValidation ? '' : <p>Player not found!</p>}
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
  );
};

export default CreateCard;
