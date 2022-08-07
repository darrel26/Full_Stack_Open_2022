import React from "react";
import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0, 0]);
  const [flag, setFlag] = useState(false);

  const handleNext = () => {
    return selected < anecdotes.length - 1
      ? setSelected(selected + 1)
      : setFlag(true);
  };

  const handlePoint = () => {
    const copyPoints = [...points];
    copyPoints[selected] += 1;
    setPoints(copyPoints);
  };

  const mostPoint = Math.max(...points);

  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>votes : {points[selected]}</p>
      <button onClick={() => handlePoint()}>vote</button>
      <button onClick={() => handleNext()}>
        {selected === anecdotes.length - 1 ? "finish" : "next anecdote"}
      </button>
      <h1>Anecdote with the most votes</h1>
      {flag ? (
        <>
          <p>
            {anecdotes[points.findIndex((element) => element === mostPoint)]}
          </p>
          <p>with {mostPoint} votes</p>
        </>
      ) : (
        "voting still running ... "
      )}
    </>
  );
};

export default App;
