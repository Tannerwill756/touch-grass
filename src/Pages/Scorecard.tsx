import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ScoreComparer } from '../components/HelperFunctions';
export interface IScorecardProps {}

interface results {
  [name: string]: number;
}

const Scorecard = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [scores, setScores] = useState<{ [key: string]: any }>({});
  const [numHoles, setNumHoles] = useState<number>(0);
  const [valPerHole, setValPerHole] = useState<number>(0);
  const [selectedHole, setSelectedHole] = useState<number>(1);
  const [changeEvent, setChangeEvent] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [finalResults, setFinalResults] = useState<results>({});
  const [isError, setIsError] = useState<boolean>(false);
  const { scorecardId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:9090/scorecards/getScorecard/${scorecardId}`)
      .then((res) => {
        if (!res.data.isFinished) {
          const data = res.data;
          const dbScores = data.card.scores;
          setScores(dbScores);
          setValPerHole(data.card.pricePerHole);
          setNumHoles(data.card.numHoles);
          setIsLoading(false);
        } else {
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
    setChangeEvent(!changeEvent);
  };

  const patchRequest = async (submission: Boolean) => {
    const patchObj = {
      scores: scores,
      isFinished: submission,
    };
    try {
      const response = await axios.patch(
        `http://localhost:9090/scorecards/updateScorecard/${scorecardId}`,
        patchObj,
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    patchRequest(false);
  }, [changeEvent]);

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
    let scoresArr = Object.values(scores);
    scoresArr.map(async (obj) => {
      if (Object.values(obj).includes(0)) {
        setIsError(true);
      } else {
        const response = await patchRequest(true);
        if (response.request.status === 201) {
          setIsError(false);
          const results = await ScoreComparer(scores, valPerHole, numHoles);
          setFinalResults(results);
          setIsSubmitted(true);
          const patchObj = {};

          // Updates totalEarnings stat in user's DB
          try {
            Object.keys(results).map(async (player) => {
              const response = await axios.get(
                `http://localhost:9090/users/getUserByUsername/${player}`,
              );
              const id = response.data.id;
              console.log('user id', id);
              const dbEarnings = response.data.totalEarnings;
              console.log('earnings from db', dbEarnings);
              console.log('earnings from round,', results[player]);
              const patchObj = {
                totalEarnings: dbEarnings + results[player],
              };
              const patchResponse = await axios.patch(
                `http://localhost:9090/users/updateUser/${id}`,
                patchObj,
              );
              console.log(patchResponse);
            });
          } catch (error) {
            throw error;
          }
        }
      }
    });
  };

  return (
    <div className='DisplayCard'>
      <div className='Scorecard'>
        <h1>Score Card</h1>
        {isLoading === false && isSubmitted === false ? (
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
            {Object.keys(finalResults).map((player, i) => {
              return (
                <p key={`result${i}`}>
                  <b>{player}</b>: ${finalResults[player]}
                </p>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Scorecard;
