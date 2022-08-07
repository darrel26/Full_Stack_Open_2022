import React from "react";
import { useState } from "react";
import Button from "./components/Button";
import StatisticLine from "./components/StatisticLine";

const Statistics = ({ good, neutral, bad }) => {
  return (good === 0) & (neutral === 0) & (bad === 0) ? (
    <p>No feedback given</p>
  ) : (
    <div>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={good + neutral + bad} />
      <StatisticLine
        text="average"
        value={((good - bad) / (good + neutral + bad)).toFixed(2)}
      />
      <StatisticLine
        text="positive"
        value={((good / (good + neutral + bad)) * 100).toFixed(1) + "%"}
      />
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    return setGood(good + 1);
  };
  const handleNeutral = () => {
    return setNeutral(neutral + 1);
  };
  const handleBad = () => {
    return setBad(bad + 1);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={() => handleGood()} text="good" />
      <Button onClick={() => handleNeutral()} text="neutral" />
      <Button onClick={() => handleBad()} text="bad" />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;
