import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
export interface IScorecardProps {}
const Scorecard = () => {
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [scores, setScores] = useState<{ [key: string]: any }>({});
  const [numHoles, setNumHoles] = useState<Number>(0);
  const [selectedHole, setSelectedHole] = useState<number>(1);
  const [changeEvent, setChangeEvent] = useState<Boolean>(false);
  let scorecardId = localStorage.getItem('scorecard-id');

  useEffect(() => {
    axios
      .get(`http://localhost:9090/scorecards/getScorecard/${scorecardId}`)
      .then((res) => {
        const data = res.data;
        const dbScores = data.card.scores;
        setScores(dbScores);
        setNumHoles(data.card.numHoles);

        setIsLoading(false);
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

  useEffect(() => {
    const patchObj = {
      scores: scores,
    };

    const loadData = async () => {
      try {
        const response = await axios.patch(
          `http://localhost:9090/scorecards/updateScorecard/${scorecardId}`,
          patchObj,
        );
        console.log(response);
      } catch (error) {
        throw error;
      }
    };

    loadData();
  }, [changeEvent]);

  const cardBuilder = (hole: number) => {
    let itemList = [];
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
    return itemList[hole - 1];
  };

  const submitRound = () => {
    console.log('test');
  };

  return (
    <div className='DisplayCard'>
      <div className='Scorecard'>
        <h1>Score Card</h1>
        {isLoading === false ? (
          <div className='cardContainer'>
            {cardBuilder(selectedHole)}

            {buttonBuilder()}

            <button onClick={() => submitRound()}>Finish Round</button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Scorecard;
