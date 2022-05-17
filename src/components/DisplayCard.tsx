import React, { useEffect, useState } from 'react';
import Scorecard from './scorecard';

const DisplayCardPage = () => {
  const [activeCard, setActiveCard] = useState<Number>(1);
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [scores, setScores] = useState<{ [key: string]: any }>({});
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    let scorecardId = localStorage.getItem('scorecard-id');

    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:9090/scorecards/getScorecard/${scorecardId}`,
      );
      const data = await response.json();
      const item = data.card.scores;
      console.log(data.card);
      setScores(item);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className='DisplayCard'>
      <div className='Scorecard'>
        <h1>Score Card</h1>
        {!isLoading && (
          <div id='hole1' className='cardContainer'>
            <h2>hole 1</h2>
            <div>
              {Object.keys(scores).map((name, key) => {
                return (
                  <div key={key}>
                    <span>{name}</span>
                    <input defaultValue={scores[name].hole1} type='number' />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* <div>
          <h3>Holes</h3>
          <div className='pointers'>
            <button className='1' onClick={() => setActiveCard(1)}>
              1
            </button>
            <button className='2' onClick={() => setActiveCard(2)}>
              2
            </button>
            <button className='3' onClick={() => setActiveCard(3)}>
              3
            </button>
            <button className='4' onClick={() => setActiveCard(4)}>
              4
            </button>
            <button className='5' onClick={() => setActiveCard(5)}>
              5
            </button>
            <button className='6' onClick={() => setActiveCard(6)}>
              6
            </button>
            <button className='7' onClick={() => setActiveCard(7)}>
              7
            </button>
            <button className='8' onClick={() => setActiveCard(8)}>
              8
            </button>
            <button className='9' onClick={() => setActiveCard(9)}>
              9
            </button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default DisplayCardPage;
