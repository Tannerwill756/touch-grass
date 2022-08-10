import axios from '../api/index';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { RemoveScorecardID } from '../components/HelperFunctions';

export interface IScorecardProps {}

const Scorecard = () => {
  const {auth} = useAuth();
  const { scorecardId } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [disableInput, setDisableInput] = useState(true);
  const [scores, setScores] = useState<{ [key: string]: any }>({});
  const [numHoles, setNumHoles] = useState<number>(0);
  const [valPerHole, setValPerHole] = useState<number>(0);
  const [selectedHole, setSelectedHole] = useState<number>(1);
  const [changeEvent, setChangeEvent] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  
  

  useEffect(() => {
    axios
      .get(`/scorecards/getScorecard/${scorecardId}`)
      .then((res) => {
        console.log("response",res)
        if (res.data.card.status === "started") {
          const data = res.data;
          const dbScores = data.card.scores;
          if(data.card.creator === auth.username) setDisableInput(false);
          setScores(dbScores);
          setValPerHole(data.card.pricePerHole);
          setNumHoles(data.card.numHoles);
          setIsLoading(false);
        }else if (res.data.card.status === "created") {
          navigate(`/accesscode/${scorecardId}`)
        }else if (res.data.card.status === "finished") {
          navigate(`/scorecards/${scorecardId}/results`);
        }else {
          setIsSubmitted(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const buttonBuilder = () => {
    let itemList = [];
    for (let i = 1; i <= numHoles; i++) {
      itemList.push(
        <button onClick={() => setSelectedHole(i)} key={`btn${i}`}>
          {i}
        </button>,
      );
    }
    return itemList;
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const stringArr = e.target.name.split('-');
    const targetName = stringArr[0];
    const targetHole = stringArr[1];
    setScores((prevState) => ({
      ...prevState,
      [targetName]: {
        ...prevState[targetName],
        [targetHole]: Number(e.target.value),
      },
    }));
  }

  const cardBuilder = (hole: number) => {
    let itemList = [];
    
    if (numHoles > 0) {
      for (let i = 1; i <= numHoles; i++) {

        itemList.push(
          <div id={`hole${i}`} className='cardContainer-item'>
            <h2>hole {i}</h2>
            
            {Object.keys(scores).map((name, key) => {
              let val = Number(Object.values(scores[name])[i - 1]);

              return (
                <div key={key}>
                  <span>{name}</span>
                  <input
                    name={`${name}-hole${i}`}
                    value={val}
                    onChange={changeHandler}
                    type='number'
                    disabled={disableInput}
                  />
                </div>
              );
            })}
          </div>,
        );
      }
    }
    
    return itemList[hole - 1];
  };

  const submitRound = async () => {
    console.log("SUBMITING ROUND")
    // Gets array of all the scores
    let scoresArr = Object.values(scores);
    for (const obj of scoresArr ) {
      if (Object.values(obj).includes(0)){
        return setIsError(true);
      }
    }

    const patchObj = {
            "status": "finished",
            "scores": scores
            }
 
    // submitting scores
    axios.patch(
        `/scorecards/updateScorecard/${scorecardId}`,
        patchObj,
        ).then(() => {
          // sending payout to winners
          console.log("SUBMITING PAYPAL PAYMENTS")
          axios.post(`/paypal/payout/${scorecardId}`)
          .then(() => {
            console.log("successfulll payout")
            setIsError(false);
            setIsSubmitted(true);
            setTimeout(() => {
              navigate(`/scorecards/${scorecardId}/results`);
            }, 1000);
          }).catch(err=> console.log("payout post req error",err))
        }).catch(err=> console.log("patch scorecard req error",err))
        // removes scorecard from users active scorecards
        RemoveScorecardID(scores, scorecardId);
  };


  return (
    <div className='DisplayCard'>
      <div className='Scorecard'>
        <h1>Score Card</h1>
        {isLoading === false && scores && isSubmitted === false ? (
          <div className='cardContainer'>
            {cardBuilder(selectedHole)}

            {buttonBuilder()}
            <button onClick={() => submitRound()}>Finish Round</button>
          </div>
        ) : null}
        {isError === true && (
          <h2 style={{ color: 'red' }}>Not all scores have been entered in.</h2>
        )}

        {isSubmitted === true && (
          <div>
            <h2 style={{ color: 'green' }}>
              Scorecard successfully submitted!
            </h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scorecard;
