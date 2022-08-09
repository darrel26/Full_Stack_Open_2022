import React from "react";
import Part from "./Part";

const Content = ({ parts }) => {
  const total = parts.reduce((a, b) => {
    return a + b.exercises;
  }, 0);

  return (
    <>
      {parts.map((part) => {
        return (
          <Part key={part.id} name={part.name} exercise={part.exercises} />
        );
      })}
      <strong>total of {total} exercise</strong>
    </>
  );
};

export default Content;
