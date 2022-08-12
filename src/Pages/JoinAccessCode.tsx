import React, { useState } from 'react'
import { axiosPrivate } from '../api/index'
import PaypalComponent from '../components/PaypalComponent';
import useAuth from '../hooks/useAuth';

type Props = {}

const JoinAccessCode = (props: Props) => {
    const {auth} = useAuth();
    const [code, setCode] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [stage, setstage] = useState<number>(0);
    const [players, setPlayers] = useState<Array<string>>([]);
    const [scorecardId, setScorecardId] = useState<string>("");
    const [numHoles, setNumHoles] = useState<number>(0);
    const [numPlayers, setNumPlayers] = useState<number>(0);
    const [price, setPrice] = useState<string>('');


    const handleSubmit = () => {
        // looks for scorecard with the accescode entered in
        axiosPrivate.get(`/scorecards/GetScorecardByCode/${code}`)
            .then(res => {
                console.log(res)
                if(res.status === 200 && res.data.card.status === "created"){
                    setError("");
                    setScorecardId(res.data.card._id);
                    setNumHoles(res.data.card.numHoles);
                    setPlayers([...res.data.card.players]);
                    setNumPlayers(res.data.card.setNumberOfPlayers);
                    setPrice(res.data.card.pricePerHole);
                    setstage(1);
                }else{
                    setError("Uh oh looks like that round has already started")
                }
            }).catch(() => {
                setError("Invalid Access Code")
            })
    }


  return (
    <div>
        {stage === 0 && 
            <div>
                <h1>Enter Access Code</h1>
                {error.length > 0 && <p style={{color: "red"}}>{error}</p>}
                <input value={code} onChange={(e) => setCode(e.target.value)}/>
                <button onClick={handleSubmit}>send</button>
            </div>
        }
        
        {stage === 1 && 
        <div>
            <h3 style={{color: "green"}}>Success</h3>
            <p>If you would like to join the card you must buy-in here</p>
            {/* {!players.includes(auth.username) ? <button onClick={() => setstage(2)}>buy in</button> : <p>You have already bought into this card.</p>} */}
            <button onClick={() => setstage(2)}>buy in</button>
            
        </div>}

        {stage === 2 &&
            <PaypalComponent scorecardId={scorecardId} username={auth.username} numHoles={numHoles} creator={false} numPlayers={numPlayers} price={price} userId={auth.id}/>
        }
    </div>
  )
}

export default JoinAccessCode