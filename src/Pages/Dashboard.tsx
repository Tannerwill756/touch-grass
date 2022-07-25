import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  const [numHoles, setNumHoles] = useState('18');
  const [price, setPrice] = useState('');
  const axiosPrivate = useAxiosPrivate();


  // FOR TESTING PURPOSES
  // useEffect(()=>{
  //   axiosPrivate.get('/scorecards/getAllScorecards', {
  //     withCredentials: true,
      
  // }).then((res:any) => console.log(res))
  // },[])
  // END TESTING PURPOSES

  return (
    <div className='Home' style={{ textAlign: 'center' }}>
      <Navigation />
      <header>
        <h1>Touch Grass</h1>
      </header>
      <h2>Start a Match</h2>
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
      <Link to='/createcard' state={{ numHoles, price }}>
        Next Step
      </Link>
      <br />
      <br />
      {numHoles} <br />
      {price}
    </div>
  );
};

export default HomePage;
