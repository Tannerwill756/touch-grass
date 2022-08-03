import React, { useState } from 'react'
import { ScoreBuilder } from './HelperFunctions';
import axios from '../api/index'

const AddPlayerToCard = async (scorecardId:string, username:string, numHoles:number) => {
    console.log("numHoles", numHoles);
    let scores = {};
    let players:any = [];

    const newScores = ScoreBuilder(numHoles, [username])

    
      await axios.get(`/scorecards/getScorecard/${scorecardId}`)
        .then(res => {
          // If the card already has 1 person in it
          if(res.data.card.players.length > 1){
            scores = res.data.card.scores;
            players = [...res.data.card.players];
            const newScoreObject = Object.assign(scores, newScores);
            const playerObj = {
              players: [...players, username],
              scores: newScoreObject
            };
            // Integrate new players with current scorecard 
            axios
            .patch(`/scorecards/updateScorecard/${scorecardId}`, playerObj)
            .then((res) => {       
              console.log(res);
              
            });

          }else{
            // If the card is being created for the first time
            const playerObj = {
              players: [username],
              scores: ScoreBuilder(numHoles, [username])
            };
            axios
            .patch(`/scorecards/updateScorecard/${scorecardId}`, playerObj)
            .then((res) => {       
              console.log(res);
              
            });
          }

        }).catch(err => {
            console.log(err)
           
        });
}

export default AddPlayerToCard