import axios from '../api/index';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export interface IScorecardProps {}

const Scorecard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [scores, setScores] = useState<{ [key: string]: any }>({});
  const [numHoles, setNumHoles] = useState<number>(0);
  const [valPerHole, setValPerHole] = useState<number>(0);
  const [selectedHole, setSelectedHole] = useState<number>(1);
  const [changeEvent, setChangeEvent] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { scorecardId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`/scorecards/getScorecard/${scorecardId}`)
      .then((res) => {
        console.log("response",res)
        if (res.data.card.status === "started") {
          const data = res.data;
          const dbScores = data.card.scores;
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
            {console.log("object keys console", scores)}
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
    // Gets array of all the scores
    let scoresArr = Object.values(scores);
    // Checking if there aren't any scores missed
    scoresArr.map(async (obj) => {
      if (Object.values(obj).includes(0)) {
        setIsError(true);
      } else {
        // if no scores missed
        const patchObj = {
          "status": "finished"
          }
      axios.patch(
          `/scorecards/updateScorecard/${scorecardId}`,
          patchObj,
        ).then(() => {
          setIsError(false);
          setIsSubmitted(true);
          setTimeout(() => {
            navigate(`/scorecards/${scorecardId}/results`);
          }, 1000);
        })
          
        
      }
    });
  };

  // if(scores === undefined){
  //   return <>Loading...</>
  // }

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
