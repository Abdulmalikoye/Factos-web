import React, { useState } from "react";
import Fact from "./Fact";

const FactList = ({ initialFacts, categories, facts, setFacts }) => {
  if (facts.length === 0) {
    <p>There are no fact in this, create the first one </p>;
  }
  const categ = categories;
  return (
    <div>
      <p>There are {facts.length} facts in the database, add your own</p>
      <ul className="">
        {facts.map((fact) => (
          <Fact key={fact.id} fact={fact} categ={categ} setFacts={setFacts} />
        ))}
      </ul>
    </div>
  );
};

export default FactList;
