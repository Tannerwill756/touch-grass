import React, { ChangeEvent, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import DisplayCardPage from '../components/DisplayCard';
import Scorecard from '../components/scorecard';

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

  const addPlayer = () => {
    fetch(`http://localhost:9090/users/getUserByUsername/${player}`).then(
      (response) => {
        if (response.status === 200 && !playersArray.includes(player)) {
          setPlayerValidation(true);
          setPlayersArray([...playersArray, player]);
          setPlayer('');
        } else {
          setPlayerValidation(false);
        }
      },
    );
  };

  const removePlayer = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button: HTMLButtonElement = event.currentTarget;
    var newTotalPlayerArray = playersArray.filter((p) => p !== button.name);
    setPlayersArray(newTotalPlayerArray);
  };

  const scoreBuilder = (holes: number, players: Array<String>) => {
    let scoreObj: Object = {};
    players.map((player: any) => {
      if (holes == 9) {
        const newObj = new Object({
          hole1: 0,
          hole2: 0,
          hole3: 0,
          hole4: 0,
          hole5: 0,
          hole6: 0,
          hole7: 0,
          hole8: 0,
          hole9: 0,
        });
        scoreObj = { ...scoreObj, [player]: newObj };
      } else {
        const newObj = new Object({
          hole1: 0,
          hole2: 0,
          hole3: 0,
          hole4: 0,
          hole5: 0,
          hole6: 0,
          hole7: 0,
          hole8: 0,
          hole9: 0,
          hole10: 0,
          hole11: 0,
          hole12: 0,
          hole13: 0,
          hole14: 0,
          hole15: 0,
          hole16: 0,
          hole17: 0,
          hole18: 0,
        });
        scoreObj = { ...scoreObj, [player]: newObj };
      }
    });
    return scoreObj;
  };

  const createScorecard = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        numHoles: numHoles,
        pricePerHole: price,
        players: playersArray,
        scores: scoreBuilder(numHoles, playersArray),
      }),
    };
    fetch('http://localhost:9090/scorecards/createScorecard', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('scorecard-id', data.card._id);
      });
    navigate('/scorecard');
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
