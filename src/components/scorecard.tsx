import React from 'react';
import '../App.css';

interface Props {
  players: Array<string>;
}

const Scorecard = ({ players }: Props) => {
  function buildCard() {
    return players.map((player, key) => (
      <div key={key}>
        <p>{player}</p>
        <table>
          <thead>
            <tr>
              <th>Hole #</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>1</th>
              <th>
                <input />
              </th>
            </tr>
            <tr>
              <th>2</th>
              <th>
                <input />
              </th>
            </tr>
            <tr>
              <th>3</th>
              <th>
                <input />
              </th>
            </tr>
            <tr>
              <th>4</th>
              <th>
                <input />
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    ));
  }

  return (
    <div className='Scorecard'>
      <h1>Score Cards</h1>
      {buildCard()}
    </div>
  );
};

export default Scorecard;
