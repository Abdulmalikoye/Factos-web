import React, { useState } from "react";
import supabase from "./supabase";

const Fact = ({ fact, categ, setFacts }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed =
    fact.votesInteresting + fact.votesMindBlowing < fact.votesFalse;
  async function handleVote(columnName) {
    setIsUpdating(true);
    const { data: updatedFact, error } = await supabase
      .from("facts")
      .update({ [columnName]: fact[columnName] + 1 })
      .eq("id", fact.id)
      .select();
    setIsUpdating(false);
    if (!error) {
      setFacts((facts) =>
        facts.map((f) => {
          return f.id === fact.id ? updatedFact[0] : f;
        })
      );
    }
  }
  return (
    <div>
      {isDisputed ? (
        <span className="text-[#ef4444] font-bold mr-2">[Disputed]</span>
      ) : null}
      <li
        key={fact.id}
        className="bg-[#44403c] py-[16px] px-[24px] rounded-2xl mb-4 flex flex-col md:flex-row gap-2 md:items-center items-start text-xl"
      >
        <p className="md:w-[55%]">
          {fact.text}
          <a className="source" href={fact.source} target="_blank">
            (Source)
          </a>
        </p>
        <span
          style={{
            backgroundColor:
              categ.find((cat) => cat.name === fact.category)?.color || "#000",
          }}
          className="rounded-full px-[15px] py-[5px] text-white"
        >
          {fact.category}
        </span>
        <div className="flex gap-2 ml-auto">
          <button
            disabled={isUpdating}
            onClick={() => handleVote("votesInteresting")}
            className="border-none bg-[#78716c] text-[18px] py-[6px]  rounded-full px-3 font-bold cursor-pointer hover:bg-[#292524] disabled:bg-[#44403c]"
          >
            👍 {fact.votesInteresting}
          </button>
          <button
            disabled={isUpdating}
            onClick={() => handleVote("votesMindBlowing")}
            className="border-none bg-[#78716c] text-[18px] py-[6px]  rounded-full px-3 font-bold cursor-pointer hover:bg-[#292524] disabled:bg-[#44403c]"
          >
            🤯 {fact.votesMindBlowing}
          </button>
          <button
            disabled={isUpdating}
            onClick={() => handleVote("votesFalse")}
            className="border-none bg-[#78716c] text-[18px] py-[6px]  rounded-full px-3 font-bold cursor-pointer hover:bg-[#292524] disabled:bg-[#44403c]"
          >
            ⛔️ {fact.votesFalse}
          </button>
        </div>
      </li>
    </div>
  );
};

export default Fact;
