import React, { useState } from 'react';

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  const [numHoles, setNumHoles] = useState('18');
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const roundInfo = { numHoles, price };
    console.log(roundInfo);
  };

  return (
    <div className='Home'>
      <header>
        <h1>Touch Grass</h1>
      </header>
      <h2>Start a Match</h2>
      <form onSubmit={handleSubmit}>
        <label>Number of Holes:</label>
        <select value={numHoles} onChange={(e) => setNumHoles(e.target.value)}>
          <option value='9'>9 Holes</option>
          <option value='18'>18 Holes</option>
        </select>
        <br />
        <label>Price per Hole: $</label>
        <input
          type='number'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <br />
        <button>Next Step</button>
      </form>
      {numHoles} <br />
      {price}
    </div>
  );
};

export default HomePage;
