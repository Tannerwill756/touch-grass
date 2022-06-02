const ScoreBuilder = (holes: number, players: Array<String>) => {
  let scoreObj: Object = {};
  players.map((player: any) => {
    if (holes == 9) {
      const newObj = new Object({
        hole1: 0,
        hole2: 0,
        hole3: 0,
        hole4: 0,
        hole5: 0,
        hole6: 0,
        hole7: 0,
        hole8: 0,
        hole9: 0,
      });
      scoreObj = { ...scoreObj, [player]: newObj };
    } else {
      const newObj = new Object({
        hole1: 0,
        hole2: 0,
        hole3: 0,
        hole4: 0,
        hole5: 0,
        hole6: 0,
        hole7: 0,
        hole8: 0,
        hole9: 0,
        hole10: 0,
        hole11: 0,
        hole12: 0,
        hole13: 0,
        hole14: 0,
        hole15: 0,
        hole16: 0,
        hole17: 0,
        hole18: 0,
      });
      scoreObj = { ...scoreObj, [player]: newObj };
    }
  });
  return scoreObj;
};

export { ScoreBuilder };
