import React, { useState } from 'react';
import '../App.css';

interface Props {
  players: Array<string>;
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

const Scorecard = ({ players }: Props) => {
  const buildCard = () => {
    return (
      <div className='scorecard'>
        <div id='hole1' className='cardContainer'>
          <h2>hole 1</h2>
          {testPlayers.map((player, key) => {
            return (
              <div key={key}>
                <span>{player.name}</span>{' '}
                <input value={player.hole[0].score} type='number' />
              </div>
            );
          })}
        </div>
        <div id='hole2' className='cardContainer'>
          <h2>hole 2</h2>
          {testPlayers.map((player, key) => {
            return (
              <div key={key}>
                <span>{player.name}</span>{' '}
                <input value={player.hole[1].score} type='number' />
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return <div></div>;
};

export default Scorecard;
