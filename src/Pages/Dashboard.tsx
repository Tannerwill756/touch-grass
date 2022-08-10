import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import useAuth from '../hooks/useAuth';
import axios from '../api/index'
import { ScoreBuilder } from '../components/HelperFunctions';
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
