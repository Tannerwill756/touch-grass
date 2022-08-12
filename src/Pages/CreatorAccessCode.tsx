import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { axiosPrivate } from '../api/index';
import useAuth from '../hooks/useAuth';

type Props = {}

const CreatorAccessCode = (props: Props) => {
    const {auth} = useAuth();
    const [disableInput, setDisableInput] = useState(true);
    const { scorecardId } = useParams();
    const navigate = useNavigate();
    const [currentPlayers, setCurrentPlayers] = useState([]);
    const [code, setCode] = useState<string>('');

    useEffect(() =>{
      axiosPrivate.get(`/scorecards/getScorecard/${scorecardId}`)
        .then(res => {
          if(res.data.card.creator === auth.username) setDisableInput(false); 
          if(res.data.card.status === "started") navigate(`/scorecards/${scorecardId}`);
          setCode(res.data.card.accessCode); 
          setCurrentPlayers(res.data.card.players)
        })
        .catch(err => console.log(err))
    }, [])


    const handleSubmit = () => {
        const patchObj = {
            "status": "started"
        }
        axiosPrivate.patch(
            `/scorecards/updateScorecard/${scorecardId}`,
            patchObj,
          ).then(() => 
            navigate(`/scorecards/${scorecardId}`)
          )
    }

  return (
    <div style={{textAlign: 'center'}}>
        <h1>Share with your card mates</h1>
        <h2>Access Code: {code}</h2>
        <p>Current Card: {currentPlayers.map((player, i) => {return <span key={i}>{player}</span>})}</p>
        <p>Everybody joined in?</p>
        <button disabled={disableInput} onClick={handleSubmit} >Start Round</button>
    </div>
  )
}

export default CreatorAccessCode