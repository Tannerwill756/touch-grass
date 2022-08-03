import axios from '../api/index'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';


import { ScoreBuilder } from '../components/HelperFunctions';
import PaypalComponent from '../components/PaypalComponent';

export interface IHomePageProps {}

const CreateCard: React.FunctionComponent<IHomePageProps> = () => {
  const {auth} = useAuth();
  const navigate = useNavigate();
  const [numHoles, setNumHoles] = useState<number>(18);
  const [price, setPrice] = useState<string>('');
  const [numPlayers, setNumPlayers] = useState<number>(0);
  const [scorecardId, setScorecardId] = useState("");
  const [btn, setBtn ] = useState<boolean>(true);
  const [stage, setStage] = useState<number>(1);

  const createScorecard = () => {
    const playerObj = {
      numHoles: numHoles,
      pricePerHole: price,
      status: "created",
      // players: [auth.username],
      // scores: ScoreBuilder(numHoles, [auth.username]),
      setNumberOfPlayers: numPlayers
    };

    axios
      .post('/scorecards/createScorecard/', playerObj)
      .then((res) => {  
        setScorecardId(res.data.card._id);
        setStage(2);
        // navigate(`/accesscode/${res.data.card._id}`);
      });
  };

  useEffect(() => {
    if(Number(price) >= 0.1 && numPlayers >= 2){
      setBtn(false)
    }
  }, [price, numPlayers])

  

  return (
    <>
      {stage === 1 && 
      <div className='CreateCard'>
        <h2>Start a golf match</h2>
        <label>Number of Holes:</label>
        <select value={numHoles} onChange={(e) => setNumHoles(Number(e.target.value))}>
          <option value={9}>9 Holes</option>
          <option value={18}>18 Holes</option>
        </select>
        <br />
        <label>Price per Hole: $</label>
        <input
          type='number'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <label>Number of players: </label>
        <button onClick={() => setNumPlayers(numPlayers - 1)}>-</button><span>{numPlayers}</span><button onClick={() => setNumPlayers(numPlayers + 1)}>+</button>
        <br />
        <button disabled={btn} onClick={createScorecard}>Create Scorecard</button>
      </div>}
      {stage === 2 && <PaypalComponent scorecardId={scorecardId} username={auth.username} numHoles={numHoles} creator={true}/>}

    </>
    
    
  );
};

export default CreateCard;
