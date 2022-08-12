import { axiosPrivate } from '../api/index';
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
    axiosPrivate
      .get(`/scorecards/getScorecard/${scorecardId}`)
      .then((res) => {
        const data = res.data.card;
        setFinalResults(data.results);
        setisFetching(false);
      });

  }, []);

  // Gets called when isFetching is false
  const getResults = () => {
    let results: any = [];
    let playerElement = Object.keys(finalResults).map((player, i) => {
      return (
        <div key={`result${i}`}>
          <b>{player}</b>: ${finalResults[player]}
        </div>
      );
    });
    results.push(playerElement);
    return results;
  };


  return (
    <div>
      <h1>Results</h1>
      <p>Payments sent out to the following users.</p>
      {!isFetching && getResults()}
    </div>
  );
};

export default Results;
