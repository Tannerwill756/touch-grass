import React from 'react';
import Navigation from '../components/Navigation';
import CreateCard from './CreateCard';


export interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {


  return (
    <div className='Home' style={{ textAlign: 'center' }}>
      <Navigation />
      <CreateCard />

    </div>
  );
};

export default HomePage;
