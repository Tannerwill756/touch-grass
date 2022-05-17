import React, { useState } from 'react';
import '../App.css';

interface Props {
  players: Array<String>;
  scores: Array<Object>;
}

const testPlayers = [
  {
    name: 'timmy',
    hole: [
      {
        hole: 1,
        score: 4,
      },
      {
        hole: 2,
        score: 2,
      },
    ],
  },
  {
    name: 'john',
    hole: [
      {
        hole: 1,
        score: 5,
      },
      {
        hole: 2,
        score: 3,
      },
    ],
  },
];

const Scorecard = ({ scores }: Props) => {
  console.log(scores);
  return (
    <>
      {/* {scores.map((obj, key) => {
        <div className='scorecard'>
          <div id='hole1' className='cardContainer'>
            <h2>hole 1</h2>
            <div>
              <span>{Object.keys(obj)}</span>
              <input type='number' />
            </div>
          </div>
        </div>;
      })} */}
    </>
  );
};

export default Scorecard;
