import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ScoreComparer } from '../components/HelperFunctions';

interface results {
  [name: string]: number;
}

const Results = () => {
  const { scorecardId } = useParams();
  const [finalResults, setFinalResults] = useState<results>({});
  const [isFetching, setisFetching] = useState<boolean>(true);
  const [waitingForResults, setWaitingForResults] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get(`http://localhost:9090/scorecards/getScorecard/${scorecardId}`)
      .then((res) => {
        const data = res.data.card;

        setFinalResults(
          ScoreComparer(data.scores, data.pricePerHole, data.numHoles),
        );
        setisFetching(false);
      });
  }, []);

  const getResults = () => {
    let results: any = [];
    // console.log(results);
    let playerElement = Object.keys(finalResults).map((player, i) => {
      return (
        <div key={`result${i}`}>
          <b>{player}</b>: ${finalResults[player]}
        </div>
      );
    });
    results.push(playerElement);
    // console.log(finalResults);
    return results;
  };

  // const updateUserStats = () => {
  //     // Updates totalEarnings stat in user's DB
  //     try {
  //         Object.keys(results).map(async (player) => {
  //           const response = await axios.get(
  //             `http://localhost:9090/users/getUserByUsername/${player}`,
  //           );
  //           const id = response.data.id;
  //           console.log('user id', id);
  //           const dbEarnings = response.data.totalEarnings;
  //           console.log('earnings from db', dbEarnings);
  //           console.log('earnings from round,', results[player]);
  //           const patchObj = {
  //             totalEarnings: dbEarnings + results[player],
  //           };
  //           const patchResponse = await axios.patch(
  //             `http://localhost:9090/users/updateUser/${id}`,
  //             patchObj,
  //           );
  //           console.log(patchResponse);
  //         });
  //       } catch (error) {
  //         throw error;
  //       }
  // }

  return (
    <div>
      <h1>Results</h1>
      {!isFetching && getResults()}
    </div>
  );
};

export default Results;
