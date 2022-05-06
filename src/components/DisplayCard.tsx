import React, { useState } from 'react';
import Scorecard from './scorecard';

interface Props {
  players: Array<string>;
}

const DisplayCardPage = ({ players }: Props) => {
  const [activeCard, setActiveCard] = useState('1');
  return (
    <div className='DisplayCard'>
      <div className='Scorecard'>
        <h1>Score Card</h1>
        <Scorecard players={players} />
        <div>
          <h3>Holes</h3>
          <div className='pointers'>
            <button className='1' onClick={() => setActiveCard('1')}>
              1
            </button>
            <button className='2' onClick={() => setActiveCard('2')}>
              2
            </button>
            <button className='3' onClick={() => setActiveCard('3')}>
              3
            </button>
            <button className='4' onClick={() => setActiveCard('4')}>
              4
            </button>
            <button className='5' onClick={() => setActiveCard('5')}>
              5
            </button>
            <button className='6' onClick={() => setActiveCard('6')}>
              6
            </button>
            <button className='7' onClick={() => setActiveCard('7')}>
              7
            </button>
            <button className='8' onClick={() => setActiveCard('8')}>
              8
            </button>
            <button className='9' onClick={() => setActiveCard('9')}>
              9
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayCardPage;
