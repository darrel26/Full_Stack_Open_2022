import React from "react";
import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

const App = () => {
  // const-definitions
  const course = "Half Stack application development";

  const contents = [
    {
      part: "Fundamentals of React",
      exercise: 10
    },
    {
      part: "Using props to pass data",
      exercise: 7
    },
    {
      part: "State of a component",
      exercise: 14
    }
  ];

  const total = contents.reduce((a, b) => a + b.exercise, 0);

  return (
    <div>
      <Header course={course} />
      {contents.map((content) => (
        <Content
          key={content.part}
          part={content.part}
          exercise={content.exercise}
        />
      ))}
      <Total total={total} />
    </div>
  );
};

export default App;
